<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request'
    ]);
    exit;
}

$customer_id = intval($_POST['customer_id'] ?? 0);

if ($customer_id <= 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid customer ID'
    ]);
    exit;
}

$stmt = $con->prepare("SELECT email FROM customers WHERE id = ?");
$stmt->bind_param("i", $customer_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    echo json_encode([
        'status' => 'success',
        'email' => $row['email']
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Customer not found'
    ]);
}

$stmt->close();
$con->close();
