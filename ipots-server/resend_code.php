<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

require 'vendor/autoload.php'; // Include Composer's autoloader

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


if(mysqli_query($connect, $sql)){
// Send verification email
$emailContent = new Mail();
$emailContent->setFrom("hathaonhin@gmail.com", "iPOTS Team");
$emailContent->setSubject("Confirm your registration");
$emailContent->addTo($email);
$emailContent->addContent("text/html", "
<html>
<head>
  <title>Resend A New Code</title>
</head>
<body>
  <p>Hi,</p>
  <h3>Verification Code</h3>
  <p>Your new verification code is <strong>$code</strong>.</p>
  <p>Best regards</p>
  <p>iPOTS Team</p>
</body>
</html>
");

$sendGrid = new \SendGrid('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');

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