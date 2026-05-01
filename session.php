<?php
session_start();
require_once 'dbcon/pdocon.php';

/* ==============================
   CHECK LOGIN SESSION
================================ */

if (empty($_SESSION['user_id'])) {
    header("Location: ../index.html");
    exit;
}

/* ==============================
   VERIFY USER STILL EXISTS
================================ */

try {

    $stmt = $pdo->prepare("SELECT id, email FROM users WHERE id = :id LIMIT 1");
    $stmt->execute([
        ':id' => $_SESSION['user_id']
    ]);

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        session_destroy();
        header("Location: ../index.html");
        exit;
    }

    // Valid login
    $login_session = $row['id'];

} catch (PDOException $e) {

    session_destroy();
    header("Location: ../index.html");
    exit;
}
