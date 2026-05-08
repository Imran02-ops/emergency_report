<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "pelaporan_darurat";
$port = 3307;

$conn = mysqli_connect($host, $username, $password, $database, $port);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>