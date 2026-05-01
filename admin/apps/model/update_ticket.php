<?php
include "../../../dbcon/config.php";

$ticket_id = intval($_POST['ticket_id']);

/* =========================
   UPDATE TICKET DETAILS
========================= */

$title           = mysqli_real_escape_string($con, $_POST['ticket_title']);
$category_id     = intval($_POST['category_id']);
$agent_id        = intval($_POST['agent_id']);

if(!empty($agent_id ))
{
    $getagent = $agent_id;
}
else
{
    $getagent = $agent_id;
}


$client_id       = intval($_POST['client_id']);
$customer_id     = intval($_POST['customer_id']);
$email           = mysqli_real_escape_string($con, $_POST['email']);
$priority        = intval($_POST['priority']);
$due_date        = $_POST['due_date'];
$classification  = mysqli_real_escape_string($con, $_POST['classification']);
$estimated       = mysqli_real_escape_string($con, $_POST['estimated_effort']);
$actual          = mysqli_real_escape_string($con, $_POST['actual_effort']);
$description     = mysqli_real_escape_string($con, $_POST['description']);

mysqli_query($con, "
UPDATE tickets SET
ticket_title = '$title',
category_id = '$category_id',
agent_id = '$getagent',
client_id = '$client_id',
customer_id = '$customer_id',
email = '$email',
priority = '$priority',
due_date = '$due_date',
classification = '$classification',
estimate_effort = '$estimated',
actual_effort = '$actual',
description = '$description'
WHERE id = $ticket_id
");

/* =========================
   FILE UPLOAD
========================= */

$uploadDir = "../../../uploads/tickets/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$allowedTypes = ['jpg','jpeg','png','pdf','doc','docx'];

if (!empty($_FILES['attachments']['name'][0])) {

    foreach ($_FILES['attachments']['name'] as $key => $originalName) {

        $tmpName  = $_FILES['attachments']['tmp_name'][$key];
        $fileExt  = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if (in_array($fileExt, $allowedTypes)) {

            // Generate unique filename
            $newFileName = time().'_'.rand(1000,9999).'.'.$fileExt;

            $destination = $uploadDir . $newFileName;

            if (move_uploaded_file($tmpName, $destination)) {

                mysqli_query($con, "
                INSERT INTO ticket_attachments 
                (ticket_id, file_name, created_at) 
                VALUES 
                ($ticket_id, '$newFileName', NOW())
                ");

            }
        }
    }
}

header("Location: ../../tickets");
exit;
