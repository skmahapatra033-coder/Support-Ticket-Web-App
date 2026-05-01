<?php
include "../../../dbcon/config.php";
include "../../../session.php";

header("Content-Type: application/json");

/* ===============================
   GET FILTERS
================================= */
$agentFilter = isset($_SESSION['customer_id']) ? (int)$_SESSION['customer_id'] : 0;
$client_id   = isset($_GET['client_id']) ? (int)$_GET['client_id'] : 0;

/* ===============================
   BUILD WHERE CONDITION
================================= */
$where = " WHERE 1=1 ";
$params = [];
$types  = "";

/* Always filter by logged-in agent */
if ($agentFilter > 0) {
    $where .= " AND agent_id = ?";
    $params[] = $agentFilter;
    $types .= "i";
}

/* Optional client filter */
if ($client_id > 0) {
    $where .= " AND client_id = ?";
    $params[] = $client_id;
    $types .= "i";
}

/* ===============================
   TOTAL AGENTS (Active Users)
================================= */
$stmtAgents = $con->prepare("
    SELECT COUNT(*) as total 
    FROM agents a 
    INNER JOIN users u ON a.id = u.customer_id 
    WHERE u.status = 'active'
");
$stmtAgents->execute();
$totalAgents = $stmtAgents->get_result()->fetch_assoc()['total'] ?? 0;

/* ===============================
   TICKET STATUS COUNTS (Single Query)
================================= */
$sql = "
    SELECT
        COUNT(CASE WHEN status = 'Open' THEN 1 END) as totalOpenTickets,
        COUNT(CASE WHEN status = 'Closed' THEN 1 END) as closeTickets,
        COUNT(CASE WHEN status = 'Rejected' THEN 1 END) as rejectedTickets,
        COUNT(CASE WHEN status = 'Under Testing' THEN 1 END) as underTestingTickets,
        COUNT(CASE WHEN status = 'Testing Passed' THEN 1 END) as passTestingTickets,
        COUNT(CASE WHEN status = 'Testing Failed' THEN 1 END) as failedTestingTickets,
        COUNT(CASE WHEN estimate_effort > 0 AND approve_status = 'In Approval' THEN 1 END) as InapprovalTickets
    FROM tickets
    $where
";

$stmt = $con->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

/* ===============================
   RESPONSE
================================= */
echo json_encode([
    "status" => "success",
    "totalAgents" => (int)$totalAgents,
    "totalOpenTickets" => (int)($result['totalOpenTickets'] ?? 0),
    "closeTickets" => (int)($result['closeTickets'] ?? 0),
    "rejectedTickets" => (int)($result['rejectedTickets'] ?? 0),
    "underTestingTickets" => (int)($result['underTestingTickets'] ?? 0),
    "passTestingTickets" => (int)($result['passTestingTickets'] ?? 0),
    "failedTestingTickets" => (int)($result['failedTestingTickets'] ?? 0),
    "InapprovalTickets" => (int)($result['InapprovalTickets'] ?? 0),
]);