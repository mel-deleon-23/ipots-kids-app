<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");


$story = isset($_GET['story']) ? (int)$_GET['story'] : 1;

$storyFile = 'json/questions.json';
if (file_exists($storyFile)) {
    $storiesData = file_get_contents($storyFile);
    $stories = json_decode($storiesData, true);

    if (json_last_error() === JSON_ERROR_NONE && array_key_exists($story, $stories)) {
        echo json_encode($stories[$story]);
    } else {
        echo json_encode(['error' => 'Invalid level or error decoding JSON']);
    }
} else {
    echo json_encode(['error' => 'Story file not found']);
}
?>