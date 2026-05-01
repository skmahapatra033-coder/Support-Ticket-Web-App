<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";
include "../../../session.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit(json_encode(["status"=>"error","message"=>"Invalid request"]));
}

$id       = $_POST['id'] ?? '';
$password = $_POST['password'] ?? '';

/* =========================
   VALIDATION
========================= */
if (!ctype_digit($id)) {
    exit(json_encode(["status"=>"error","message"=>"Invalid ID"]));
}

if (strlen($password) < 6) {
    exit(json_encode([
        "status"=>"error",
        "message"=>"Password must be at least 6 characters"
    ]));
}

/* =========================
   HASH PASSWORD
========================= */
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

/* =========================
   TRANSACTION START
========================= */
$con->begin_transaction();

try {

    /* Update agents table */
    $stmt1 = $con->prepare("UPDATE agents SET password=? WHERE id=?");
    $stmt1->bind_param("si", $hashedPassword, $id);

    if(!$stmt1->execute()){
        throw new Exception($stmt1->error);
    }

    $stmt1->close();

    /* Update users table */
    $stmt2 = $con->prepare("UPDATE users SET password=? WHERE customer_id=?");
    $stmt2->bind_param("si", $hashedPassword, $id);

    if(!$stmt2->execute()){
        throw new Exception($stmt2->error);
    }

    $stmt2->close();

    /* Commit if both successful */
    $con->commit();

    echo json_encode([
        "status"=>"success",
        "message"=>"Password updated successfully"
    ]);

} catch (Exception $e) {

    $con->rollback();

    echo json_encode([
        "status"=>"error",
        "message"=>$e->getMessage()
    ]);
}