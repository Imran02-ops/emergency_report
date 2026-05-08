<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include __DIR__ . '/../config/database.php';

// Ambil data JSON dari frontend
$data = json_decode(file_get_contents("php://input"), true);

// Validasi input
if (
    !isset($data['nama']) || empty(trim($data['nama'])) ||
    !isset($data['no_hp']) || empty(trim($data['no_hp']))
) {
    echo json_encode([
        "success" => false,
        "message" => "Nama dan nomor HP wajib diisi"
    ]);
    exit;
}

$nama = trim($data['nama']);
$no_hp = trim($data['no_hp']);

// Cek apakah nomor HP sudah ada
$checkStmt = mysqli_prepare($conn, "SELECT id FROM users WHERE no_hp = ?");
mysqli_stmt_bind_param($checkStmt, "s", $no_hp);
mysqli_stmt_execute($checkStmt);

$checkResult = mysqli_stmt_get_result($checkStmt);

if (mysqli_num_rows($checkResult) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Nomor HP sudah terdaftar"
    ]);

    mysqli_stmt_close($checkStmt);
    mysqli_close($conn);
    exit;
}

mysqli_stmt_close($checkStmt);

// Insert user baru
$insertStmt = mysqli_prepare(
    $conn,
    "INSERT INTO users (nama, no_hp, role) VALUES (?, ?, 'user')"
);

mysqli_stmt_bind_param($insertStmt, "ss", $nama, $no_hp);

if (mysqli_stmt_execute($insertStmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Registrasi berhasil"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Registrasi gagal"
    ]);
}

mysqli_stmt_close($insertStmt);
mysqli_close($conn);

?>