<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include __DIR__ . '/../config/database.php';

$query = mysqli_query($conn,"SELECT * FROM reports ORDER BY id DESC");

$data = [];

while($row = mysqli_fetch_assoc($query)){
   $data[] = $row;
}

echo json_encode($data);
?>