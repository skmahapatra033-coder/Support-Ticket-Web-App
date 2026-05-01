<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

/* ===============================
   INPUT
============================== */
$ticket_id      = $_POST['ticket_id'] ?? '';
$estimate_effort = $_POST['estimate_effort'] ?? '';
$actual_effort   = $_POST['actual_effort'] ?? '';

if (!ctype_digit($ticket_id)) {
    exit(json_encode(["status"=>"error","message"=>"Invalid Ticket ID"]));
}

 

/* ===============================
   FETCH TICKET DETAILS
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
$stmt->bind_param("i",$ticket_id);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows === 0){
    exit(json_encode(["status"=>"error","message"=>"Ticket not found"]));
}

$row = $result->fetch_assoc();
$stmt->close();

/* Variables */
$ticket_no      = $row['ticket_no'];
$ticket_title   = $row['ticket_title'];
$cname          = $row['name'];
$agent_id       = $row['agent_id'];
$email          = $row['email'];
$priority_name  = $row['priority_name'];
$approve_status = $row['approve_status'];
$created_on     = $row['created_at'];
$status         = $row['status'];
$modate         = date("d.m.Y", strtotime($row['due_date']));

/* ===============================
   FETCH AGENT (SAFE)
============================== */
$agent_name  = "Not Assigned";
$agentemail  = "";

if(!empty($agent_id)){
    $a = $con->prepare("SELECT name,email FROM agents WHERE id=?");
    $a->bind_param("i",$agent_id);
    $a->execute();
    $ar = $a->get_result();
    if($ar->num_rows > 0){
        $agent = $ar->fetch_assoc();
        $agent_name  = $agent['name'];
        $agentemail  = $agent['email'];
    }
    $a->close();
}

/* ===============================
   START TRANSACTION
============================== */
$con->begin_transaction();

try {

    /* Update efforts */
    $update = $con->prepare("
        UPDATE tickets 
        SET estimate_effort = ?, actual_effort = ?, updated_at = NOW()
        WHERE id = ?
    ");
    $update->bind_param("ddi", $estimate_effort, $actual_effort, $ticket_id);

    if(!$update->execute()){
        throw new Exception($update->error);
    }
    $update->close();


    /* Commit if everything successful */
    $con->commit();

    echo json_encode(["status"=>"success","message"=>"Effort updated and email sent"]);

} catch (Exception $e) {

    $con->rollback();

    echo json_encode([
        "status"=>"error",
        "message"=>$e->getMessage()
    ]);
}