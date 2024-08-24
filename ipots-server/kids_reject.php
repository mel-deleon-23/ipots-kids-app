<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

// Allow CORS from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: authorization, Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
$input = json_decode(file_get_contents("php://input"), true);

$kid_id = $input['kid_id'];

// Delete the pending record
$delete_query = "DELETE FROM kids_adding_handle WHERE kid_id = ?";
$delete_stmt = $connect->prepare($delete_query);
$delete_stmt->bind_param("i", $kid_id);
$delete_stmt->execute();

$response = array("status" => "success");
echo json_encode($response);
?>