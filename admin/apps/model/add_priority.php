<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$priority_name = trim($_POST['priority_name'] ?? '');
$duedate       = trim($_POST['due_date'] ?? '');

if ($priority_name === '') {
    echo json_encode(['status' => 'error', 'message' => 'Priority name is required']);
    exit;
}

if ($duedate === '') {
    echo json_encode(['status' => 'error', 'message' => 'Due Days is required']);
    exit;
}

/* ===============================
   CHECK DUPLICATE
================================ */
$checkStmt = $con->prepare("SELECT id FROM priority WHERE priority_name = ?");
$checkStmt->bind_param("s", $priority_name);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Priority already exists']);
    $checkStmt->close();
    exit;
}
$checkStmt->close();

/* ===============================
   INSERT PRIORITY
================================ */
$status     = 1;
$created_at = date("Y-m-d H:i:s");

/* 4 placeholders now */
$stmt = $con->prepare("INSERT INTO priority (priority_name, due_date, status, created_at) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siis", $priority_name, $duedate, $status, $created_at);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Priority added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}

$stmt->close();
$con->close();
