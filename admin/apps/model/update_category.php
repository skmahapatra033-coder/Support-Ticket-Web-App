<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

$id = $_POST['id'] ?? '';
$name = trim($_POST['category_name'] ?? '');

if (!$id || $name === '') {
    echo json_encode(['status'=>'error','message'=>'Invalid data']);
    exit;
}

/* Duplicate Check */
$check = $con->prepare("SELECT id FROM categories WHERE category_name=? AND id!=?");
$check->bind_param("si", $name, $id);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(['status'=>'error','message'=>'Category already exists']);
    exit;
}

$stmt = $con->prepare("UPDATE categories SET category_name=? WHERE id=?");
$stmt->bind_param("si", $name, $id);

if ($stmt->execute()) {
    echo json_encode(['status'=>'success']);
} else {
    echo json_encode(['status'=>'error','message'=>$stmt->error]);
}
