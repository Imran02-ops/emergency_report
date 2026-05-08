<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include __DIR__ . '/../config/database.php';

if (!$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

$query = "SELECT * FROM reports ORDER BY id DESC";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);
    exit;
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $row['operator_confirm'] = $row['operator_confirm'] ?? "belum";
    $row['created_at'] = $row['created_at'] ?? date('Y-m-d H:i:s');
    $data[] = $row;
}

echo json_encode($data, JSON_PRETTY_PRINT);
?>