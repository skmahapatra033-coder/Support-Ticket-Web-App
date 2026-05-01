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
$agentid = isset($_POST['agentid']) ? (int)$_POST['agentid'] : 0;

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

    move_uploaded_file($fileTmp, $targetFile);
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

/* ==============================
   INSERT ONLY (MULTIPLE REPLIES)
============================== */

$stmt = $con->prepare("
    INSERT INTO ticket_reply 
    (ticketid, agent_id, agent_remarks, attachment, remark_date) 
    VALUES (?, ?, ?, ?, NOW())
");

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Prepare failed: " . $con->error
    ]);
    exit;
}

$stmt->bind_param("iiss", $ticketid, $agentid, $remarks, $attachmentName);

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
