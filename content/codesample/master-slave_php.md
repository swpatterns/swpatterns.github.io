---
title: "Master-Slave - PHP"
date: 2025-12-03T15:34:02.530-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["PHP"]
---
The Master-Slave pattern involves a primary database (Master) handling all write operations, while one or more read-only replicas (Slaves) serve read requests. This improves performance by distributing the read load and provides read scalability. The PHP code demonstrates a simple abstraction for interacting with a Master-Slave setup using PDO. A `DatabaseManager` class handles connection routing based on the operation type (read or write).  The `getMaster()` and `getSlave()` methods return appropriate PDO connections. This approach is idiomatic PHP as it leverages PDO for database abstraction and uses a class to encapsulate the connection logic, promoting maintainability and separation of concerns.

```php
<?php

class DatabaseManager {
    private $masterConfig;
    private $slaveConfig;
    private $masterConnection;
    private $slaveConnection;

    public function __construct(array $masterConfig, array $slaveConfig) {
        $this->masterConfig = $masterConfig;
        $this->slaveConfig = $slaveConfig;
    }

    private function getMaster(): PDO {
        if ($this->masterConnection === null) {
            $dsn = "{$this->masterConfig['driver']}:host={$this->masterConfig['host']};dbname={$this->masterConfig['dbname']}";
            $this->masterConnection = new PDO($dsn, $this->masterConfig['user'], $this->masterConfig['password']);
            $this->masterConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return $this->masterConnection;
    }

    private function getSlave(): PDO {
        if ($this->slaveConnection === null) {
            $dsn = "{$this->slaveConfig['driver']}:host={$this->slaveConfig['host']};dbname={$this->slaveConfig['dbname']}";
            $this->slaveConnection = new PDO($dsn, $this->slaveConfig['user'], $this->slaveConfig['password']);
            $this->slaveConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return $this->slaveConnection;
    }

    public function query(string $sql, array $params = [], bool $isWrite = false): array {
        try {
            $connection = $isWrite ? $this->getMaster() : $this->getSlave();
            $statement = $connection->prepare($sql);
            $statement->execute($params);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Log the error or handle it appropriately
            error_log("Database Error: " . $e->getMessage());
            return [];
        }
    }
}

// Example Usage:
$masterConfig = [
    'driver' => 'mysql',
    'host' => 'localhost',
    'dbname' => 'mydatabase',
    'user' => 'master_user',
    'password' => 'master_password',
];

$slaveConfig = [
    'driver' => 'mysql',
    'host' => 'localhost',
    'dbname' => 'mydatabase',
    'user' => 'slave_user',
    'password' => 'slave_password',
];

$dbManager = new DatabaseManager($masterConfig, $slaveConfig);

// Write operation
$dbManager->query("INSERT INTO users (name) VALUES ('John Doe')", [], true);

// Read operation
$users = $dbManager->query("SELECT * FROM users", [], false);
print_r($users);

?>
```