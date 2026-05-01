<?php
header('Content-Type: application/json');

$secretKey = "6LdWgmMmAAAAAFssPJdP-Pbw3mqSm1pZoEXOzVTe";

if(!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])){
    echo json_encode(["status"=>"error","message"=>"Captcha required"]);
    exit;
}

$captcha = $_POST['g-recaptcha-response'];
$ip = $_SERVER['REMOTE_ADDR'];

$verify = file_get_contents(
    "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$captcha&remoteip=$ip"
);

$responseData = json_decode($verify);

if(!$responseData->success){
    echo json_encode(["status"=>"error","message"=>"Captcha verification failed"]);
    exit;
}

/* ---------------- LOGIN VALIDATION ---------------- */

$email = $_POST['email'] ?? '';
$password  = $_POST['password'] ?? '';

if($email == '' || $password == ''){
    echo json_encode(["status"=>"error","message"=>"All fields required"]);
    exit;
}

/* your database check here */
// example success
echo json_encode(["status"=>"success"]);
