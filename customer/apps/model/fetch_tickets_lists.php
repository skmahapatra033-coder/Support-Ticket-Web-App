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
   INPUT PARAMETERS
================================= */

$page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$search = trim($_GET['search'] ?? '');
$approveFilter = trim($_GET['approve_status'] ?? '');

/* Multiple status filter */
$statusFilter = $_GET['status'] ?? [];

/* Convert to array if single value */
if (!is_array($statusFilter)) {
    $statusFilter = [$statusFilter];
}

/* Remove empty values */
$statusFilter = array_filter($statusFilter);

/* Default statuses if nothing selected */
if (empty($statusFilter)) {
    $statusFilter = ['Open', 'Under Testing'];
}

$page  = max($page, 1);
$limit = max($limit, 1);
$offset = ($page - 1) * $limit;

$searchParam = "%{$search}%";

/* ===============================
   BUILD STATUS PLACEHOLDERS
================================= */

$statusPlaceholders = implode(',', array_fill(0, count($statusFilter), '?'));

/* ===============================
   TOTAL COUNT QUERY
================================= */

$countSql = "
SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
WHERE 
    t.customer_id = ?
    AND (
        t.ticket_title LIKE ?
        OR cu.name LIKE ?
        OR a.name LIKE ?
        OR p.priority_name LIKE ?
        OR t.status LIKE ?
        OR t.ticket_no LIKE ?
    )
    AND t.status IN ($statusPlaceholders)
    AND (? = '' OR t.approve_status = ?)
    AND t.estimate_effort > 0
";

$stmtCount = $con->prepare($countSql);

if (!$stmtCount) {
    echo json_encode(["status" => "error", "message" => $con->error]);
    exit;
}

/* Bind parameters dynamically */

$params = [
    $customerId,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam,
    $searchParam
];

foreach ($statusFilter as $status) {
    $params[] = $status;
}

$params[] = $approveFilter;
$params[] = $approveFilter;

/* Build types string */
$types = "i" . str_repeat("s", count($params) - 1);

$stmtCount->bind_param($types, ...$params);

$stmtCount->execute();
$countResult = $stmtCount->get_result();
$totalRow = $countResult->fetch_assoc();
$total = $totalRow['total'] ?? 0;
$stmtCount->close();

/* ===============================
   FETCH TICKETS QUERY
================================= */

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
    p.priority_name
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
WHERE 
    t.customer_id = ?
    AND (
        t.ticket_title LIKE ?
        OR cu.name LIKE ?
        OR a.name LIKE ?
        OR p.priority_name LIKE ?
        OR t.status LIKE ?
        OR t.ticket_no LIKE ?
    )
    AND t.status IN ($statusPlaceholders)
    AND (? = '' OR t.approve_status = ?)
    AND t.estimate_effort > 0
ORDER BY t.id DESC
LIMIT ?, ?
";

$stmt = $con->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $con->error]);
    exit;
}

/* Add pagination params */
$params[] = $offset;
$params[] = $limit;

$types .= "ii";

$stmt->bind_param($types, ...$params);

$stmt->execute();
$result = $stmt->get_result();

/* ===============================
   FORMAT RESPONSE
================================= */

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
   OUTPUT JSON
================================= */

echo json_encode([
    "status"  => "success",
    "tickets" => $tickets,
    "total"   => (int)$total,
    "page"    => $page,
    "limit"   => $limit,
    "pages"   => ceil($total / $limit)
]);
