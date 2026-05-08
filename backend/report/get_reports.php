<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include __DIR__ . '/../config/database.php';

$query = "SELECT * FROM reports ORDER BY id DESC";
$result = mysqli_query($conn, $query);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    // FIX NULL SAFE
    $row['operator_confirm'] = $row['operator_confirm'] ?? "belum";
    $data[] = $row;
}

echo json_encode($data);
?>