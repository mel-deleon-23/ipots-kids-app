<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$supervisor_id = $data->supervisor_id;

$response = array();

if (empty($username)) {
    $response['status'] = 'error';
    $response['message'] = 'Username is required';
    echo json_encode($response);
    exit;
}

// Fetch the kid's ID using the provided username
$query = "SELECT id FROM users WHERE username = ?";
$stmt = $connect->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($kid_id);
    $stmt->fetch();

    // Insert into kids_adding_handle table
    $insert_query = "INSERT INTO kids_adding_handle (kid_id, supervisor_id, accept) VALUES (?, ?, ?)";
    $accept = 0;
    $insert_stmt = $connect->prepare($insert_query);
    $insert_stmt->bind_param("iii", $kid_id, $supervisor_id, $accept);

    if ($insert_stmt->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Kid added successfully to kids_adding_handle';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Failed to add kid to kids_adding_handle';
    }

    $insert_stmt->close();
} else {
    $response['status'] = 'error';
    $response['message'] = 'Username not found';
}

$stmt->close();
$connect->close();

echo json_encode($response);
?>