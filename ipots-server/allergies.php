<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if (!$connect) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()));
    exit();
}
$type = isset($_GET['type']) ? $connect->real_escape_string($_GET['type']) : '';

// Prepare and execute the query
$sql = "SELECT * FROM allergies WHERE type = '$type'";
$result = $connect->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo json_encode(array());
    exit();
}

$connect->close();

echo json_encode($data);


?>