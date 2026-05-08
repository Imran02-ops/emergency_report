<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include __DIR__ . '/../config/database.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode([]);
    exit;
}

$query = "
    SELECT * 
    FROM reports 
    WHERE user_id = '$user_id'
    ORDER BY id DESC
";

$result = mysqli_query($conn, $query);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $row['operator_confirm'] = $row['operator_confirm'] ?? 'belum';
    $data[] = $row;
}

echo json_encode($data);
?>