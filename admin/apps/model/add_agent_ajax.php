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
    $email    = trim($_POST['email'] ?? '');
    $phone    = trim($_POST['phone'] ?? '');
    $gender   = trim($_POST['gender'] ?? '');
    $about    = trim($_POST['about'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($name === '' || $email === '' || $phone === '' || $password === '') {
        throw new Exception('Required fields missing');
    }

    /* ===============================
       CHECK DUPLICATE
    ================================ */
    $checkStmt = $con->prepare("SELECT id FROM agents WHERE email = ? OR phone = ?");
    $checkStmt->bind_param("ss", $email, $phone);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        throw new Exception('Email or phone already exists');
    }
    $checkStmt->close();

    /* ===============================
       PASSWORD HASHING
    ================================ */
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    /* ===============================
       IMAGE UPLOAD
    ================================ */
    $profileName = null;

    if (!empty($_FILES['profile']['name'])) {

        $uploadDir = '../../../uploads/agents/';

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
       INSERT INTO AGENTS
    ================================ */
    $agentStmt = $con->prepare("INSERT INTO agents 
        (name, email, phone, gender, profile, about, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?)");

    $agentStmt->bind_param(
        "sssssss",
        $name,
        $email,
        $phone,
        $gender,
        $profileName,
        $about,
        $hashedPassword
    );

    if (!$agentStmt->execute()) {
        throw new Exception($agentStmt->error);
    }
    $customer_id = $agentStmt->insert_id;

    $agentStmt->close();

    /* ===============================
       INSERT INTO USERS
    ================================ */
    $role   = 'agent';
    $status = 'active';

    $userStmt = $con->prepare("INSERT INTO users 
        (customer_id, role, email, password, status) 
        VALUES (?, ?, ?, ?, ?)");

    $userStmt->bind_param(
        "issss",
        $customer_id,
        $role,
        $email,
        $hashedPassword,
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
        'message' => 'Agent created successfully'
    ]);

} catch (Exception $e) {

    $con->rollback();

    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage()
    ]);
}

$con->close();
