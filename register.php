<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database connection setup
$servername = "localhost";
$username_db = "root";
$password_db = "lambo";
$dbname = "videotranscript";

// Create connection
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array('error' => 'Database connection failed.')));
}

// Get the POST data
$postData = file_get_contents("php://input");
$data = json_decode($postData, true);

// Check if data is valid
if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(array('error' => 'Both fields are required.'));
    exit();
}

$username = $data['username'];
$password = $data['password'];

// Hash the password before storing it
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert the data into the database
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(array('message' => 'Registration successful!'));
} else {
    echo json_encode(array('error' => 'Error registering user.'));
}

$stmt->close();
$conn->close();
?>
