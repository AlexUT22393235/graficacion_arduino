<?php
// Configuración de la conexión a la base de datos
$host = 'localhost';
$dbname = 'sm52_arduino1';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Configura el PDO error mode a excepción
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta SQL para obtener los datos del sensor ultrasonico
 

    // Consulta SQL para obtener los datos del sensor de temperatura
    $sql = "SELECT id_temperatura, temperatura FROM temperatura ORDER BY id_temperatura DESC LIMIT 100";
    $stmt = $pdo->query($sql);

    // Combina los resultados de ambas consultas en un solo array
    $data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    

    // Enviar datos en formato JSON
    echo json_encode($data);
} catch (PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}