<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");

$triviaData = [
    'levels' => [
        [
            'level' => 1,
            'title' => 'Flamingo',
            'description' => 'This story is about a flamingo who travelled to space',
            'image' => 'images/trivia-menu/Flamingo.png'
        ],
        [
            'level' => 2,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Camel.png'
        ],
        [
            'level' => 3,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 4,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 5,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 6,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 7,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 8,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 9,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png' 
        ],
        [
            'level' => 10,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png' 
        ],
        [
            'level' => 11,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 12,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png' 
        ],
        [
            'level' => 13,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png' 
        ],
        [
            'level' => 14,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ],
        [
            'level' => 15,
            'title' => 'Peacock',
            'description' => 'This is the story about a peacock who...',
            'image' => 'images/trivia-menu/Peacock.png'
        ]
    ]
];

echo json_encode($triviaData);
?>
