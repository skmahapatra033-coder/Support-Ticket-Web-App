<?php
include "../../../dbcon/pdocon.php";
header("Content-Type: application/json");

$id       = $_POST['id'] ?? 0;
$name     = $_POST['name'] ?? '';
$status   = $_POST['status'] ?? '';

if (!$id) {
    echo json_encode(["status" => "error", "message" => "Invalid ID"]);
    exit;
}

/* ===============================
   HANDLE PROFILE IMAGE UPLOAD
================================= */
$profilePath = null;

if (isset($_FILES['profile']) && $_FILES['profile']['error'] == 0) {

    $uploadDir = '../../../uploads/client/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileTmp  = $_FILES['profile']['tmp_name'];
    $fileName = time() . "_" . basename($_FILES['profile']['name']);
    $targetFile = $uploadDir . $fileName;

    $allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];
    $fileExt = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

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
       UPDATE CLIENT TABLE
    ========================== */

    $sql1 = "UPDATE client 
             SET name = :name";

    
    if ($profilePath) {
        $sql1 .= ", profile = :profile";
    }

    $sql1 .= " WHERE id = :id";

    $stmt1 = $pdo->prepare($sql1);

    $params = [
        'name'   => $name,
        'id'     => $id
    ];

    if ($profilePath) {
        $params['profile'] = $profilePath;
    }

    $stmt1->execute($params);
 
    $pdo->commit();

    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {

    $pdo->rollBack();

    echo json_encode([
        "status"  => "error",
        "message" => "Update failed"
    ]);
}