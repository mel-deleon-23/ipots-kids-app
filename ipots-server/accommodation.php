<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Include config file
require_once('include/database.php');
// include('includes/config.php');

$category = isset($_GET['category']) ? $_GET['category'] : 'Cognitive';
$location = isset($_GET['location']) ? $_GET['location'] : 'Work';
$medicalCondition = isset($_GET['medicalCondition']) ? $_GET['medicalCondition'] : NULL;

if ($category == "Medical Devices") {
    $category = "Medical_devices";
}

if ($category == "Mental Health") {
    $category = "Mental_Health";
}
// because for now school_lecture and school_test both has same data
if ($location == "School") {
    $location = "School_lecture";
}

$response = [];
if ($location == "All") {
    if (isset($medicalCondition)) {
        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE $category = '1' And medical_condition = ?");
        if ($stmt) {
            $stmt->bind_param("s", $medicalCondition);
            $stmt->execute();
            $result = $stmt->get_result();

            // Fetch data 
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    } else {

        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE $category = 1 ");
        if ($stmt) {
            // $stmt->bind_param("s", $category);
            $stmt->execute();
            $result = $stmt->get_result();

            // Fetch data 
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    }
} else {

    if (isset($medicalCondition)) {
        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE $category = 1 AND $location = 1 And medical_condition = ?");
        if ($stmt) {
            $stmt->bind_param("s", $medicalCondition);
            $stmt->execute();
            $result = $stmt->get_result();

            // Fetch data 
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    } else {

        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE $category = 1 AND $location = 1 ");
        if ($stmt) {
            // $stmt->bind_param("ss", $category, $location);
            $stmt->execute();
            $result = $stmt->get_result();

            // Fetch data 
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    }
}



// Close connection
mysqli_close($connect);

// Send the response as JSON
echo json_encode($response);
