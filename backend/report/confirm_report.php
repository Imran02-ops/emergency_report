<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "ID tidak ditemukan"
    ]);
    exit;
}

$id = $data['id'];

$stmt = $conn->prepare("
    UPDATE reports 
    SET operator_confirm = 'diterima'
    WHERE id = ?
");

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Laporan diterima"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Gagal update"
    ]);
}

$stmt->close();
$conn->close();
?>