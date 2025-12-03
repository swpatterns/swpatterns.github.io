---
title: "Multiton - PHP"
date: 2025-12-03T11:10:59.926-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["PHP"]
---
The Multiton pattern ensures a restricted number of instances of a class are created, and provides a global access point to these instances. It's a variation of the Singleton pattern, allowing for more than one instance but still controlling instantiation. This implementation uses a static array to store the instances and a static method to retrieve them, creating them on demand up to the defined limit.  PHP's static properties and methods make this a natural fit, avoiding the need for complex dependency injection or service locators for controlled instantiation.

```php
<?php

class Multiton
{
    private static $instances = [];
    private static $maxInstances = 3;
    private $id;

    private function __construct(int $id)
    {
        $this->id = $id;
    }

    public static function getInstance(int $id): self
    {
        if (!isset(self::$instances[$id])) {
            if (count(self::$instances) < self::$maxInstances) {
                self::$instances[$id] = new self($id);
            } else {
                throw new \Exception("Maximum number of instances reached.");
            }
        }
        return self::$instances[$id];
    }

    public function getId(): int
    {
        return $this->id;
    }

    private function __clone() {} // Prevent cloning
    private function __wakeup() {} // Prevent unserialization
}

// Example Usage:
try {
    $instance1 = Multiton::getInstance(1);
    $instance2 = Multiton::getInstance(2);
    $instance3 = Multiton::getInstance(3);

    echo "Instance 1 ID: " . $instance1->getId() . PHP_EOL;
    echo "Instance 2 ID: " . $instance2->getId() . PHP_EOL;
    echo "Instance 3 ID: " . $instance3->getId() . PHP_EOL;

    // Attempting to create a fourth instance will throw an exception
    $instance4 = Multiton::getInstance(4);

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . PHP_EOL;
}
?>
```