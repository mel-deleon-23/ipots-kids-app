<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: http://localhost:5173");
    $data = ['message' => 'Contact test page iPOTS KIDS'];
    echo json_encode($data);
?>