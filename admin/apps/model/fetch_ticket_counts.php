<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

/* ===============================
   GET COUNTS
============================== */

$totalResult = $con->query("SELECT COUNT(*) as total FROM tickets");
$total = $totalResult->fetch_assoc()['total'];

$openTickets = $con->query("SELECT COUNT(*) as total FROM tickets WHERE status = 'Open'");
$open = $openTickets->fetch_assoc()['total'];

$closedResult = $con->query("SELECT COUNT(*) as total FROM tickets WHERE status = 'Closed'");
$closed = $closedResult->fetch_assoc()['total'];

$rejectedResult = $con->query("SELECT COUNT(*) as total FROM tickets WHERE status = 'Rejected'");
$rejected = $rejectedResult->fetch_assoc()['total'];

$progressResult = $con->query("SELECT COUNT(*) as total FROM tickets WHERE status = 'Under Testing'");
$undertesting = $progressResult->fetch_assoc()['total'];

$TestingpassedResult = $con->query("SELECT COUNT(*) as total FROM tickets WHERE status = 'Testing Passed'");
$passedtesting = $TestingpassedResult->fetch_assoc()['total'];

$failedTestingResult = $con->query("SELECT COUNT(*) as total FROM tickets WHERE status = 'Testing Failed'");
$failedtesting = $failedTestingResult->fetch_assoc()['total'];


echo json_encode([
    "status" => "success",
    "total" => (int)$total,
    "open" => (int)$open,
    "closed" => (int)$closed,
    "rejected" => (int)$rejected,
    "undertesting" => (int)$undertesting,
    "passedtesting" => (int)$passedtesting,
     "failedtesting" => (int)$failedtesting,
]);
