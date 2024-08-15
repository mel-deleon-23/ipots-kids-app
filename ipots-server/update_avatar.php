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

if (!isset($data->username) || !isset($data->imageId) || !isset($data->imageName)) {
    echo json_encode(array("success" => false, "message" => "Invalid input"));
    exit();
}

$username = $data->username;
$imageId = $data->imageId;
$action = $data->action;



$sql = "UPDATE users SET avatar_id='$imageId' WHERE username='$username'";

if (mysqli_query($connect, $sql)) {
    echo json_encode(array("status" => "success", "message" => "Avatar updated successfully"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error: " . $sql . "<br>" . mysqli_error($connect)));
}

mysqli_close($connect);
?>