<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status'=>'error','message'=>'Invalid request']);
    exit;
}

$id       = $_POST['id'] ?? '';
$name     = trim($_POST['priority_name'] ?? '');
$duedate  = trim($_POST['due_date'] ?? '');

if (!$id || $name === '' || $duedate === '') {
    echo json_encode(['status'=>'error','message'=>'All fields are required']);
    exit;
}

/* ===============================
   DUPLICATE CHECK
================================ */
$check = $con->prepare("SELECT id FROM priority WHERE priority_name=? AND id!=?");
$check->bind_param("si", $name, $id);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(['status'=>'error','message'=>'Priority already exists']);
    $check->close();
    exit;
}
$check->close();

/* ===============================
   UPDATE PRIORITY
================================ */
$stmt = $con->prepare("UPDATE priority SET priority_name=?, due_date=? WHERE id=?");
$stmt->bind_param("sii", $name, $duedate, $id);

if ($stmt->execute()) {
    echo json_encode(['status'=>'success','message'=>'Priority updated successfully']);
} else {
    echo json_encode(['status'=>'error','message'=>$stmt->error]);
}

$stmt->close();
$con->close();
