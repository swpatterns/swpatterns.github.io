---
title: "Monolith - PHP"
date: 2025-12-03T14:27:34.845-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["PHP"]
---
The Monolith pattern represents a traditional software architecture where all functionalities are tightly coupled and deployed as a single, indivisible unit. This example showcases a simple PHP monolith handling user registration and basic greetings. All related code – database connection, user handling, and view output – resides within a single script.  This simplicity is characteristic of monoliths, though it can become unwieldy at scale. The PHP implementation directly reflects this direct, procedural approach, focusing on immediate execution without extensive class or interface definitions.  This is common for smaller PHP projects or quick prototypes where the complexity doesn't yet warrant a more distributed architecture.

```php
<?php

// Database configuration
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "monolith_example";

// Connect to the database
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle user registration
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];

    $sql = "INSERT INTO users (username, email) VALUES ('$username', '$email')";
    if ($conn->query($sql) === TRUE) {
        $message = "Registration successful!";
    } else {
        $message = "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Retrieve and display users
$sql = "SELECT id, username FROM users";
$result = $conn->query($sql);
$users = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Output HTML
?>

<!DOCTYPE html>
<html>
<head>
    <title>Monolith Example</title>
</head>
<body>

    <h1>User Registration</h1>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        Username: <input type="text" name="username"><br>
        Email: <input type="email" name="email"><br>
        <input type="submit" value="Register">
    </form>

    <?php if (isset($message)): ?>
        <p><?php echo $message; ?></p>
    <?php endif; ?>

    <h2>Registered Users</h2>
    <ul>
        <?php foreach ($users as $user): ?>
            <li><?php echo $user["username"]; ?> (ID: <?php echo $user["id"]; ?>)</li>
        <?php endforeach; ?>
    </ul>

</body>
</html>

<?php
$conn->close();
?>
```