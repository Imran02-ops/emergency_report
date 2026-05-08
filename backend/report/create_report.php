<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$kategori = $data['kategori'];
$deskripsi = $data['deskripsi'];
$alamat = $data['alamat'];
$latitude = $data['latitude'];
$longitude = $data['longitude'];

$tujuan = "ambulance";
if ($kategori == "kriminal") $tujuan = "polisi";
if ($kategori == "kebakaran") $tujuan = "pemadam";

mysqli_query($conn,"
INSERT INTO reports
(user_id,kategori,deskripsi,alamat,tujuan_instansi,latitude,longitude)
VALUES
('$user_id','$kategori','$deskripsi','$alamat','$tujuan','$latitude','$longitude')
");

echo json_encode(["success"=>true]);
?>