<?php
include "../../../dbcon/config.php";


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Invalid Request");
}

/* ===============================
   VALIDATION
================================= */
$cid   = trim($_POST['cid'] ?? '');
$name   = trim($_POST['name'] ?? '');
$ticket_title   = trim($_POST['ticket_title'] ?? '');
$email          = trim($_POST['email'] ?? '');
$category_id    = (int)($_POST['category_id'] ?? 0);
$customer_id    = (int)($_POST['customer_id'] ?? 0);
$priority       = (int)($_POST['priority'] ?? 0);
$due_date          = $_POST['due_date'];
$classification = trim($_POST['classification'] ?? '');
$description    = trim($_POST['description'] ?? '');

$modate = date("d.m.Y", strtotime($due_date));
$created_on = date("d.m.Y");

//get priority
$rpriority = mysqli_query($con, "SELECT * FROM priority WHERE id='$priority'");
$row2 = mysqli_fetch_assoc($rpriority);
$priority_name = $row2['priority_name'];



if (!$ticket_title || !$email || !$category_id || !$customer_id) {
    die("<script>alert('All required fields must be filled');history.back();</script>");
}

/* ===============================
   CHECK CUSTOMER EXISTS
================================= */
$checkCustomer = $con->prepare("SELECT id FROM customers WHERE id = ?");
$checkCustomer->bind_param("i", $customer_id);
$checkCustomer->execute();
$result = $checkCustomer->get_result();

if ($result->num_rows == 0) {
    die("<script>alert('Invalid customer selected');history.back();</script>");
}
$checkCustomer->close();

/* ===============================
   START TRANSACTION
================================= */
$con->begin_transaction();

try {

    /* ===============================
       INSERT TICKET
    ================================= */
    $stmt = $con->prepare("
        INSERT INTO tickets
        (ticket_title, email, category_id, client_id, customer_id, priority, due_date, classification, description, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    $stmt->bind_param(
        "ssiiiisss",
        $ticket_title,
        $email,
        $category_id,
        $cid,
        $customer_id,
        $priority,
        $due_date,
        $classification,
        $description
    );

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    $ticket_id = $stmt->insert_id;
    $stmt->close();

    /* ===============================
       GENERATE SERIAL NUMBER
       Format: 00000001
    ================================= */
    $ticket_no = str_pad($ticket_id, 8, "0", STR_PAD_LEFT);

    $updateStmt = $con->prepare("
        UPDATE tickets SET ticket_no = ? WHERE id = ?
    ");
    $updateStmt->bind_param("si", $ticket_no, $ticket_id);
    $updateStmt->execute();
    $updateStmt->close();


    /* ===============================
       UPLOAD ATTACHMENTS
    ================================= */
    if (!empty($_FILES['attachments']['name'][0])) {

        $allowed_types = ['jpg','jpeg','png','pdf','doc','docx'];
        $upload_path   = "../../../uploads/tickets/";

        foreach ($_FILES['attachments']['name'] as $key => $name) {

            if ($_FILES['attachments']['error'][$key] !== 0) {
                continue;
            }

            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));

            if (!in_array($ext, $allowed_types)) {
                continue;
            }

            $newName = time() . '_' . uniqid() . '.' . $ext;

            if (move_uploaded_file(
                $_FILES['attachments']['tmp_name'][$key],
                $upload_path . $newName
            )) {

                $attachStmt = $con->prepare("
                    INSERT INTO ticket_attachments (ticket_id, file_name)
                    VALUES (?, ?)
                ");

                $attachStmt->bind_param("is", $ticket_id, $newName);
                $attachStmt->execute();
                $attachStmt->close();
            }
        }
    }

    /* ===============================
       COMMIT
    ================================= */
    $con->commit();

} catch (Exception $e) {
    $con->rollback();
    die("Transaction Failed: " . $e->getMessage());
}

$con->close();


// ✅ If mail sent successfully → redirect
    echo "<script>
            alert('Ticket created successfully!\\nTicket No: $ticket_no');
            window.location.href='../../tickets.php';
          </script>";
    exit;
