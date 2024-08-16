<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

require 'vendor/autoload.php';
require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
use \Firebase\JWT\JWT;

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

if (!isset($data->username) || !isset($data->password)) {
    echo json_encode(array("success" => false, "message" => "Invalid input"));
    exit();
}

$username = $data->username;
$password = $data->password;

// Check if the user exists
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = mysqli_query($connect, $sql);

if (mysqli_num_rows($result) === 1) {
    $user = mysqli_fetch_assoc($result);

    // Verify password
    if (password_verify($password, $user['password'])) {
        // Generate JWT token
        $key = $_ENV['key'];
        $algorithm = 'HS256'; // or any other algorithm you're using

        $issuedAt = time();
        $expirationTime = $issuedAt + 10800;  // JWT valid for 3 hours
        $payload = array(
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'data' => array(
                'user_id' =>$user['id'],
                'username' => $username,
                'email' => $user['email'],
            )
        );

        $jwt = JWT::encode($payload, $key, $algorithm);

        echo json_encode(array("success" => true, "token" => $jwt));
    } else {
        echo json_encode(array("success" => false, "message" => "Invalid credentials"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "User not found"));
}

mysqli_close($connect);
?>