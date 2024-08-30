<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Include config file
require_once('include/database.php');

// Get parameters from the GET request
$method = isset($_GET['method']) ? $_GET['method'] : '';
$iaccess_id = isset($_GET['iaccess_id']) ? $_GET['iaccess_id'] : '';

if ($method == 'allallergies' && $iaccess_id) {
    // Fetch allergies associated with the given iaccess_id
    $stmt = $connect->prepare("
        SELECT a.id, a.title, a.type 
        FROM allergies a
        INNER JOIN iaccess_allergies ia ON a.id = ia.allergy_id
        WHERE ia.iaccess_id = ?
        ORDER BY a.type
    ");
    $stmt->bind_param("i", $iaccess_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $allergies = [];
    while ($row = $result->fetch_assoc()) {
        $allergies[] = $row;
    }

    echo json_encode($allergies);

} elseif ($method == 'otherallergies' && $iaccess_id) {
    // Fetch other allergies associated with the given iaccess_id
    $stmt = $connect->prepare("
        SELECT * 
        FROM iaccess_other_allergies 
        WHERE iaccess_id = ?
    ");
    $stmt->bind_param("i", $iaccess_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $otherAllergies = [];
    while ($row = $result->fetch_assoc()) {
        $otherAllergies[] = $row;
    }

    echo json_encode($otherAllergies);

} else {
    echo json_encode(["error" => "Invalid method or missing parameters"]);
}

$connect->close();
?>
