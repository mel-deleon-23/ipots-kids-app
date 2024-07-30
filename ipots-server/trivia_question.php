<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");


$level = isset($_GET['level']) ? (int)$_GET['level'] : 1;

$questionsFile = 'json/questions.json';
if (file_exists($questionsFile)) {
    $questionsData = file_get_contents($questionsFile);
    $questions = json_decode($questionsData, true);

    if (json_last_error() === JSON_ERROR_NONE && array_key_exists($level, $questions)) {
        echo json_encode($questions[$level]);
    } else {
        echo json_encode(['error' => 'Invalid level or error decoding JSON']);
    }
} else {
    echo json_encode(['error' => 'Questions file not found']);
}
?>