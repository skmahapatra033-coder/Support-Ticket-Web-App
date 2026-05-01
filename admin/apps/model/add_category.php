<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$category_name = trim($_POST['category_name'] ?? '');

if ($category_name === '') {
    echo json_encode(['status' => 'error', 'message' => 'Category name is required']);
    exit;
}

/* ===============================
   CHECK DUPLICATE
================================ */
$checkStmt = $con->prepare("SELECT id FROM categories WHERE category_name = ?");
$checkStmt->bind_param("s", $category_name);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Category already exists']);
    $checkStmt->close();
    exit;
}
$checkStmt->close();

/* ===============================
   INSERT CATEGORY
================================ */
$status = 1;
$created_at = date("Y-m-d H:i:s");

$stmt = $con->prepare("INSERT INTO categories (category_name, status, created_at) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $category_name, $status, $created_at);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Category added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}

$stmt->close();
$con->close();
