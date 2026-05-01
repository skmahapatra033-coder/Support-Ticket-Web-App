<?php
session_start();
include "../dbcon/config.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$user_id           = $_POST['user_id'] ?? '';
$new_password      = $_POST['password'] ?? '';
$confirm_password  = $_POST['password_confirmation'] ?? '';

/* ===========================
   VALIDATION
=========================== */

if (!$user_id || !$new_password || !$confirm_password) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

if ($new_password !== $confirm_password) {
    echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
    exit;
}

/* ===========================
   CHECK CURRENT PASSWORD
=========================== */

$stmt = $pdo->prepare("SELECT password FROM users WHERE customer_id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
}

if (!password_verify($current_password, $user['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Current password is incorrect']);
    exit;
}

/* ===========================
   UPDATE PASSWORD
=========================== */

$new_hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

try {
    $pdo->beginTransaction();

    // Update user table
    $stmt1 = $pdo->prepare("UPDATE users SET password = ? WHERE customer_id = ?");
    $stmt1->execute([$new_hashed_password, $user_id]);

    // Update customer table
    $stmt2 = $pdo->prepare("UPDATE customers SET password = ? WHERE id = ?");
    $stmt2->execute([$new_hashed_password, $user_id]);

    $pdo->commit();

    echo json_encode(['status' => 'success', 'message' => 'Password updated successfully']);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['status' => 'error', 'message' => 'Password update failed']);
}
