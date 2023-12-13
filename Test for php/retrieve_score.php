<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$db_host = "localhost";
$db_user = "wesselr4";
$db_password = 'NWSCPwQ4srD+I7';
$db_name = "zwesselr4";

try {
    $dbh = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prepare the SQL statement
    $stmt = $dbh->query("SELECT high_score FROM HighScores ORDER BY high_score DESC LIMIT 1");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // Set the Content-Type header
    header('Content-Type: application/json');

    if ($row !== false) {
        echo json_encode($row);
    } else {
        // Handle the case when no results are found
        echo json_encode(['error' => 'No high score found']);
    }
} catch (PDOException $e) {
    // If an error occurs, send an error response back to JavaScript
    $errorResponse = ['error' => 'Database error: ' . $e->getMessage()];
    header('Content-Type: application/json');
    http_response_code(500); // Set appropriate HTTP status code for an error
    echo json_encode($errorResponse);
}
?>

