<?php
header("Content-Type: application/json");
require "../../../dbcon/config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$ticketId = $_POST['ticket_id'] ?? '';

if (!$ticketId) {
    echo json_encode(["status" => "error", "message" => "Missing ticket ID"]);
    exit;
}

$stmt = $con->prepare("SELECT estimate_effort, actual_effort FROM tickets WHERE id = ?");
$stmt->bind_param("i", $ticketId);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

if ($data) {
    echo json_encode([
        "status" => "success",
        "estimate_effort" => $data['estimate_effort'],
        "actual_effort" => $data['actual_effort']
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Ticket not found"]);
}
