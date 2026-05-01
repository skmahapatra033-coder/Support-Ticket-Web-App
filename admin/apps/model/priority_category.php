<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

$id = $_GET['id'] ?? '';

if (!$id) {
    echo json_encode(['status'=>'error','message'=>'Invalid ID']);
    exit;
}

$stmt = $con->prepare("DELETE FROM priority WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['status'=>'success']);
} else {
    echo json_encode(['status'=>'error','message'=>$stmt->error]);
}
