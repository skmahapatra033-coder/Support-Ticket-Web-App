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
            a.client_id,     -- IMPORTANT
            a.email,
            a.password,
            a.phone,
            a.gender,
            a.about,
            a.profile,
            u.status
        FROM customers a
        INNER JOIN users u 
            ON u.customer_id = a.id 
            AND u.role = 'customer'
        WHERE a.id = ?
        LIMIT 1";

$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($customer = $result->fetch_assoc()) {

    $customer['profile'] = !empty($customer['profile']) 
        ? "../uploads/customers/" . $customer['profile']
        : "../uploads/customers/male.png";

    echo json_encode([
        'status' => 'success',
        'data'   => $customer
    ]);

} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Customer not found'
    ]);
}

$stmt->close();
$con->close();