<?php
header('Content-Type: application/json');
include "../../../dbcon/config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$con->begin_transaction();

try {

    /* ===============================
       VALIDATION
    ================================ */
    $name     = trim($_POST['name'] ?? '');

    if ($name === '') {
        throw new Exception('Required fields missing');
    }

    /* ===============================
       CHECK DUPLICATE
    ================================ */
    $checkStmt = $con->prepare("SELECT name FROM client WHERE name = ?");
    $checkStmt->bind_param("s", $name);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        throw new Exception('Name already exists');
    }
    $checkStmt->close();
    /* ===============================
       IMAGE UPLOAD
    ================================ */
    $profileName = null;

    if (!empty($_FILES['profile']['name'])) {

        $uploadDir = '../../../uploads/client/';

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $ext = strtolower(pathinfo($_FILES['profile']['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($ext, $allowed)) {
            throw new Exception('Invalid image type');
        }

        $profileName = time() . '_' . rand(100, 999) . '.' . $ext;

        if (!move_uploaded_file($_FILES['profile']['tmp_name'], $uploadDir . $profileName)) {
            throw new Exception('Image upload failed');
        }
    }

    /* ===============================
       INSERT INTO CLIENT
    ================================ */
    $clientStmt = $con->prepare("INSERT INTO client (name, profile) VALUES (?, ?)");

    $clientStmt->bind_param(
        "ss",
        $name,
        $profileName
    );

    if (!$clientStmt->execute()) {
        throw new Exception($clientStmt->error);
    }

    /* ✅ GET LAST INSERT ID */
    $client_id = $clientStmt->insert_id;

    $clientStmt->close();

    /* ===============================
       INSERT INTO USERS (WITH CLIENT ID)
    ================================ */
    $role   = 'client';
    $status = 'active';

    $userStmt = $con->prepare("INSERT INTO users 
        (customer_id, role, status) 
        VALUES (?, ?, ?)");

    $userStmt->bind_param(
        "iss",
        $client_id,
        $role,
        $status
    );

    if (!$userStmt->execute()) {
        throw new Exception($userStmt->error);
    }

    $userStmt->close();

    /* ===============================
       COMMIT
    ================================ */
    $con->commit();

    echo json_encode([
        'status'  => 'success',
        'message' => 'Client created successfully'
    ]);

} catch (Exception $e) {

    $con->rollback();

    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage()
    ]);
}

$con->close();
