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
$username = $_GET['id'] ?? '';
$action = $_GET['action'] ?? '';
$iaccess = $_GET['iaccess'] ?? '';
$type = $_GET['type'] ?? '';

//Check if the user has an iAccess account if action is not provided
if (empty($action)) {
    // Fetch iaccess and user_type_id
    $checkSql = "SELECT iaccess, user_type_id FROM users WHERE id = ?";
    $checkStmt = $connect->prepare($checkSql);
    $checkStmt->bind_param("s", $username);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows > 0) {
        $user = $checkResult->fetch_assoc();
        if ($user['iaccess'] == 1) {
            $action = "iaccess";
        } else {
            // Determine type based on user_type_id
            $userTypeSql = "
                SELECT type 
                FROM user_type 
                WHERE id = ?
            ";
            $userTypeStmt = $connect->prepare($userTypeSql);
            $userTypeStmt->bind_param("i", $user['user_type_id']);
            $userTypeStmt->execute();
            $userTypeResult = $userTypeStmt->get_result();

            if ($userTypeResult->num_rows > 0) {
                $userType = $userTypeResult->fetch_assoc();
                $action = $userType['type'];
            }
        }
    }
}

// Fetch user information

if($action==="iaccess"){
    $sql = "
    SELECT u.*, a.image, i.* 
    FROM iaccess AS i 
    LEFT JOIN avartars AS a ON i.avatar_id = a.id 
    LEFT JOIN users As u ON u.id = i.user_id
    WHERE u.id = ?
";
}else{
$sql = "
    SELECT u.*, a.image, t.type 
    FROM users AS u 
    LEFT JOIN avartars AS a ON u.avatar_id = a.id
    LEFT JOIN user_type as t ON u.user_type_id = t.id 
    WHERE u.id = ?
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