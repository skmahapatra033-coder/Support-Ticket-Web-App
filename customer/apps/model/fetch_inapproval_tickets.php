<?php
header("Content-Type: application/json");

include "../../../dbcon/config.php";
include "../../../session.php";

/* ===============================
   AUTH CHECK
================================= */

$customerId = isset($_SESSION['customer_id']) ? (int)$_SESSION['customer_id'] : 0;

if ($customerId <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized access"
    ]);
    exit;
}

/* ===============================
   PAGINATION
================================= */

$page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$search = trim($_GET['search'] ?? '');

$page   = max($page, 1);
$limit  = max($limit, 1);
$offset = ($page - 1) * $limit;

$searchParam = "%{$search}%";
$status = "In Approval";

/* ===============================
   TOTAL COUNT QUERY
================================= */

$countSql = "SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
WHERE 
    t.customer_id = ?
    AND t.approve_status = ?
    AND t.estimate_effort > 0
    AND (
        t.ticket_title LIKE ?
        OR cu.name LIKE ?
        OR a.name LIKE ?
        OR p.priority_name LIKE ?
        OR t.status LIKE ?
        OR t.ticket_no LIKE ?
    )";

$stmtCount = $con->prepare($countSql);

if (!$stmtCount) {
    echo json_encode(["status" => "error", "message" => $con->error]);
    exit;
}

$stmtCount->bind_param(
    "isssssss",   // 1 int + 1 string + 6 strings
    $customerId,
    $status,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam
);

$stmtCount->execute();
$resultCount = $stmtCount->get_result();
$totalRow = $resultCount->fetch_assoc();
$total = $totalRow['total'] ?? 0;
$stmtCount->close();

/* ===============================
   FETCH DATA QUERY
================================= */

$sql = "SELECT t.*, 
       c.category_name,
       a.name AS agent_name,
       cu.name AS customer_name,
       p.priority_name
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
WHERE 
    t.customer_id = ?
    AND t.approve_status = ?
    AND t.estimate_effort > 0
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

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $con->error]);
    exit;
}

$stmt->bind_param(
    "isssssssii",   // 1 int + 1 string + 6 strings + 2 ints
    $customerId,
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
        "customer"        => $row["customer_name"],
        "agent"           => $row["agent_name"] ?? "Unassigned"
    ];
}

$stmt->close();
$con->close();

/* ===============================
   FINAL RESPONSE
================================= */

echo json_encode([
    "status"  => "success",
    "tickets" => $tickets,
    "total"   => (int)$total,
    "page"    => $page,
    "limit"   => $limit
]);
?>
