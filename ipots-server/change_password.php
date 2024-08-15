<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if (!$connect) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()));
    exit();
}

$data = json_decode(file_get_contents("php://input"));

$currentPass = $data->currentPass;
$newPass = $data->newPass;
$username = $data->username;
$action = $data->action;

// Check if the current password and new password are provided
if (empty($currentPass) || empty($newPass)) {
    echo json_encode(['status' => 'error', 'message' => 'Current password and new password are required.']);
    exit();
}


// Fetch the current password from the database
$query = $connect->prepare("SELECT password FROM users WHERE username = ?");
$query->bind_param("s", $username);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

if ($user) {
    $storedPass = $user['password'];

    // Verify that the current password matches the stored hashed password
    if (password_verify($currentPass, $storedPass)) {
        // Hash the new password before storing it
        $hashedNewPass = password_hash($newPass, PASSWORD_DEFAULT);

        // Update the password in the database
        $updateQuery = $connect->prepare("UPDATE users SET password = ? WHERE username = ?");
        $updateQuery->bind_param("ss", $hashedNewPass, $username);

        if ($updateQuery->execute()) {
            echo json_encode(array("status" => "success", "message" => "Password updated successfully"));
        } else {
            echo json_encode(array("status" => "error", "message" => "Error updating password: " . $updateQuery->error));
        }
    } else {
        echo json_encode(array("status" => "error", "message" => "Current password is incorrect"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "User not found"));
}



mysqli_close($connect);
?>