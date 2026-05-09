<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$no_hp = $data["no_hp"] ?? "";

if (!$no_hp) {
    echo json_encode([
        "success" => false,
        "message" => "Nomor HP wajib diisi"
    ]);
    exit;
}

$sql = "SELECT * FROM users WHERE no_hp='$no_hp' LIMIT 1";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);
    exit;
}

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);

    echo json_encode([
        "success" => true,
        "user" => $user
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "User tidak ditemukan"
    ]);
}
?>