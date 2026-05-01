<?php
include "../../../dbcon/config.php"; // mysqli connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $ticket_id = intval($_POST['ticket_id']);

    $uploadDir = "../../../uploads/tickets/";

    // Allowed extensions
    $allowedExt = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];

    $maxSize = 5 * 1024 * 1024; // 5MB

    if (!empty($_FILES['attachments']['name'][0])) {

        foreach ($_FILES['attachments']['tmp_name'] as $key => $tmp_name) {

            $originalName = $_FILES['attachments']['name'][$key];
            $fileSize     = $_FILES['attachments']['size'][$key];
            $error        = $_FILES['attachments']['error'][$key];

            if ($error !== 0) {
                continue;
            }

            if ($fileSize > $maxSize) {
                continue;
            }

            $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

            if (!in_array($ext, $allowedExt)) {
                continue;
            }

            // Generate unique name
            $newFileName = $ticket_id . "_" . time() . "_" . uniqid() . "." . $ext;

            $destination = $uploadDir . $newFileName;

            if (move_uploaded_file($tmp_name, $destination)) {

                $stmt = $con->prepare("INSERT INTO ticket_attachments (ticket_id, file_name) VALUES (?, ?)");
                $stmt->bind_param("is", $ticket_id, $newFileName);
                $stmt->execute();
            }
        }

            // header("Location: ../../view_tickets.php?id=" . $ticket_id . "&upload=success");
    } else {
        echo "No files selected.";
    }
}
?>
