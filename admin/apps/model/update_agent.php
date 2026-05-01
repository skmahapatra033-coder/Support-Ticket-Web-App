<?php
include "../../../dbcon/pdocon.php";

header("Content-Type: application/json");

$id     = $_POST['id'] ?? 0;
$name   = $_POST['name'] ?? '';
$email  = $_POST['email'] ?? '';
$password  = $_POST['password'] ?? '';
$phone  = $_POST['phone'] ?? '';
$gender = $_POST['gender'] ?? '';
$about  = $_POST['about'] ?? '';
$status = $_POST['status'] ?? '';

if (!$id) {
    echo json_encode(["status" => "error", "message" => "Invalid ID"]);
    exit;
}

/* ===============================
   PASSWORD HASHING
================================ */
$hashedPassword = !empty($password) ? password_hash($password, PASSWORD_DEFAULT) : null;

/* ===============================
   HANDLE PROFILE IMAGE UPLOAD
================================ */
$profilePath = null;

if (!empty($_FILES['profile']['name']) && $_FILES['profile']['error'] == 0) {

    $uploadDir = '../../../uploads/agents/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileTmp  = $_FILES['profile']['tmp_name'];
    $fileName = time() . "_" . basename($_FILES['profile']['name']);
    $targetFile = $uploadDir . $fileName;

    $allowedTypes = ['jpg','jpeg','png','webp'];
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if (!in_array($fileExt, $allowedTypes)) {
        echo json_encode(["status" => "error", "message" => "Invalid image format"]);
        exit;
    }

    if (move_uploaded_file($fileTmp, $targetFile)) {
        $profilePath = $fileName;
    }
}

try {

    $pdo->beginTransaction();

    /* ==========================
       BUILD UPDATE QUERY
    ========================== */

    $sql = "UPDATE agents SET
            name = :name,
            email = :email,
            phone = :phone,
            gender = :gender,
            about = :about";

    if ($hashedPassword) {
        $sql .= ", password = :password";
    }

    if ($profilePath) {
        $sql .= ", profile = :profile";
    }

    $sql .= " WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $params = [
        'name'   => $name,
        'email'  => $email,
        'phone'  => $phone,
        'gender' => $gender,
        'about'  => $about,
        'id'     => $id
    ];

    if ($hashedPassword) {
        $params['password'] = $hashedPassword;
    }

    if ($profilePath) {
        $params['profile'] = $profilePath;
    }

    $stmt->execute($params);

    /* ==========================
       UPDATE USERS TABLE
    ========================== */

    $sql2 = "UPDATE users
             SET status = :status";

    if ($hashedPassword) {
        $sql2 .= ", password = :password";
    }

    $sql2 .= " WHERE customer_id = :id AND role = 'agent'";

    $stmt2 = $pdo->prepare($sql2);

    $params2 = [
        'status' => $status,
        'id'     => $id
    ];

    if ($hashedPassword) {
        $params2['password'] = $hashedPassword;
    }

    $stmt2->execute($params2);

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Agent updated successfully"
    ]);

} catch (PDOException $e) {

    $pdo->rollBack();

    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}