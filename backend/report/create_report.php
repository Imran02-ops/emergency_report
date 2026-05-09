<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? '';
$kategori = $data['kategori'] ?? '';
$deskripsi = $data['deskripsi'] ?? '';
$latitude = $data['latitude'] ?? '';
$longitude = $data['longitude'] ?? '';

$alamat = "https://maps.google.com/?q=$latitude,$longitude";

if (
    empty($user_id) ||
    empty($kategori) ||
    empty($deskripsi) ||
    empty($latitude) ||
    empty($longitude)
) {
    echo json_encode([
        "success" => false,
        "message" => "Data belum lengkap"
    ]);
    exit;
}

$tujuan = "operator";

switch ($kategori) {
    case "kebakaran":
        $tujuan = "pemadam";
        break;

    case "kecelakaan":
        $tujuan = "ambulance";
        break;

    case "kriminal":
        $tujuan = "polisi";
        break;
}

$query = "INSERT INTO reports (
    user_id,
    kategori,
    deskripsi,
    alamat,
    latitude,
    longitude,
    tujuan,
    operator_confirm,
    status
) VALUES (
    '$user_id',
    '$kategori',
    '$deskripsi',
    '$alamat',
    '$latitude',
    '$longitude',
    '$tujuan',
    'belum',
    'menunggu'
)";

if (mysqli_query($conn, $query)) {
    echo json_encode([
        "success" => true,
        "message" => "Laporan berhasil dikirim ke " . $tujuan
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);
}
?>