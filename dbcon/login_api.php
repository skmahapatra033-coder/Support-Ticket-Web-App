<?php
session_start();

header("Content-Type: application/json");

require "pdocon.php";

 
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

/* ==========================
   VALIDATION
========================== */
if (empty($email) || empty($password)) {
    echo json_encode([
        "status"  => "validation_error",
        "message" => "Email and password are required."
    ]);
    exit;
}

try {

    /* ==========================
       FETCH USER BY EMAIL ONLY
    ========================== */
    $stmt = $pdo->prepare("
        SELECT id, email, role, password, customer_id, status
        FROM users
        WHERE email = :email
        LIMIT 1
    ");

    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    /* ==========================
       USER NOT FOUND
    ========================== */
    if (!$user) {
        echo json_encode([
            "status"  => "invalid_credentials",
            "message" => "Invalid email or password."
        ]);
        exit;
    }

    /* ==========================
       USER NOT ACTIVE
    ========================== */
    if ($user['status'] !== 'active') {
        echo json_encode([
            "status"  => "inactive_user",
            "message" => "Your account is not active. Please contact administrator."
        ]);
        exit;
    }

    /* ==========================
       PASSWORD CHECK
    ========================== */
    if (!password_verify($password, $user['password'])) {
        echo json_encode([
            "status"  => "invalid_credentials",
            "message" => "Invalid email or password."
        ]);
        exit;
    }

    /* ==========================
       SESSION SET
    ========================== */
    $_SESSION['user_id']       = $user['id'];
    $_SESSION['email']         = $user['email'];
    $_SESSION['role']          = $user['role'];
    $_SESSION['customer_id']   = $user['customer_id'] ?? null;
    $_SESSION['last_activity'] = time();

    /* ==========================
       ROLE REDIRECT
    ========================== */
    switch ($user['role']) {

        case 'admin':
            $redirect = 'admin/dashboard.php';
            break;

        case 'agent':
            $redirect = 'agents/dashboard.php';
            break;

        case 'customer':
            $redirect = 'customer/dashboard.php';
            break;

        default:
            echo json_encode([
                "status"  => "role_error",
                "message" => "Invalid user role."
            ]);
            exit;
    }

    echo json_encode([
        "status"   => "success",
        "message"  => "Login successful",
        "redirect" => $redirect
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "status"  => "server_error",
        "message" => "Something went wrong. Please try again."
    ]);
}
