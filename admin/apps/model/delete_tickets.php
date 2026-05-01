<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

error_reporting(E_ALL);
ini_set("display_errors", 1);

/* ===============================
   VALIDATE REQUEST
============================== */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}

$id = $_POST['id'] ?? '';

if (!$id || !is_numeric($id)) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid ticket ID"
    ]);
    exit;
}

/* ===============================
   CHECK IF EXISTS
============================== */
$checkStmt = $con->prepare("SELECT id FROM tickets WHERE id = ?");
$checkStmt->bind_param("i", $id);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Ticket not found"
    ]);
    $checkStmt->close();
    exit;
}
$checkStmt->close();

/* ===============================
   DELETE TICKET
============================== */
$stmt = $con->prepare("DELETE FROM tickets WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Ticket deleted successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}

$stmt->close();
$con->close();
