<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";
 
/* ===============================
   VALIDATE METHOD
============================== */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit(json_encode(["status"=>"error","message"=>"Invalid request method"]));
}

/* ===============================
   GET INPUT
============================== */
$id     = $_POST['id'] ?? '';
$status = trim($_POST['status'] ?? '');

if (!$id || !is_numeric($id)) {
    exit(json_encode(["status"=>"error","message"=>"Invalid ticket ID"]));
}

/* ===============================
   VALIDATE STATUS
============================== */
$allowedStatuses = [
    "Open",
    "Rejected",
    "Closed",
    "Under Testing",
    "Testing Passed",
    "Testing Failed"
];

if (!in_array($status, $allowedStatuses)) {
    exit(json_encode(["status"=>"error","message"=>"Invalid status value"]));
}

/* ===============================
   FETCH TICKET
============================== */
$stmt = $con->prepare("
    SELECT t.ticket_title,t.ticket_no,t.created_at,
           t.agent_id,t.email,t.due_date,
           t.estimate_effort,t.approve_status,
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

/* Variables */
$ticket_no      = $row['ticket_no'];
$ticket_title   = $row['ticket_title'];
$cname          = $row['name'];
$agent_id       = $row['agent_id'];
$email          = $row['email'];
$priority_name  = $row['priority_name'];
$estimateffort  = $row['estimate_effort'];
$approve_status   = $row['approve_status'];
$created_on     = $row['created_at'];
$modate         = date("d.m.Y", strtotime($row['due_date']));

/* ===============================
   FETCH AGENT
============================== */
$agent_name  = "Not Assigned";
$agentemail  = "";

if(!empty($agent_id)){
    $agentStmt = $con->prepare("SELECT name,email FROM agents WHERE id=?");
    $agentStmt->bind_param("i",$agent_id);
    $agentStmt->execute();
    $agentRes = $agentStmt->get_result();
    if($agentRes->num_rows > 0){
        $agentRow  = $agentRes->fetch_assoc();
        $agent_name = $agentRow['name'];
        $agentemail = $agentRow['email'];
    }
    $agentStmt->close();
}

/* ===============================
   UPDATE STATUS
============================== */
$updated_at = date("Y-m-d H:i:s");

$updateStmt = $con->prepare("UPDATE tickets SET status=?, updated_at=? WHERE id=?");
$updateStmt->bind_param("ssi",$status,$updated_at,$id);

if(!$updateStmt->execute()){
    exit(json_encode(["status"=>"error","message"=>$updateStmt->error]));
}

$updateStmt->close();


/* ===============================
   FINAL RESPONSE
============================== */
echo json_encode([
    "status"=>"success",
    "message"=>"Status updated successfully"
]);

$con->close();
