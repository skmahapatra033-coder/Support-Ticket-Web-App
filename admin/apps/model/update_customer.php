<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

$id        = (int)($_POST['id'] ?? 0);
$name      = trim($_POST['name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$password  = trim($_POST['password'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$gender    = trim($_POST['gender'] ?? '');
$about     = trim($_POST['about'] ?? '');
$status    = trim($_POST['status'] ?? '');
$client_id = (int)($_POST['client_id'] ?? 0);

if ($id <= 0) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid ID']);
    exit;
}

/* ===============================
   HANDLE PROFILE IMAGE UPLOAD
================================= */
$profilePath = null;

if (!empty($_FILES['profile']['name']) && $_FILES['profile']['error'] == 0) {

    $uploadDir = '../../../uploads/customers/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileTmp  = $_FILES['profile']['tmp_name'];
    $fileName = time() . "_" . basename($_FILES['profile']['name']);
    $targetFile = $uploadDir . $fileName;

    $allowedTypes = ['jpg','jpeg','png','webp'];
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if (!in_array($fileExt, $allowedTypes)) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid image format"
        ]);
        exit;
    }

    if (move_uploaded_file($fileTmp, $targetFile)) {
        $profilePath = $fileName;
    }
}

/* ===============================
   BUILD UPDATE QUERY
================================= */

$sql = "UPDATE customers SET 
        name=?,
        email=?,
        password=?,
        phone=?,
        gender=?,
        about=?,
        client_id=?";

if ($profilePath) {
    $sql .= ", profile=?";
}

$sql .= " WHERE id=?";

$stmt = $con->prepare($sql);

/* ===============================
   BIND PARAMETERS
================================= */

if ($profilePath) {

    $stmt->bind_param(
        "ssssssisi",
        $name,
        $email,
        $password,
        $phone,
        $gender,
        $about,
        $client_id,
        $profilePath,
        $id
    );

} else {

    $stmt->bind_param(
        "ssssssii",
        $name,
        $email,
        $password,
        $phone,
        $gender,
        $about,
        $client_id,
        $id
    );

}

/* ===============================
   EXECUTE UPDATE
================================= */

if ($stmt->execute()) {

    $updateUser = $con->prepare("UPDATE users SET status=? WHERE customer_id=? AND role='customer'");
    $updateUser->bind_param("si", $status, $id);
    $updateUser->execute();

    echo json_encode([
        'status' => 'success',
        'message' => 'Customer updated successfully'
    ]);

} else {

    echo json_encode([
        'status' => 'error',
        'message' => 'Update failed'
    ]);

}

$stmt->close();
$con->close();
?>