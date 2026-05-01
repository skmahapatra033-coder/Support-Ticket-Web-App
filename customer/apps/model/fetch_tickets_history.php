<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";
include "../../../session.php";

/* ===============================
   INPUT PARAMETERS
================================= */

$customerId = isset($_SESSION['customer_id']) ? (int)$_SESSION['customer_id'] : 0;

/* fetch client id */
$clientid = mysqli_query($con, "SELECT * FROM customers WHERE id='$customerId'");
$cid = mysqli_fetch_assoc($clientid);
$clientid = $cid['client_id'];
 


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
   COMMON WHERE CLAUSE
================================= */

$where = "
WHERE t.client_id = ?
AND (
    t.ticket_title LIKE ?
    OR p.priority_name LIKE ?
    OR t.status LIKE ?
    OR t.ticket_no LIKE ?
)
AND t.status IN ($statusPlaceholders)
AND (? = '' OR t.approve_status = ?)
";

/* ===============================
   BUILD PARAMS
================================= */

$params = [];
$types  = "";

/* customer filter */
$params[] = $clientid;
$types .= "i";

/* search fields (4) */
for ($i = 0; $i < 4; $i++) {
    $params[] = $searchParam;
    $types .= "s";
}

/* status filter */
foreach ($statusFilter as $status) {
    $params[] = $status;
    $types .= "s";
}

/* approve filter */
$params[] = $approveFilter;
$params[] = $approveFilter;
$types .= "ss";

/* ===============================
   COUNT QUERY
================================= */

$countSql = "
SELECT COUNT(*) as total
FROM tickets t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN agents a ON t.agent_id = a.id
LEFT JOIN client cl ON t.client_id = cl.id
LEFT JOIN customers cu ON t.customer_id = cu.id
INNER JOIN priority p ON t.priority = p.id
$where
";

$stmtCount = $con->prepare($countSql);

if (!$stmtCount) {
    echo json_encode(["status"=>"error","message"=>$con->error]);
    exit;
}

$stmtCount->bind_param($types, ...$params);
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
    echo json_encode(["status"=>"error","message"=>$con->error]);
    exit;
}

$paramsData = $params;
$typesData  = $types . "ii";

$paramsData[] = $offset;
$paramsData[] = $limit;

$stmt->bind_param($typesData, ...$paramsData);
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