 <?php 
$password = "1234";
// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
echo $hashedPassword;
?>