<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Include config file
require_once('include/database.php');

$method = isset($_GET['method']) ? $_GET['method'] : '';
$letter = isset($_GET['letter']) ? $_GET['letter'] : '';

if ($method == 'All') {
    $stmt = $connect->prepare("SELECT * FROM medical_conditions");
    $stmt->execute();
    $result = $stmt->get_result();

    $conditions = [];
    while ($row = $result->fetch_assoc()) {
        $conditions[] = $row;
    }

    echo json_encode($conditions);

} elseif ($method == 'Letter' && $letter) {
    $stmt = $connect->prepare("SELECT * FROM medical_conditions WHERE term LIKE ?");
    $searchLetter = $letter . '%';
    $stmt->bind_param("s", $searchLetter);
    $stmt->execute();
    $result = $stmt->get_result();

    $conditions = [];
    while ($row = $result->fetch_assoc()) {
        $conditions[] = $row;
    }

    echo json_encode($conditions);

} else {
    echo json_encode(["error" => "Invalid method or missing parameters"]);
}

$connect->close();
?>
