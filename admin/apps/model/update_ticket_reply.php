<?php

header("Content-Type: application/json");
include "../../../dbcon/config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}

$ticketid = isset($_POST['ticketid']) ? (int)$_POST['ticketid'] : 0;
$remarks  = trim($_POST['agent_remarks'] ?? '');
$adminid  = isset($_POST['adminid']) ? (int)$_POST['adminid'] : 0;

$attachmentName = "";

if(isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0){

    $uploadDir = "../../../uploads/ticket_reply/";

    if(!is_dir($uploadDir)){
        mkdir($uploadDir,0777,true);
    }

    $originalName = $_FILES['attachment']['name'];
    $fileTmp      = $_FILES['attachment']['tmp_name'];

    $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    // generate unique filename
    $attachmentName = "ticket_" . $ticketid . "_" . time() . "_" . uniqid() . "." . $fileExt;

    $targetFile = $uploadDir . $attachmentName;

    if(!move_uploaded_file($fileTmp, $targetFile)){
        echo json_encode([
            "status" => "error",
            "message" => "File upload failed"
        ]);
        exit;
    }
}

if ($ticketid <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid Ticket ID"
    ]);
    exit;
}

if ($remarks === '') {
    echo json_encode([
        "status" => "error",
        "message" => "Remarks cannot be empty"
    ]);
    exit;
}

/* INSERT REPLY */

$stmt = $con->prepare("
    INSERT INTO ticket_reply 
    (ticketid, admin_id, admin_remarks, attachment, remark_date) 
    VALUES (?, ?, ?, ?, NOW())
");

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Prepare failed: " . $con->error
    ]);
    exit;
}

$stmt->bind_param("iiss", $ticketid, $adminid, $remarks, $attachmentName);

if ($stmt->execute()) {

    echo json_encode([
        "status" => "success",
        "message" => "Reply added successfully"
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $stmt->error
    ]);
}

$stmt->close();
$con->close();

?>