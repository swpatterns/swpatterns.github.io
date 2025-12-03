---
title: "Singleton - PHP"
date: 2025-12-03T11:07:21.826-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["PHP"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources that should only exist once, like database connections or configuration settings. The PHP implementation utilizes a static method `getInstance()` to control instance creation, delaying instantiation until it's first requested.  A private constructor prevents direct instantiation from outside the class.  This approach aligns with PHP's ability to manage class state through static methods and properties, offering a clean and controlled way to ensure a single instance.

```php
<?php

/**
 * Singleton class.
 */
class Singleton
{
    /**
     * The single instance.
     *
     * @var Singleton|null
     */
    private static ?Singleton $instance = null;

    /**
     * Private constructor to prevent direct instantiation.
     */
    private function __construct()
    {
        // Initialization code here, if any
    }

    /**
     * Get the single instance of the class.
     *
     * @return Singleton
     */
    public static function getInstance(): Singleton
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Prevent cloning of the instance.
     */
    private function __clone()
    {
    }

    /**
     * Prevent unserialization of the instance.
     */
    public function __wakeup()
    {
    }

    /**
     * Example method.
     *
     * @return string
     */
    public function doSomething(): string
    {
        return 'Singleton is doing something!';
    }
}

// Usage:
require_once 'Singleton.php';

$instance1 = Singleton::getInstance();
$instance2 = Singleton::getInstance();

echo $instance1->doSomething() . "\n";
echo $instance1 === $instance2; // Output: 1 (true)
?>
```