---
title: "Object Pool - PHP"
date: 2025-12-03T11:15:09.761-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["PHP"]
---
The Object Pool pattern manages a group of reusable objects, reducing the performance overhead of frequent object creation and destruction. Instead of creating a new object each time one is needed, the pool provides a pre-instantiated object from its collection. When the object is no longer needed, it’s returned to the pool, rather than destroyed, to be reused later. This example uses a simple `DatabaseConnection` class and a `ConnectionPool` to manage them, demonstrating how PHP can benefit from this pattern when dealing with resource-intensive operations. The use of a static pool instance and `try...catch` ensures proper resource handling and availability.

```php
<?php

class DatabaseConnection {
    private $host = 'localhost';
    private $username = 'user';
    private $password = 'password';
    private $dbName = 'dbname';
    private $connection;

    private function __construct() {
        $this->connection = new PDO("mysql:host=$this->host;dbname=$this->dbName", $this->username, $this->password);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function executeQuery(string $query): array {
        return $this->connection->query($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function close(): void {
        $this->connection = null;
    }

    // Prevent direct instantiation
    private static $instance = null;
    public static function getInstance(): DatabaseConnection {
      if(self::$instance === null){
        self::$instance = new DatabaseConnection();
      }
      return self::$instance;
    }
}


class ConnectionPool {
    private $pool = [];
    private $maxSize;

    public function __construct(int $maxSize) {
        $this->maxSize = $maxSize;
    }

    public function acquire(): DatabaseConnection {
        if (empty($this->pool)) {
            if (count($this->pool) < $this->maxSize) {
                return new DatabaseConnection();
            } else {
                throw new Exception("Connection pool is exhausted.");
            }
        }
        return array_pop($this->pool);
    }

    public function release(DatabaseConnection $connection): void {
        if (count($this->pool) < $this->maxSize) {
            $this->pool[] = $connection;
        }
    }
}

// Usage Example:
$pool = new ConnectionPool(5);

try {
    $connection1 = $pool->acquire();
    $results1 = $connection1->executeQuery("SELECT * FROM users");
    print_r($results1);
    $pool->release($connection1);

    $connection2 = $pool->acquire();
    $results2 = $connection2->executeQuery("SELECT * FROM products");
    print_r($results2);
    $pool->release($connection2);

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>
```