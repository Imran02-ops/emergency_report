<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include __DIR__ . '/../config/database.php';

// Ambil data JSON dari frontend
$data = json_decode(file_get_contents("php://input"), true);

// Validasi input
if (!isset($data['no_hp']) || empty(trim($data['no_hp']))) {
    echo json_encode([
        "success" => false,
        "message" => "Nomor HP wajib diisi"
    ]);
    exit;
}

$no_hp = trim($data['no_hp']);

// Prepared statement
$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE no_hp = ?");
mysqli_stmt_bind_param($stmt, "s", $no_hp);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

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

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>