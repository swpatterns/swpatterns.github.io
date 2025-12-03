---
title: "Service Locator - PHP"
date: 2025-12-03T11:25:38.467-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["PHP"]
---
The Service Locator is a design pattern that centralizes the retrieval of dependencies (services) for an application. Instead of a component directly creating or locating its dependencies, it asks the Service Locator for them. This promotes loose coupling and makes it easier to substitute different implementations of services without modifying the dependent components.

The PHP code below demonstrates a simple Service Locator. A `ServiceLocator` class manages a registry of services, retrieved by keys.  Components then request services using the `$locator->getService('serviceName')` method. This is an idiomatic PHP approach using a static registry (though dependency injection containers are more common for larger applications), and leveraging PHP's flexible function/method calling mechanisms.  It avoids tight coupling by centralizing dependency resolution.

```php
<?php

class ServiceLocator
{
    /** @var array<string, callable> */
    private static $services = [];

    public static function registerService(string $name, callable $callback): void
    {
        self::$services[$name] = $callback;
    }

    public static function getService(string $name): mixed
    {
        if (!isset(self::$services[$name])) {
            throw new \InvalidArgumentException("Service '$name' not registered.");
        }
        return self::$services[$name]();
    }
}

// Define some services
ServiceLocator::registerService(
    'database',
    function () {
        return new DatabaseConnection('localhost', 'root', 'password', 'mydb');
    }
);

ServiceLocator::registerService(
    'logger',
    function () {
        return new Logger('app.log');
    }
);

class DatabaseConnection {
    public function __construct(string $host, string $user, string $pass, string $db) {
        // Simulate database connection
        echo "Connecting to database: $host/$db with user $user\n";
    }

    public function query(string $sql): void {
        echo "Executing query: $sql\n";
    }
}

class Logger {
    private string $filename;

    public function __construct(string $filename) {
        $this->filename = $filename;
        echo "Logger initialized, logging to $filename\n";
    }

    public function log(string $message): void {
        echo "Logging: $message\n";
    }
}


class MyComponent
{
    private DatabaseConnection $db;
    private Logger $logger;

    public function __construct()
    {
        $this->db = ServiceLocator::getService('database');
        $this->logger = ServiceLocator::getService('logger');
    }

    public function doSomething(): void
    {
        $this->db->query('SELECT * FROM users');
        $this->logger->log('Component did something.');
    }
}

// Usage
$component = new MyComponent();
$component->doSomething();

?>
```