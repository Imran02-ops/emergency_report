<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$status = $data['status'];

mysqli_query(
    $conn,
    "UPDATE reports SET status='$status' WHERE id='$id'"
);

echo json_encode([
    "success" => true
]);
?>