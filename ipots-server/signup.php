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
$children = $data ->numberOfChildren ?? 0;
$firstname = $data -> firstname ?? 0;
$lastname = $data ->lastname ?? 0;
$city = $data->city ?? 0;
$country = $data->country ?? 0;

$key = $_ENV['key'];
$algorithm = 'HS256';


// Determine the platform and type based on the action
$platform = "";
$type = "";
switch ($action) {
    case "kids":
        $platform = 1;
        $type = 1;
        break;
    case "teachers":
        $platform = 1;
        $type = 2;
        break;
    case "parents":
        $platform = 1;
        $type = 3;
        break;
    case "iaccess":
        $platform = 2;
        break;
    default:
        echo json_encode(array("status" => "error", "message" => "Invalid action"));
        exit();
}

$columns = "email, username, password, birthday, avatar_id,consent,platform_id,user_type_id";
$values = "'$email', '$username', '$password', '$birthday', '$image','$accept','$platform','$type'";

$sql = "INSERT INTO users ($columns) VALUES ($values)";

// $sql = "INSERT INTO $table (email,username, password, birthday) VALUES ('$email','$username', '$password', '$birthday')";


if (mysqli_query($connect, $sql)) {

    // Get the last inserted user_id
    $user_id = mysqli_insert_id($connect);

    if ($action === "kids") {
        // Insert into kids table
        $insertKidSql = "INSERT INTO kids (user_id, parent_consent) VALUES ('$user_id', '$parental')";
        if (!mysqli_query($connect, $insertKidSql)) {
            echo json_encode(array("status" => "error", "message" => "Error inserting into kids table: " . mysqli_error($connect)));
            exit();
        }
    } elseif ($action === "teachers") {
        // Insert into teachers table
        $insertTeacherSql = "INSERT INTO teachers (user_id, children) VALUES ('$user_id',$children')";
        if (!mysqli_query($connect, $insertTeacherSql)) {
            echo json_encode(array("status" => "error", "message" => "Error inserting into teachers table: " . mysqli_error($connect)));
            exit();
        }
    } elseif ($action === "parents") {
        // Insert into parents table
        $insertParentSql = "INSERT INTO parents (user_id, children) VALUES ('$user_id',$children)";
        if (!mysqli_query($connect, $insertParentSql)) {
            echo json_encode(array("status" => "error", "message" => "Error inserting into parents table: " . mysqli_error($connect)));
            exit();
        }
    }elseif ($action === "iaccess") {
        // Insert into parents table
        $insertParentSql = "INSERT INTO iaccess (user_id, firstname, lastname, city, country, avatar_id) VALUES ('$user_id','$firstname','$lastname','$city','$country','$image')";
        if (!mysqli_query($connect, $insertParentSql)) {
            echo json_encode(array("status" => "error", "message" => "Error inserting into parents table: " . mysqli_error($connect)));
            exit();
        }
    }

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