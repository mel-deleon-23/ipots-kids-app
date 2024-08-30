<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Include config file
require_once('include/database.php');

$method = isset($_GET['method']) ? $_GET['method'] : ''; 
$userId = isset($_GET['userId']) ? $_GET['userId'] : '';
$medicalConditionId = isset($_GET['medicalConditionId']) ? $_GET['medicalConditionId'] : '';

if ($method == 'All') {
    $stmt = $connect->prepare("SELECT * FROM my_medical_condition WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $medicalConditions = [];
    while ($row = $result->fetch_assoc()) {
        $medicalConditions[] = $row["medical_condition_id"];
    }

    echo json_encode($medicalConditions);

}
elseif ($method == 'showAll') {
    
    // Fetching medical conditions
    $stmt = $connect->prepare("SELECT mc.id, mc.term, mc.definition FROM medical_conditions mc JOIN my_medical_condition mmc ON mc.id = mmc.medical_condition_id WHERE mmc.user_id = ? ");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $medicalConditions = [];
    while ($row = $result->fetch_assoc()) {
        $medicalConditions[] = $row;
    }

    echo json_encode($medicalConditions);
} elseif ($method == 'Add') {

    $stmt = $connect->prepare("INSERT INTO my_medical_condition (user_id, medical_condition_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $userId, $medicalConditionId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Medical condition added successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

} elseif ($method == 'Delete') {

    $stmt = $connect->prepare("DELETE FROM my_medical_condition WHERE user_id = ? AND medical_condition_id = ?");
    $stmt->bind_param("ii", $userId, $medicalConditionId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Medical condition removed successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }
}

$connect->close();
?>
