<?php
header("Content-Type: application/json");

include "../../../dbcon/config.php";
include "../../../session.php";

error_reporting(E_ALL);
ini_set("display_errors", 1);

/* ===============================
   SESSION VALIDATION
============================== */

$agentId = isset($_SESSION['customer_id']) ? (int)$_SESSION['customer_id'] : 0;

if ($agentId <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized access"
    ]);
    exit;
}

/* ===============================
   PAGINATION
============================== */

$page   = max((int)($_GET['page'] ?? 1), 1);
$limit  = max((int)($_GET['limit'] ?? 10), 1);
$search = trim($_GET['search'] ?? '');

$offset = ($page - 1) * $limit;
$searchParam = "%{$search}%";

/* ===============================
   TOTAL COUNT
============================== */

$countSql = "SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
LEFT JOIN priority p ON t.priority = p.id
WHERE 
    t.agent_id = ?
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
    "issssss",
    $agentId,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam
);

$stmtCount->execute();
$total = (int)($stmtCount->get_result()->fetch_assoc()['total'] ?? 0);
$stmtCount->close();

/* ===============================
   FETCH TICKETS
============================== */

$sql = "SELECT 
    t.id,
    t.ticket_no,
    t.ticket_title,
    t.status,
    t.approve_status,
    t.estimate_effort,
    t.actual_effort,
    t.due_date,
    t.created_at,
    c.category_name,
    a.name AS agent_name,
    cu.name AS customer_name,
    cl.name AS client_name,
    p.priority_name
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
LEFT JOIN priority p ON t.priority = p.id
WHERE 
    t.agent_id = ?
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
    "issssssii",
    $agentId,
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
        "client" => $row["client_name"] ?? "",
        "customer" => $row["customer_name"] ?? "",
        "agent" => $row["agent_name"] ?? "Unassigned"
    ];
}

echo json_encode([
    "status" => "success",
    "tickets" => $tickets,
    "total" => $total,
    "page" => $page,
    "limit" => $limit
]);

$stmt->close();
$con->close();
