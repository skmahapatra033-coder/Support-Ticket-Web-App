<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

error_reporting(E_ALL);
ini_set("display_errors", 1);

/* ===============================
   PAGINATION
============================== */
$client_id   = isset($_GET['client_id']) ? (int)$_GET['client_id'] : 0;
$customer_id = isset($_GET['customer_id']) ? (int)$_GET['customer_id'] : 0;

$page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$search = trim($_GET['search'] ?? '');
$status = 'Under Testing';

$page   = max($page, 1);
$limit  = max($limit, 1);
$offset = ($page - 1) * $limit;

$searchParam = "%{$search}%";

/* ===============================
   DYNAMIC FILTER BUILD
============================== */

$where = ["t.status = ?"];
$params = [$status];
$types = "s";

/* Client filter */
if ($client_id > 0) {
    $where[] = "t.client_id = ?";
    $params[] = $client_id;
    $types .= "i";
}

/* Customer filter */
if ($customer_id > 0) {
    $where[] = "t.customer_id = ?";
    $params[] = $customer_id;
    $types .= "i";
}

/* Search filter */
$where[] = "(
    t.ticket_title LIKE ?
    OR cu.name LIKE ?
    OR a.name LIKE ?
    OR p.priority_name LIKE ?
    OR t.ticket_no LIKE ?
)";

for ($i = 0; $i < 5; $i++) {
    $params[] = $searchParam;
    $types .= "s";
}

$whereSql = "WHERE " . implode(" AND ", $where);


/* ===============================
   TOTAL COUNT
============================== */

$countSql = "
SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
$whereSql";

$stmtCount = $con->prepare($countSql);
$stmtCount->bind_param($types, ...$params);
$stmtCount->execute();
$totalResult = $stmtCount->get_result();
$totalRow = $totalResult->fetch_assoc();
$total = $totalRow['total'] ?? 0;
$stmtCount->close();

/* ===============================
   FETCH TICKETS
============================== */

$sql = "
SELECT 
    t.id,
    t.ticket_no,
    t.ticket_title,
    t.status,
    t.approve_status,
    t.estimate_effort,
    t.due_date,
    t.created_at,
    c.category_name,
    a.name AS agent_name,
    cu.name AS customer_name,
    cl.name AS client_name,
    p.priority_name,
    t.actual_effort
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
$whereSql
ORDER BY t.id DESC
LIMIT ?, ?";

$paramsData = $params;
$typesData = $types . "ii";
$paramsData[] = $offset;
$paramsData[] = $limit;

$stmt = $con->prepare($sql);
$stmt->bind_param($typesData, ...$paramsData);
$stmt->execute();
$result = $stmt->get_result();

$tickets = [];

while ($row = $result->fetch_assoc()) {
    $tickets[] = [
        "id" => $row["id"],
        "ticket_no" => $row["ticket_no"],
        "ticket_title" => $row["ticket_title"],
        "status" => $row["status"],
        "approve_status" => $row["approve_status"] ?? "In Approval",
        "priority" => $row["priority_name"] ?? "Normal",
        "estimate_effort" => $row["estimate_effort"] ?? "",
        "actual_effort" => $row["actual_effort"] ?? "",
        "due_date" => $row["due_date"],
        "created_at" => $row["created_at"],
         "client" => $row["client_name"] ?? "",
        "customer" => $row["customer_name"] ?? "",
        "agent" => $row["agent_name"] ?? "Unassigned"
    ];
}

echo json_encode([
    "status" => "success",
    "tickets" => $tickets,
    "total" => (int)$total,
    "page" => (int)$page,
    "limit" => (int)$limit
]);

$stmt->close();
$con->close();
