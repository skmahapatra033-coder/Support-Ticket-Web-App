<?php
include "../../../dbcon/config.php";

/* =========================
   Collect & Sanitize Input
========================= */
$agentname   = mysqli_real_escape_string($con, $_POST['agentname']);
$ticket_title  = mysqli_real_escape_string($con, $_POST['ticket_title']);
$email         = mysqli_real_escape_string($con, $_POST['email']);
$cname         = mysqli_real_escape_string($con, $_POST['cname']);
$category_id   = intval($_POST['category_id']);
$agent_id      = !empty($_POST['agent_id']) ? intval($_POST['agent_id']) : NULL;
$customer_id   = intval($_POST['customer_id']);
$priority      = mysqli_real_escape_string($con, $_POST['priority']);
$due_date      = $_POST['due_date'];
$classification= mysqli_real_escape_string($con, $_POST['classification']);
$description   = mysqli_real_escape_string($con, $_POST['description']);

$modate = date("d.m.Y", strtotime($due_date));
$created_on = date("d.m.Y");

//get priority
$rpriority = mysqli_query($con, "SELECT * FROM priority WHERE id='$priority'");
$row2 = mysqli_fetch_assoc($rpriority);
$priority_name = $row2['priority_name'];



/* =========================
   Insert Ticket
========================= */

$sql = "INSERT INTO tickets
        (ticket_title,email,category_id,agent_id,customer_id,priority,due_date,classification,description)
        VALUES (
        '$ticket_title',
        '$email',
        '$category_id',
        " . ($agent_id !== NULL ? "'$agent_id'" : "NULL") . ",
        '$customer_id',
        '$priority',
        '$due_date',
        '$classification',
        '$description'
        )";

if (!mysqli_query($con, $sql)) {
    die("Error inserting ticket: " . mysqli_error($con));
}

/* =========================
   Generate Serial Number
========================= */

$ticket_id = mysqli_insert_id($con);

/* Format like 00000001 */
$ticket_no = str_pad($ticket_id, 8, "0", STR_PAD_LEFT);

/* Update ticket_no column */
mysqli_query($con, "UPDATE tickets SET ticket_no='$ticket_no' WHERE id='$ticket_id'");

/* =========================
   Upload Attachments
========================= */

if (!empty($_FILES['attachments']['name'][0])) {

    $uploadPath = "../../../uploads/tickets/";

    foreach ($_FILES['attachments']['name'] as $key => $name) {

        if ($_FILES['attachments']['error'][$key] == 0) {

            $ext = pathinfo($name, PATHINFO_EXTENSION);
            $newName = time() . '_' . $key . '.' . $ext;

            if (move_uploaded_file(
                $_FILES['attachments']['tmp_name'][$key],
                $uploadPath . $newName
            )) {

                mysqli_query(
                    $con,
                    "INSERT INTO ticket_attachments (ticket_id,file_name)
                     VALUES ('$ticket_id','$newName')"
                );
            }
        }
    }
}


// ✅ If mail sent successfully → redirect
    echo "<script>
            alert('Ticket created successfully!\\nTicket No: $ticket_no');
            window.location.href='../../tickets.php';
          </script>";
    exit;

?>
