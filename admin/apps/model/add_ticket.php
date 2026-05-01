<?php
include "../../../dbcon/config.php";

/* Collect Data */
$name   = trim($_POST['name'] ?? '');
$ticket_title      = mysqli_real_escape_string($con, $_POST['ticket_title']);
$email             = mysqli_real_escape_string($con, $_POST['email']);
$category_id       = $_POST['category_id'];
$agent_id          = !empty($_POST['agent_id']) ? $_POST['agent_id'] : NULL;
$client_id       = $_POST['client_id'];
$customer_id       = $_POST['customer_id'];
$actual_effort     = $_POST['actual_effort'];
$estimated_effort  = $_POST['estimated_effort'];
$priority          = $_POST['priority'];
$due_date          = $_POST['due_date'];
$classification    = $_POST['classification'];
$description       = mysqli_real_escape_string($con, $_POST['description']);

$modate = date("d.m.Y", strtotime($due_date));
$created_on = date("d.m.Y");

//get agent name
$result = mysqli_query($con, "SELECT * FROM agents WHERE id='$agent_id'");
$row = mysqli_fetch_assoc($result);
$aname = $row['name'];


//get priority
$rpriority = mysqli_query($con, "SELECT * FROM priority WHERE id='$priority'");
$row2 = mysqli_fetch_assoc($rpriority);
$priority_name = $row2['priority_name'];



/* Insert Ticket */
$sql = "INSERT INTO tickets
        (ticket_title,email,category_id,agent_id,customer_id,client_id, priority,estimate_effort,actual_effort,due_date,classification,description)
        VALUES (
        '$ticket_title',
        '$email',
        '$category_id',
        " . ($agent_id ? "'$agent_id'" : "NULL") . ",
        '$customer_id',
        '$client_id',
        '$priority',
        '$estimated_effort',
        '$actual_effort',
        '$due_date',
        '$classification',
        '$description'
        )";

mysqli_query($con, $sql);

/* Get Auto Increment ID */
$ticket_id = mysqli_insert_id($con);

/* Generate 8 Digit Serial Number */
$ticket_no = str_pad($ticket_id, 8, "0", STR_PAD_LEFT);

/* Update Ticket with Serial Number */
mysqli_query($con, "UPDATE tickets SET ticket_no='$ticket_no' WHERE id='$ticket_id'");

/* Upload Attachments */
if (!empty($_FILES['attachments']['name'][0])) {
    foreach ($_FILES['attachments']['name'] as $key => $name) {

        $ext = pathinfo($name, PATHINFO_EXTENSION);
        $newName = time() . '_' . $key . '.' . $ext;

        move_uploaded_file(
            $_FILES['attachments']['tmp_name'][$key],
            "../../../uploads/tickets/" . $newName
        );

        mysqli_query(
            $con,
            "INSERT INTO ticket_attachments (ticket_id,file_name)
             VALUES ('$ticket_id','$newName')"
        );
    }
}



// ✅ If mail sent successfully → redirect
    echo "<script>
            alert('Ticket created successfully!\\nTicket No: $ticket_no');
            window.location.href='../../tickets.php';
          </script>";
    exit;

?>
