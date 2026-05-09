<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include __DIR__ . '/../config/database.php';

$tujuan = $_GET['tujuan'] ?? '';

$query = "
SELECT 
    reports.*,
    users.nama,
    users.no_hp
FROM reports
LEFT JOIN users ON reports.user_id = users.id
WHERE reports.tujuan = '$tujuan'
ORDER BY reports.id DESC
";

$result = mysqli_query($conn, $query);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>