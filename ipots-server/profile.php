<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (!$connect) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()));
    exit();
}
// Get the parameters from URL
$username = $_GET['username'] ?? '';
$action = $_GET['action'] ?? '';

// Fetch user information

if($action==="iaccess"){
    $sql = "
    SELECT u.*, a.image, i.* 
    FROM iaccess AS i 
    LEFT JOIN avartars AS a ON i.avatar_id = a.id 
    LEFT JOIN users As u ON u.id = i.user_id
    WHERE u.username = ?
";
}else{
$sql = "
    SELECT u.*, a.image 
    FROM users AS u 
    LEFT JOIN avartars AS a ON u.avatar_id = a.id 
    WHERE u.username = ?
";}
$stmt = $connect->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["status" => "success", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}
?>