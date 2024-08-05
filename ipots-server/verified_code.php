<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->code)) {
    echo json_encode(array("status" => "error", "message" => "Invalid input"));
    exit();
}

$email = $data->email;
$code = $data->code; // Ensure this matches the field name from the frontend

// Debug: Output the email and code
error_log("Email: $email, Code: $code");

// Sanitize inputs
$email = mysqli_real_escape_string($connect, $email);
$code = mysqli_real_escape_string($connect, $code);

// Check if the code is valid
$sql = "SELECT * FROM verification_code WHERE email = '$email' AND code = '$code'";
$result = mysqli_query($connect, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    // Code is valid, delete from the table
    $sql = "DELETE FROM verification_code WHERE email = '$email'";
    mysqli_query($connect, $sql);

    echo json_encode(array("status" => "success", "message" => "Verification successful"));
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid verification code"));
}

mysqli_close($connect);
?>