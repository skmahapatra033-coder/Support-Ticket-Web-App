<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid ID'
    ]);
    exit;
}

$sql = "SELECT 
    a.id,
    a.name,
    a.email,
    a.password,
    a.phone,
    a.gender,
    a.about,
    a.profile,
    u.status
FROM agents a
INNER JOIN users u 
    ON u.customer_id = a.id 
    AND u.role = 'agent'
WHERE a.id = ?
LIMIT 1
";

$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($agent = $result->fetch_assoc()) {

    $agent['profile'] = !empty($agent['profile']) 
        ? "../uploads/agents/" . $agent['profile']
        : "../uploads/agents/male.png";

    echo json_encode([
        'status' => 'success',
        'data'   => $agent
    ]);

} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Agent not found'
    ]);
}

$stmt->close();
$con->close();
