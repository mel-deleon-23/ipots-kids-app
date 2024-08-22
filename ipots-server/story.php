<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");

// Get the level parameter from the request
$level = isset($_GET['level']) ? intval($_GET['level']) : 1;

// Check if the level is provided and the story exists
$storiesFile = 'json/stories.json';
if (file_exists($storiesFile)) {
    $storiesData = file_get_contents($storiesFile);
    $stories = json_decode($storiesData, true);

    if (json_last_error() === JSON_ERROR_NONE && array_key_exists($level, $stories)) {
        echo json_encode($stories[$level]);
    } else {
        echo json_encode(['error' => 'Invalid level or error decoding JSON']);
    }
} else {
    echo json_encode(['error' => 'Stories file not found']);
}
// if ($level && array_key_exists($level, $stories)) {
//     $response = [
//         "status" => "success",
//         "story" => $stories[$level]
//     ];
// } else {
//     $response = [
//         "status" => "error",
//         "message" => "Story not found"
//     ];
// }

// echo json_encode($response);
?>