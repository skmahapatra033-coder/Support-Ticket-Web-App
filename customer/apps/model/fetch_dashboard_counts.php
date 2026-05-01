<?php
include "../../../dbcon/config.php";
include "../../../session.php";
header("Content-Type: application/json");

/* ===============================
   COUNT QUERIES
============================== */

$totalOpenTickets = $con->query("SELECT COUNT(*) as opentotal FROM tickets WHERE status = 'Open' AND customer_id = {$_SESSION['customer_id']}")
                        ->fetch_assoc()['opentotal'];

$closeTickets = $con->query("SELECT COUNT(*) as closetotal FROM tickets WHERE status = 'Closed' AND customer_id = {$_SESSION['customer_id']}")
                    ->fetch_assoc()['closetotal'];

$rejectedTickets = $con->query("SELECT COUNT(*) as rejecttotal FROM tickets WHERE status = 'Rejected' AND customer_id = {$_SESSION['customer_id']}")
                      ->fetch_assoc()['rejecttotal'];

$underTestingTickets = $con->query("SELECT COUNT(*) as utestingtotal FROM tickets WHERE status = 'Under Testing' AND customer_id = {$_SESSION['customer_id']}")
                      ->fetch_assoc()['utestingtotal'];

$passTestingTickets = $con->query("SELECT COUNT(*) as tpasstotal FROM tickets WHERE status = 'Testing Passed' AND customer_id = {$_SESSION['customer_id']}")
                      ->fetch_assoc()['tpasstotal'];

$failedTestingTickets = $con->query("SELECT COUNT(*) as tfailedtotal FROM tickets WHERE status = 'Testing Failed' AND customer_id = {$_SESSION['customer_id']}")
                      ->fetch_assoc()['tfailedtotal'];
                      
$InapprovalTickets = $con->query("SELECT COUNT(*) as inapprovatotal FROM tickets WHERE estimate_effort > 0 AND approve_status = 'In Approval' AND customer_id = {$_SESSION['customer_id']}")
                      ->fetch_assoc()['inapprovatotal'];

echo json_encode([
    "status" => "success",
    "totalOpenTickets" => (int)$totalOpenTickets,
    "closeTickets" => (int)$closeTickets,
    "rejectedTickets" => (int)$rejectedTickets,
    "underTestingTickets" => (int)$underTestingTickets,
    "passTestingTickets" => (int)$passTestingTickets,
    "failedTestingTickets" => (int)$failedTestingTickets,
    "InapprovalTickets" => (int)$InapprovalTickets,
]);
