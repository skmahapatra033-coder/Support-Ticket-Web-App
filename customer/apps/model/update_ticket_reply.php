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
$customerid = isset($_POST['customerid']) ? (int)$_POST['customerid'] : 0;
$remarks  = trim($_POST['my_remarks'] ?? '');

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

$stmt = $con->prepare("
    INSERT INTO ticket_reply 
    (ticketid, customer_id, my_remarks, attachment, remark_date) 
    VALUES (?, ?, ?, ?, NOW())
");

$stmt->bind_param("iiss", $ticketid, $customerid, $remarks, $attachmentName);

if ($stmt->execute()) {

    echo json_encode([
        "status" => "success",
        "message" => "Reply added successfully"
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Database error: ".$stmt->error
    ]);

}

$stmt->close();
$con->close();
?>
