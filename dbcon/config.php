<?php
// Database credentials
$DB_HOST = "localhost";
$DB_USER = "root";
$DB_PASS = "";
$DB_NAME = "conduitsdb";

// Create connection
$con = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if (!$con) {
	die("Database Connection Failed: " . mysqli_connect_error());
}

// Set charset to UTF-8
mysqli_set_charset($con, "utf8");

// Optional: set timezone
date_default_timezone_set("Asia/Kolkata");
