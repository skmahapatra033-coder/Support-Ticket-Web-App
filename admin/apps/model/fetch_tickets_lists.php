<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

/* ===============================
   INPUTS
============================== */

$clientFilter   = isset($_GET['client']) ? (int)$_GET['client'] : 0;
$customerFilter = isset($_GET['customer']) ? (int)$_GET['customer'] : 0;
$agentFilter    = isset($_GET['agent']) ? (int)$_GET['agent'] : 0;

$page   = max((int)($_GET['page'] ?? 1), 1);
$limit  = max((int)($_GET['limit'] ?? 10), 1);
$search = trim($_GET['search'] ?? '');
$approveFilter = isset($_GET['approve_status']) ? trim($_GET['approve_status']) : '';

$statusFilter = $_GET['status'] ?? [];

if (!is_array($statusFilter)) {
    $statusFilter = [$statusFilter];
}

$statusFilter = array_filter($statusFilter);

if (empty($statusFilter)) {
    $statusFilter = ['Open', 'Under Testing'];
}

$offset = ($page - 1) * $limit;

/* ===============================
   DYNAMIC WHERE BUILDER
============================== */

$where  = [];
$params = [];
$types  = "";

/* Search */
if ($search !== '') {

    $where[] = "(
        t.ticket_title LIKE ?
        OR cl.name LIKE ?
        OR cu.name LIKE ?
        OR a.name LIKE ?
        OR p.priority_name LIKE ?
        OR t.status LIKE ?
        OR t.ticket_no LIKE ?
    )";

    $searchParam = "%{$search}%";

    for ($i = 0; $i < 7; $i++) {
        $params[] = $searchParam;
        $types .= "s";
    }

}

/* Status filter */
$statusPlaceholders = implode(',', array_fill(0, count($statusFilter), '?'));
$where[] = "t.status IN ($statusPlaceholders)";

foreach ($statusFilter as $status) {
    $params[] = $status;
    $types .= "s";
}

/* Approve filter */
if ($approveFilter !== "") {
    $where[] = "t.approve_status = ? AND estimate_effort > 0";
    $params[] = $approveFilter;
    $types .= "s";
}

/* Client filter */
if ($clientFilter > 0) {
    $where[] = "t.client_id = ?";
    $params[] = $clientFilter;
    $types .= "i";
}

/* Customer filter */
if ($customerFilter > 0) {
    $where[] = "t.customer_id = ?";
    $params[] = $customerFilter;
    $types .= "i";
}

/* Agent filter */
if ($agentFilter > 0) {
    $where[] = "t.agent_id = ?";
    $params[] = $agentFilter;
    $types .= "i";
}

$whereSql = "WHERE " . implode(" AND ", $where);

/* ===============================
   COUNT QUERY
============================== */

$countSql = "
SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
$whereSql
";

$stmtCount = $con->prepare($countSql);
$stmtCount->bind_param($types, ...$params);
$stmtCount->execute();
$totalResult = $stmtCount->get_result();
$total = $totalResult->fetch_assoc()['total'] ?? 0;
$stmtCount->close();

/* ===============================
   DATA QUERY
============================== */

$dataSql = "SELECT 
    t.id,
    t.ticket_no,
    t.ticket_title,
    t.status,
    t.approve_status,
    t.estimate_effort,
    t.actual_effort,
    t.due_date,
    t.created_at,
    cl.name AS client_name,
    cu.name AS customer_name,
    a.name AS agent_name,
    p.priority_name
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
$whereSql
ORDER BY t.id DESC
LIMIT ?, ?
";

$paramsData = $params;
$typesData  = $types . "ii";
$paramsData[] = $offset;
$paramsData[] = $limit;

$stmt = $con->prepare($dataSql);
$stmt->bind_param($typesData, ...$paramsData);
$stmt->execute();
$result = $stmt->get_result();

/* ===============================
   FORMAT OUTPUT
============================== */

$tickets = [];

while ($row = $result->fetch_assoc()) {
    $tickets[] = [
        "id"              => $row["id"],
        "ticket_no"       => $row["ticket_no"],
        "ticket_title"    => $row["ticket_title"],
        "status"          => $row["status"],
        "approve_status"  => $row["approve_status"],
        "priority"        => $row["priority_name"],
        "estimate_effort" => $row["estimate_effort"] ?? "",
        "actual_effort"   => $row["actual_effort"] ?? "",
        "due_date"        => $row["due_date"],
        "created_at"      => $row["created_at"],
        "client"          => $row["client_name"],
        "customer"        => $row["customer_name"],
        "agent"           => $row["agent_name"] ?? "Unassigned"
    ];
}

$stmt->close();
$con->close();

/* ===============================
   JSON RESPONSE
============================== */

echo json_encode([
    "status"  => "success",
    "tickets" => $tickets,
    "total"   => (int)$total,
    "page"    => $page,
    "limit"   => $limit,
    "pages"   => ceil($total / $limit)
]);