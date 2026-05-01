<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";
include "../../../session.php";

/* ===============================
   SESSION VALIDATION
============================== */
if (!isset($_SESSION['customer_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$agent_id = (int)$_SESSION['customer_id'];

/* ===============================
   PAGINATION & INPUTS
============================== */
$client_id   = isset($_GET['client_id']) ? (int)$_GET['client_id'] : 0;
$customer_id = isset($_GET['customer_id']) ? (int)$_GET['customer_id'] : 0;

$page   = max((int)($_GET['page'] ?? 1), 1);
$limit  = max((int)($_GET['limit'] ?? 10), 1);
$search = trim($_GET['search'] ?? '');
$status = 'Open';

$offset = ($page - 1) * $limit;

/* ===============================
   DYNAMIC FILTER BUILD
============================== */

$where  = [];
$params = [];
$types  = "";

/* Status filter */
$where[]  = "t.status = ?";
$params[] = $status;
$types   .= "s";

/* Agent filter (mandatory) */
$where[]  = "t.agent_id = ?";
$params[] = $agent_id;
$types   .= "i";

/* Client filter */
if ($client_id > 0) {
    $where[]  = "t.client_id = ?";
    $params[] = $client_id;
    $types   .= "i";
}

/* Customer filter */
if ($customer_id > 0) {
    $where[]  = "t.customer_id = ?";
    $params[] = $customer_id;
    $types   .= "i";
}

/* Search filter (only if provided) */
if ($search !== '') {
    $where[] = "(
        t.ticket_title LIKE ?
        OR cu.name LIKE ?
        OR a.name LIKE ?
        OR p.priority_name LIKE ?
        OR t.ticket_no LIKE ?
    )";

    $searchParam = "%{$search}%";
    for ($i = 0; $i < 5; $i++) {
        $params[] = $searchParam;
        $types   .= "s";
    }
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
$whereSql
";

$stmtCount = $con->prepare($countSql);
$stmtCount->bind_param($types, ...$params);
$stmtCount->execute();
$total = $stmtCount->get_result()->fetch_assoc()['total'] ?? 0;
$stmtCount->close();

/* ===============================
   FETCH DATA
============================== */

$sql = "
SELECT 
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
INNER JOIN priority p ON t.priority = p.id
$whereSql
ORDER BY t.id DESC
LIMIT ?, ?
";

$paramsData = $params;
$typesData  = $types . "ii";
$paramsData[] = $offset;
$paramsData[] = $limit;

$stmt = $con->prepare($sql);
$stmt->bind_param($typesData, ...$paramsData);
$stmt->execute();
$result = $stmt->get_result();

$tickets = [];

while ($row = $result->fetch_assoc()) {
    $tickets[] = [
        "id"              => $row["id"],
        "ticket_no"       => $row["ticket_no"],
        "ticket_title"    => $row["ticket_title"],
        "status"          => $row["status"],
        "approve_status"  => $row["approve_status"] ?? "In Approval",
        "priority"        => $row["priority_name"] ?? "Normal",
        "estimate_effort" => $row["estimate_effort"] ?? "",
        "actual_effort"   => $row["actual_effort"] ?? "",
        "due_date"        => $row["due_date"],
        "created_at"      => $row["created_at"],
        "client"          => $row["client_name"] ?? "",
        "customer"        => $row["customer_name"] ?? "",
        "agent"           => $row["agent_name"] ?? "Unassigned"
    ];
}

$stmt->close();
$con->close();

/* ===============================
   RESPONSE
============================== */
echo json_encode([
    "status" => "success",
    "tickets" => $tickets,
    "total" => (int)$total,
    "page" => $page,
    "limit" => $limit,
    "pages" => ceil($total / $limit)
]);