<?php
header("Content-Type: application/json");
include('include/config.php');
include('include/database.php');
include('include/functions.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$response = array("status" => "error", "message" => "Unknown error");

if (!$connect) {
    $response["message"] = "Database connection failed: " . mysqli_connect_error();
    echo json_encode($response);
    exit();
}

// Check and sanitize the ID
$id = isset($_GET['id']) ? $connect->real_escape_string($_GET['id']) : '';

// Validate the kid_id
if (!isset($id) || !is_numeric($id)) {
    $response["message"] = "Invalid kid ID";
    echo json_encode($response);
    exit();
}

// Find the supervisor_id for the given kid_id
$query = "
    SELECT supervisor_id
    FROM kids_adding_handle
    WHERE kid_id = ?
";
$stmt = $connect->prepare($query);
if (!$stmt) {
    $response["message"] = "Prepare statement failed: " . $connect->error;
    echo json_encode($response);
    exit();
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$supervisor = $result->fetch_assoc();

if (!$supervisor) {
    $response["message"] = "No supervisor found for the given kid ID";
    echo json_encode($response);
    exit();
}

$supervisor_id = $supervisor['supervisor_id'];

// Fetch pending kids associated with the given supervisor_id
$query = "
    SELECT kp.kid_id, u.username 
    FROM kids_adding_handle kp
    JOIN users u ON kp.kid_id = u.id
    WHERE kp.supervisor_id = ? AND kp.accept = 0
";
$stmt = $connect->prepare($query);
if (!$stmt) {
    $response["message"] = "Prepare statement failed: " . $connect->error;
    echo json_encode($response);
    exit();
}

$stmt->bind_param("i", $supervisor_id);
$stmt->execute();
$result = $stmt->get_result();

// Fetch data and build response
$pending_kids = array();
while ($row = $result->fetch_assoc()) {
    $pending_kids[] = $row;
}

// Fetch the supervisor's username
$query = "
    SELECT username, id as supervisor_id
    FROM users
    WHERE id = ?
";
$stmt = $connect->prepare($query);
if (!$stmt) {
    $response["message"] = "Prepare statement failed: " . $connect->error;
    echo json_encode($response);
    exit();
}

$stmt->bind_param("i", $supervisor_id);
$stmt->execute();
$result = $stmt->get_result();
$supervisor_data = $result->fetch_assoc();

if (!$supervisor_data) {
    $response["message"] = "No supervisor username found";
    echo json_encode($response);
    exit();
}

$supervisor_username = $supervisor_data['username'];

// Return the pending kids and supervisor's username
$response = array(
    "status" => "success",
    "pendingKids" => $pending_kids,
    "supervisorUsername" => $supervisor_username,
    "supervisor_id" => $supervisor_id
);

echo json_encode($response);
?>