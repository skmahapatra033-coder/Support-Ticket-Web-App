<?php
include "../../../dbcon/config.php";

/* ==========================
   GET FILTERS
========================== */

$client   = isset($_GET['client']) ? (int)$_GET['client'] : 0;
$customer = isset($_GET['customer']) ? (int)$_GET['customer'] : 0;
$agent    = isset($_GET['agent']) ? (int)$_GET['agent'] : 0;
$approve  = $_GET['approve_status'] ?? '';
$status   = $_GET['status'] ?? [];

/* ==========================
   BUILD QUERY
========================== */

$where = [];
$params = [];
$types = "";

if ($client > 0) {
    $where[] = "t.client_id = ?";
    $params[] = $client;
    $types .= "i";
}

if ($customer > 0) {
    $where[] = "t.customer_id = ?";
    $params[] = $customer;
    $types .= "i";
}

if ($agent > 0) {
    $where[] = "t.agent_id = ?";
    $params[] = $agent;
    $types .= "i";
}

if (!empty($approve)) {
    $where[] = "t.approve_status = ?";
    $params[] = $approve;
    $types .= "s";
}

if (!empty($status)) {
    $placeholders = implode(',', array_fill(0, count($status), '?'));
    $where[] = "t.status IN ($placeholders)";
    foreach ($status as $st) {
        $params[] = $st;
        $types .= "s";
    }
}

$whereSQL = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";

$sql = "
SELECT 
    t.ticket_no,
    t.created_at,
    t.due_date,
    c.name AS client,
    cu.name AS customer,
    t.ticket_title,
    t.status,
    t.approve_status,
    t.priority,
    a.name AS agent,
    t.estimate_effort,
    t.actual_effort
FROM tickets t
LEFT JOIN client c ON t.client_id = c.id
LEFT JOIN customers cu ON t.customer_id = cu.id
LEFT JOIN agents a ON t.agent_id = a.id
$whereSQL
ORDER BY t.created_at DESC
";

$stmt = $con->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

/* ==========================
   EXPORT CSV
========================== */

$filename = "tickets_export_" . date("Ymd_His") . ".csv";

header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Pragma: no-cache");
header("Expires: 0");

$output = fopen("php://output", "w");

/* Header Row */
fputcsv($output, [
    "Ticket No",
    "Created On",
    "Due Date",
    "Client",
    "Customer",
    "Title",
    "Status",
    "Approve Status",
    "Priority",
    "Agent",
    "Estimated Effort",
    "Actual Effort"
]);

/* Data Rows */
while ($row = $result->fetch_assoc()) {

    fputcsv($output, [
        $row['ticket_no'],
        date('d-m-Y', strtotime($row['created_at'])),
        date('d-m-Y', strtotime($row['due_date'])),
        $row['client'],
        $row['customer'],
        $row['ticket_title'],
        $row['status'],
        $row['approve_status'],
        $row['priority'],
        $row['agent'],
        $row['estimate_effort'],
        $row['actual_effort']
    ]);
}

fclose($output);
exit;