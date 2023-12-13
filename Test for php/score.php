<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$db_host = "localhost";
$db_user = "wesselr4";
$db_password = 'NWSCPwQ4srD+I7';
$db_name = "zwesselr4";

try {
    $connection = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Assuming your table structure has a column named 'high_score'
    $high_score = $_POST['high_score'];

    $stmt = $connection->prepare("INSERT INTO HighScores (high_score) VALUES (:high_score)");
    $stmt->bindParam(':high_score', $high_score);
    $stmt->execute();
    
    echo "High score inserted successfully!";
}
catch(PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>