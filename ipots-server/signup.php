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

if (!isset($data->username) || !isset($data->password)|| !isset($data->dateOfBirth)) {
    echo json_encode(array("success" => false, "message" => "Invalid input"));
    exit();
}
$email = $data->email;
$username = $data->username;
$password = password_hash($data->password, PASSWORD_BCRYPT);
$action = $data->action;
$accept = $data->accept;
$birthday = $data->dateOfBirth;
$parental = $data->parental ?? 0;
$image = $data->imageId;
$imageName = $data->imageName;

$key = $_ENV['key'];
$algorithm = 'HS256'; // or any other algorithm you're using
// //Compare date of birth and the condition
// $birthDay = new DateTime($birthday);
// $today = new DateTime();
// $age = $today -> diff($birthDay)->y;

// // age validation
// $valid = false;
// $ageError = "Invalid age for the selected role";

// Determine the table based on the action
$table = "";
switch ($action) {
    case "kids":
        $table = "kids";
        // $valid = ($age < 13);
        break;
    case "teachers":
        $table = "teachers";
        // $valid = ($age >= 19);
        break;
    case "parents":
        $table = "parents";
        // $valid = ($age >= 19);
        break;
    case "iaccess":
        $table = "iaccess";
        // $valid = ($age >= 13);
        break;
    default:
        echo json_encode(array("status" => "error", "message" => "Invalid action"));
        exit();
}

$columns = "email, username, password, birthday, avatar_id,consent";
$values = "'$email', '$username', '$password', '$birthday', '$image','$accept'";

if ($action === "kids") {
    $columns .= ", parent_consent";
    $values .= ", '$parental'";
}

$sql = "INSERT INTO $table ($columns) VALUES ($values)";

// $sql = "INSERT INTO $table (email,username, password, birthday) VALUES ('$email','$username', '$password', '$birthday')";


if (mysqli_query($connect, $sql)) {
    // Generate JWT token
    $issuedAt = time();
    $expirationTime = $issuedAt + 10800;  // jwt valid for 3 hours (10800 seconds)
    $payload = array(
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'data' => array(
            'email' => $email,
            'username' => $username,
            'action' => $action,
            // 'password'=>$password,
            // 'image'=>$imageName,
        )
    );

    $jwt = JWT::encode($payload, $key , $algorithm);

    setcookie("token", $jwt, $expirationTime, "/", "", false, true);

    echo json_encode(array("status" => "success", "token" => $jwt));
} else {
    echo json_encode(array("status" => "error", "message" => "Error: " . $sql . "<br>" . mysqli_error($connect)));
}

mysqli_close($connect);
?>