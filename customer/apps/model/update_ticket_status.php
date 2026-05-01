<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

/* ===============================
   VALIDATE REQUEST
============================== */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit(json_encode(["status"=>"error","message"=>"Invalid request method"]));
}

$id = $_POST['id'] ?? '';

if (!ctype_digit($id)) {
    exit(json_encode(["status"=>"error","message"=>"Invalid ticket ID"]));
}

/* ===============================
   FETCH TICKET
============================== */
$stmt = $con->prepare("
    SELECT t.ticket_title,t.ticket_no,t.created_at,
           t.agent_id,t.email,t.due_date,
           t.status,t.estimate_effort,t.approve_status,
           p.priority_name,c.name
    FROM tickets t
    INNER JOIN priority p ON t.priority=p.id
    INNER JOIN customers c ON t.customer_id=c.id
    WHERE t.id=?
");
$stmt->bind_param("i",$id);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows === 0){
    exit(json_encode(["status"=>"error","message"=>"Ticket not found"]));
}

$row = $result->fetch_assoc();
$stmt->close();

/* Ticket Variables */
$ticket_no      = $row['ticket_no'];
$ticket_title   = $row['ticket_title'];
$cname          = $row['name'];
$agent_id       = $row['agent_id'];
$email          = $row['email'];
$priority_name  = $row['priority_name'];
$estimateffort  = $row['estimate_effort'];
$approve_status = $row['approve_status'];
$created_on     = $row['created_at'];
$modate         = date("d.m.Y", strtotime($row['due_date']));

/* ===============================
   FETCH AGENT
============================== */
$agent_name = "Not Assigned";
$agentemail = "";

if(!empty($agent_id)){
    $agentStmt = $con->prepare("SELECT name,email FROM agents WHERE id=?");
    $agentStmt->bind_param("i",$agent_id);
    $agentStmt->execute();
    $agentRes = $agentStmt->get_result();
    if($agentRes->num_rows > 0){
        $agentRow = $agentRes->fetch_assoc();
        $agent_name  = $agentRow['name'];
        $agentemail  = $agentRow['email'];
    }
    $agentStmt->close();
}

/* ===============================
   SAFE UPDATE FUNCTION
============================== */
function updateTicket($con,$field,$value,$id){

    $allowedFields = ['status','approve_status'];
    if(!in_array($field,$allowedFields)){
        return [false,"Invalid field"];
    }

    $updated_at = date("Y-m-d H:i:s");

    $stmt = $con->prepare("UPDATE tickets SET {$field}=?, updated_at=? WHERE id=?");
    $stmt->bind_param("ssi",$value,$updated_at,$id);

    $success = $stmt->execute();
    $error   = $stmt->error;
    $stmt->close();

    return [$success,$error];
}


/* ===============================
   HANDLE STATUS UPDATE
============================== */
if(isset($_POST['status'])){

    $status = trim($_POST['status']);
    $allowed = ["Testing Passed","Testing Failed"];

    if(!in_array($status,$allowed)){
        exit(json_encode(["status"=>"error","message"=>"Invalid status value"]));
    }

    list($success,$error) = updateTicket($con,"status",$status,$id);

    if(!$success){
        exit(json_encode(["status"=>"error","message"=>$error]));
    }


    exit(json_encode(["status"=>"success","message"=>"Status updated successfully"]));
}

/* ===============================
   HANDLE APPROVE STATUS
============================== */
if(isset($_POST['approvestatus'])){

    $approvestatus = trim($_POST['approvestatus']);
    $allowed = ["In Approval","Approved","Rejected"];

    if(!in_array($approvestatus,$allowed)){
        exit(json_encode(["status"=>"error","message"=>"Invalid approve status value"]));
    }

    list($success,$error) = updateTicket($con,"approve_status",$approvestatus,$id);

    if(!$success){
        exit(json_encode(["status"=>"error","message"=>$error]));
    }

    exit(json_encode(["status"=>"success","message"=>"Approve status updated successfully"]));
}

exit(json_encode(["status"=>"error","message"=>"No valid parameter provided"]));