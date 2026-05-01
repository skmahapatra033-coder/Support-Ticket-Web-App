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
$name   = trim($_POST['name'] ?? '');
$email  = trim($_POST['email'] ?? '');
$phone  = trim($_POST['phone'] ?? '');
$gender = trim($_POST['gender'] ?? '');
$about  = $_POST['about'] ?? '';
$password = $_POST['password'] ?? '';

if (!$id || !is_numeric($id)) {
    exit(json_encode(["status"=>"error","message"=>"Invalid ID"]));
}

if (empty($name) || empty($email)) {
    exit(json_encode(["status"=>"error","message"=>"Name and Email required"]));
}

/* ===============================
   START TRANSACTION
============================== */
$con->begin_transaction();

try {

/* ===============================
   CHECK USER EXISTS
============================== */
$stmt = $con->prepare("SELECT profile FROM customers WHERE id=?");
$stmt->bind_param("i",$id);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows === 0){
    throw new Exception("User not found");
}

$user = $result->fetch_assoc();
$oldImage = $user['profile'];
$stmt->close();

/* ===============================
   CHECK EMAIL UNIQUE
============================== */
$emailStmt = $con->prepare("SELECT id FROM customers WHERE email=? AND id!=?");
$emailStmt->bind_param("si",$email,$id);
$emailStmt->execute();
$emailStmt->store_result();

if($emailStmt->num_rows > 0){
    throw new Exception("Email already exists");
}
$emailStmt->close();

/* ===============================
   IMAGE UPLOAD
============================== */
$uploadDir = '../../../uploads/customers/';
$newImagePath = $oldImage;

if(isset($_FILES['profile']) && $_FILES['profile']['error'] === 0){

    $allowedTypes = ['image/jpeg','image/png','image/jpg','image/webp'];
    $fileType = mime_content_type($_FILES['profile']['tmp_name']);

    if(!in_array($fileType,$allowedTypes)){
        throw new Exception("Invalid image type");
    }

    if($_FILES['profile']['size'] > 2 * 1024 * 1024){
        throw new Exception("Image must be under 2MB");
    }

    $ext = pathinfo($_FILES['profile']['name'], PATHINFO_EXTENSION);
    $newFileName = "customer_".$id."_".time().".".$ext;
    $targetPath = $uploadDir.$newFileName;

    if(!move_uploaded_file($_FILES['profile']['tmp_name'],$targetPath)){
        throw new Exception("Image upload failed");
    }

    // Delete old image
    if(!empty($oldImage) && file_exists("../../../".$oldImage)){
        unlink("../../../".$oldImage);
    }

    $newImagePath = "uploads/customers/".$newFileName;
}

/* ===============================
   UPDATE CUSTOMERS TABLE
============================== */
$updated_at = date("Y-m-d H:i:s");

if(!empty($password)){
    $hashedPassword = password_hash($password,PASSWORD_DEFAULT);

    $stmt = $con->prepare("
        UPDATE customers
        SET name=?, email=?, phone=?, gender=?, about=?,
            password=?, profile=?, updated_at=?
        WHERE id=?
    ");
    $stmt->bind_param(
        "ssssssssi",
        $name,$email,$phone,$gender,$about,
        $hashedPassword,$newImagePath,$updated_at,$id
    );

}else{

    $stmt = $con->prepare("
        UPDATE customers
        SET name=?, email=?, phone=?, gender=?, about=?,
            profile=?, updated_at=?
        WHERE id=?
    ");
    $stmt->bind_param(
        "sssssssi",
        $name,$email,$phone,$gender,$about,
        $newImagePath,$updated_at,$id
    );
}

if(!$stmt->execute()){
    throw new Exception($stmt->error);
}
$stmt->close();

/* ===============================
   UPDATE USERS TABLE
============================== */
if(!empty($password)){

    $stmt2 = $con->prepare("
        UPDATE users
        SET email=?, password=?
        WHERE customer_id=?
    ");
    $stmt2->bind_param(
        "ssi",
        $name,$email,$hashedPassword,$id
    );

}else{

    $stmt2 = $con->prepare("
        UPDATE users
        SET email=?
        WHERE customer_id=?
    ");
    $stmt2->bind_param(
        "si",
        $email,$id
    );
}

if(!$stmt2->execute()){
    throw new Exception($stmt2->error);
}
$stmt2->close();

/* ===============================
   COMMIT
============================== */
$con->commit();

echo json_encode([
    "status"=>"success",
    "message"=>"Profile updated successfully"
]);

}catch(Exception $e){

    $con->rollback();

    echo json_encode([
        "status"=>"error",
        "message"=>$e->getMessage()
    ]);
}

$con->close();
