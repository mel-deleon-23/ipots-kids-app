<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");

$storyData = [
    'stories' => [
        [
            'id' => 1,
            'title' => 'Flamingo',
            'description' => 'This is the story about a flamnigo who travelled to space',
            'image' => 'images/read-story/Flamingo.png'
        ]
    ]
];

echo json_encode($storyData);
?>
