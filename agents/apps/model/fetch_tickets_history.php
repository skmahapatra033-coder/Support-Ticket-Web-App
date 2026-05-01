<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";
include "../../../session.php";

/* ===============================
   INPUT PARAMETERS
================================= */

$agentdefault   = isset($_SESSION['customer_id']) ? (int)$_SESSION['customer_id'] : 0;
$customerFilter = isset($_GET['customer']) ? (int)$_GET['customer'] : 0;

$page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$search = trim($_GET['search'] ?? '');
$approveFilter = trim($_GET['approve_status'] ?? '');

$statusFilter = $_GET['status'] ?? [];

if (!is_array($statusFilter)) {
    $statusFilter = [$statusFilter];
}

$statusFilter = array_filter($statusFilter);

if (empty($statusFilter)) {
    $statusFilter = ['Open', 'Under Testing'];
}

$page   = max($page, 1);
$limit  = max($limit, 1);
$offset = ($page - 1) * $limit;

$searchParam = "%{$search}%";

/* ===============================
   STATUS PLACEHOLDERS
================================= */

$statusPlaceholders = implode(',', array_fill(0, count($statusFilter), '?'));

/* ===============================
   PARAM BUILDER
================================= */

function buildParams($agentdefault, $searchParam, $statusFilter, $approveFilter, $customerFilter) {

    $params = [];

    // agent session filter
    $params[] = $agentdefault;

    // 6 search fields
    for ($i = 0; $i < 6; $i++) {
        $params[] = $searchParam;
    }

    // status filters
    foreach ($statusFilter as $status) {
        $params[] = $status;
    }

    // approve filter
    $params[] = $approveFilter;
    $params[] = $approveFilter;

    // customer filter
    $params[] = $customerFilter;
    $params[] = $customerFilter;

    return $params;
}

function buildTypes($statusCount, $includePagination = false) {

    $types  = "i";                         // agent session
    $types .= str_repeat("s", 6);           // search
    $types .= str_repeat("s", $statusCount);
    $types .= "ss";                         // approve
    $types .= "ii";                         // customer filter

    if ($includePagination) {
        $types .= "ii";
    }

    return $types;
}

/* ===============================
   COMMON WHERE CLAUSE
================================= */

$where = "
WHERE t.agent_id = ?
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
AND (? = 0 OR t.customer_id = ?)
";

/* ===============================
   COUNT QUERY
================================= */

$countSql = "
SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
$where
";

$stmtCount = $con->prepare($countSql);

if (!$stmtCount) {
    echo json_encode(["status" => "error", "message" => $con->error]);
    exit;
}

$countParams = buildParams(
    $agentdefault,
    $searchParam,
    $statusFilter,
    $approveFilter,
    $customerFilter
);

$countTypes = buildTypes(count($statusFilter));

$stmtCount->bind_param($countTypes, ...$countParams);
$stmtCount->execute();
$total = $stmtCount->get_result()->fetch_assoc()['total'] ?? 0;
$stmtCount->close();

/* ===============================
   DATA QUERY
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
    cl.name AS client_name,
    p.priority_name
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
$where
ORDER BY t.id DESC
LIMIT ?, ?
";

$stmt = $con->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $con->error]);
    exit;
}

$dataParams = buildParams(
    $agentdefault,
    $searchParam,
    $statusFilter,
    $approveFilter,
    $customerFilter
);

$dataParams[] = $offset;
$dataParams[] = $limit;

$dataTypes = buildTypes(count($statusFilter), true);

$stmt->bind_param($dataTypes, ...$dataParams);
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
        "client"          => $row["client_name"],
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