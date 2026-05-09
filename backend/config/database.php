<?php
header("Content-Type: application/json");

$host = "localhost";
$username = "root";
$password = "";
$database = "pelaporan_darurat";
$port = 3307; // ganti 3306 kalau mysql kamu pakai 3306

$conn = mysqli_connect($host, $username, $password, $database, $port);

if (!$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database gagal connect: " . mysqli_connect_error()
    ]);
    exit;
}
?>