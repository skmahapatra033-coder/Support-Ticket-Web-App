<?php
include "../../../dbcon/config.php";
include "../../../session.php";

header("Content-Type: application/json");

/* ===============================
   VALIDATE SESSION
================================= */
if (!isset($_SESSION['customer_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$agentFilter  = (int)$_SESSION['customer_id'];
$customer_id  = isset($_GET['customer_id']) ? (int)$_GET['customer_id'] : 0;

/* ===============================
   BUILD WHERE CLAUSE
================================= */
$where  = " WHERE agent_id = ?";
$params = [$agentFilter];
$types  = "i";

if ($customer_id > 0) {
    $where .= " AND customer_id = ?";
    $params[] = $customer_id;
    $types .= "i";
}

/* ===============================
   TOTAL ACTIVE AGENTS
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
        COUNT(CASE WHEN estimate_effort > 0 
                    AND approve_status = 'In Approval' 
               THEN 1 END) as InapprovalTickets
    FROM tickets
    $where
";

$stmt = $con->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

/* ===============================
   JSON RESPONSE
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