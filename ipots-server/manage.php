<?php
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

if (empty($id)) {
    $response["message"] = "Missing or invalid user ID. Provided ID: '$id'";
    echo json_encode($response);
    exit();
}

$data = array();

// Fetch accepted kids from the `kids` table
$sqlAccepted = "SELECT kid.id, kid.user_id, u.username, 'Accepted' as status
FROM kids as kid
LEFT JOIN users as u ON u.id = kid.user_id
WHERE kid.teacher_id = '$id' OR kid.parents_id = '$id'";

$resultAccepted = $connect->query($sqlAccepted);

if ($resultAccepted->num_rows > 0) {
    while ($row = $resultAccepted->fetch_assoc()) {
        $data[] = $row;
    }
}

// Fetch pending kids from the `kids_adding_handle` table
$sqlPending = "SELECT kah.kid_id as id, u.username, 'Pending' as status
FROM kids_adding_handle as kah
LEFT JOIN users as u ON u.id = kah.kid_id
WHERE kah.supervisor_id = '$id' AND kah.accept = 0";

$resultPending = $connect->query($sqlPending);

if ($resultPending->num_rows > 0) {
    while ($row = $resultPending->fetch_assoc()) {
        $data[] = $row;
    }
}

// Prepare response based on the fetched data
if (empty($data)) {
    $response = array("status" => "success", "user" => array(), "message" => "No kids found.");
} else {
    $response = array("status" => "success", "user" => $data);
}

$connect->close();
echo json_encode($response);
?>