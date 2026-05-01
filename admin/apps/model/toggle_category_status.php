<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

$id = $_POST['id'] ?? '';
$status = $_POST['status'] ?? 0;

$stmt = $con->prepare("UPDATE categories SET status=? WHERE id=?");
$stmt->bind_param("ii", $status, $id);

if ($stmt->execute()) {
    echo json_encode(['status'=>'success']);
} else {
    echo json_encode(['status'=>'error','message'=>$stmt->error]);
}
