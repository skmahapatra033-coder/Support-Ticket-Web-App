<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

$clientId = isset($_GET['client_id']) ? (int)$_GET['client_id'] : 0;

if ($clientId <= 0) {
    echo json_encode(["status" => "error", "customers" => []]);
    exit;
}

$stmt = $con->prepare("SELECT id, name 
                       FROM customers 
                       WHERE client_id = ? 
                       AND status = 1 
                       ORDER BY name ASC");

$stmt->bind_param("i", $clientId);
$stmt->execute();
$result = $stmt->get_result();

$customers = [];

while ($row = $result->fetch_assoc()) {
    $customers[] = $row;
}

$stmt->close();
$con->close();

echo json_encode([
    "status" => "success",
    "customers" => $customers
]);