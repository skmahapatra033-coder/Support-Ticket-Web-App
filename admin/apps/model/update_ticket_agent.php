<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

$ticket_id = $_POST['ticket_id'] ?? '';
$agent_id  = $_POST['agent_id'] ?? '';

if (!$ticket_id || !$agent_id) {
    echo json_encode(["status"=>"error","message"=>"Invalid data"]);
    exit;
}

$stmt = $con->prepare("UPDATE tickets SET agent_id = ? WHERE id = ?");
$stmt->bind_param("ii", $agent_id, $ticket_id);

if ($stmt->execute()) {
    echo json_encode(["status"=>"success"]);
} else {
    echo json_encode(["status"=>"error","message"=>$stmt->error]);
}
