---
title: "Client-Server - PHP"
date: 2025-12-03T14:35:15.737-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["PHP"]
---
The Client-Server pattern decouples a service provider (server) from its consumers (clients). The server provides resources or services, while clients request and utilize them. This promotes modularity, allowing the server to be updated or scaled independently of clients. Our PHP example simulates a simple time server. The server script receives a request, calculates the current time, and sends it back as a response. The client script makes an HTTP request to the server and displays the received time. This implementation uses PHP's built-in HTTP request functions for the client and basic script execution for the server, fitting PHP's common web-centric use case.

```php
<?php
// server.php

// Simulate a time service
header('Content-Type: text/plain');
echo date('Y-m-d H:i:s');

?>
```

```php
<?php
// client.php

<?php

$serverUrl = 'http://localhost/server.php'; // Adjust path if needed

$ch = curl_init($serverUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    echo "Current time from server: " . $response;
}

curl_close($ch);

?>
```