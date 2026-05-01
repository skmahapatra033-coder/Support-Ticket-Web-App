<?php
include "../../../dbcon/config.php";
header("Content-Type: application/json");

/* ===============================
   GET CUSTOMER FILTER
============================== */

$customer_id = isset($_GET['customer_id']) ? (int)$_GET['customer_id'] : 0;

/* ===============================
   BUILD CONDITION
============================== */

$customerCondition = "";
if ($customer_id > 0) {
    $customerCondition = " AND customer_id = $customer_id ";
}

/* ===============================
   COUNT QUERIES
============================== */

// Agents (optional: if agents linked to customer)
$totalAgents = $con->query("SELECT COUNT(*) as total FROM agents a inner join users u on a.id=u.customer_id where u.status='active'") ->fetch_assoc()['total'];


$totalOpenTickets = $con->query("
    SELECT COUNT(*) as total 
    FROM tickets 
    WHERE status = 'Open' $customerCondition
")->fetch_assoc()['total'];

$closeTickets = $con->query("
    SELECT COUNT(*) as total 
    FROM tickets 
    WHERE status = 'Closed' $customerCondition
")->fetch_assoc()['total'];

$rejectedTickets = $con->query("
    SELECT COUNT(*) as total 
    FROM tickets 
    WHERE status = 'Rejected' $customerCondition
")->fetch_assoc()['total'];

$underTestingTickets = $con->query("
    SELECT COUNT(*) as total 
    FROM tickets 
    WHERE status = 'Under Testing' $customerCondition
")->fetch_assoc()['total'];

$passTestingTickets = $con->query("
    SELECT COUNT(*) as total 
    FROM tickets 
    WHERE status = 'Testing Passed' $customerCondition
")->fetch_assoc()['total'];

$failedTestingTickets = $con->query("
    SELECT COUNT(*) as total 
    FROM tickets 
    WHERE status = 'Testing Failed' $customerCondition
")->fetch_assoc()['total'];

$InapprovalTickets = $con->query("
    SELECT COUNT(*) as total 
    FROM tickets 
    WHERE estimate_effort > 0 
    AND approve_status = 'In Approval'
    $customerCondition
")->fetch_assoc()['total'];

echo json_encode([
    "status" => "success",
    "totalAgents" => (int)$totalAgents,
    "totalOpenTickets" => (int)$totalOpenTickets,
    "closeTickets" => (int)$closeTickets,
    "rejectedTickets" => (int)$rejectedTickets,
    "underTestingTickets" => (int)$underTestingTickets,
    "passTestingTickets" => (int)$passTestingTickets,
    "failedTestingTickets" => (int)$failedTestingTickets,
    "InapprovalTickets" => (int)$InapprovalTickets,
]);
