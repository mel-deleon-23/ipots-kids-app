<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

require 'vendor/autoload.php'; // Include Composer's autoloader
require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use SendGrid\Mail\Mail;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email)) {
    echo json_encode(array("status" => "error", "message" => "Invalid input"));
    exit();
}

$email = $data->email;
$code = rand(100000, 999999); // Generate a 6-digit code

// Save the verification code and email in the database for later verification
$sql = "UPDATE verification_code SET code='$code' WHERE email='$email'";

$emailAu = $_ENV['email'];

if(mysqli_query($connect, $sql)){
// Send verification email
$emailContent = new Mail();
$emailContent->setFrom($emailAu, "iPOTS Team");
$emailContent->setSubject("Confirm your registration");
$emailContent->addTo($email);
$emailContent->addContent("text/html", "
<html>
<head>
  <title>Resend A New Code</title>
</head>
<body>
   <p>Dear Friend,</p>
  <p>Please use the following confirmation code to finalize your registration with iPOTS:</p>
  <p>CODE: <strong>$code</strong></p>
  <p>If you did not request the, please ignore this email.</p>
  <p>Warm wishes,</p>
  <p>iPOTS Team</p>
</body>
</html>
");

$apiKey = $_ENV['API_KEY'];

$sendGrid = new \SendGrid($apiKey);

try {
    $response = $sendGrid->send($emailContent);
    if ($response->statusCode() == 202) {
        echo json_encode(array("status" => "success", "message" => "Verification code resent successfully"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to resend confirmation code . Please try again."));
    }
} catch (Exception $e) {
    echo json_encode(array("status" => "error", "message" => "Caught exception: " . $e->getMessage()));
}
}
else {
    echo json_encode(array("status" => "error", "message" => "Failed to update verification code in the database"));
}



mysqli_close($connect);
?>