<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

error_reporting(E_ALL);
ini_set("display_errors", 1);

/* ===============================
   PAGINATION
============================== */

$page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$search = trim($_GET['search'] ?? '');
$status = 'Testing Passed';

$page   = max($page, 1);
$limit  = max($limit, 1);
$offset = ($page - 1) * $limit;

$searchParam = "%{$search}%";

/* ===============================
   TOTAL COUNT
============================== */

$countSql = "
SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
WHERE t.status = ?
AND (
    t.ticket_title LIKE ?
    OR cu.name LIKE ?
    OR a.name LIKE ?
    OR p.priority_name LIKE ?
    OR t.status LIKE ?
    OR t.ticket_no LIKE ?
)";

$stmtCount = $con->prepare($countSql);
$stmtCount->bind_param(
    "sssssss",   // 1 status + 6 search
    $status,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam
);

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
    p.priority_name,
    t.actual_effort
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
WHERE t.status = ?
AND (
    t.ticket_title LIKE ?
    OR cu.name LIKE ?
    OR a.name LIKE ?
    OR p.priority_name LIKE ?
    OR t.status LIKE ?
    OR t.ticket_no LIKE ?
)
ORDER BY t.id DESC
LIMIT ?, ?";

$stmt = $con->prepare($sql);

$stmt->bind_param(
    "sssssssii",   // 1 status + 6 search + 2 integers
    $status,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $offset,
    $limit
);

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
