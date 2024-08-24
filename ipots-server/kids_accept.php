<?php
include('include/config.php');
include('include/database.php');
include('include/functions.php');

// Allow CORS from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: authorization, Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the input data
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['kid_id'], $input['supervisor_id'])) {
    $kid_id = $input['kid_id'];
    $supervisor_id = $input['supervisor_id'];

    // Ensure database connection
    if (!$connect) {
        echo json_encode(["status" => "error", "message" => "Database connection failed"]);
        exit();
    }

    // Begin transaction
    $connect->begin_transaction();

    try {
        // Fetch supervisor type from users table
        $query = "SELECT user_type_id FROM users WHERE id = ?";
        $stmt = $connect->prepare($query);
        $stmt->bind_param("i", $supervisor_id);
        $stmt->execute();
        $stmt->bind_result($user_type_id);
        $stmt->fetch();
        $stmt->close();

        if ($user_type_id === null) {
            throw new Exception("Supervisor not found");
        }

        // Determine supervisor role based on user_type_id
        if ($user_type_id === 2) { // Teachers
            $update_query = "UPDATE kids SET teacher_id = ? WHERE user_id = ?";
        } elseif ($user_type_id === 3) { // Parents
            $update_query = "UPDATE kids SET parents_id = ? WHERE user_id = ?";
        } else {
            throw new Exception("Invalid user type");
        }

        // Update the appropriate supervisor field in the kids table
        $update_stmt = $connect->prepare($update_query);
        if ($update_stmt) {
            $update_stmt->bind_param("ii", $supervisor_id, $kid_id);
            $update_stmt->execute();
            $update_stmt->close();
        } else {
            throw new Exception("Prepare statement for update failed: " . $connect->error);
        }

        // Delete the pending record
        $delete_query = "DELETE FROM kids_adding_handle WHERE kid_id = ?";
        $delete_stmt = $connect->prepare($delete_query);
        if ($delete_stmt) {
            $delete_stmt->bind_param("i", $kid_id);
            $delete_stmt->execute();
            $delete_stmt->close();
        } else {
            throw new Exception("Prepare statement for delete failed: " . $connect->error);
        }

        // Commit transaction
        $connect->commit();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        // Rollback transaction if there's an error
        $connect->rollback();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>