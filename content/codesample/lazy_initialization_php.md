---
title: "Lazy Initialization - PHP"
date: 2025-12-03T11:18:24.307-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["PHP"]
---
The Lazy Initialization pattern delays the creation of an expensive object until its first use. This improves performance by avoiding unnecessary object creation if the object's methods are never called. The provided PHP code implements this using a private static property to hold the instance and a public static method (`getInstance()`) to create it only if it doesn't already exist. This approach is common in PHP for managing resources like database connections or configuration loaders, and fits the language's style due to its reliance on dynamic instantiation and static methods for singleton-like behavior. It also avoids global state while still providing global access.

```php
<?php

class HeavyObject
{
    private static ?HeavyObject $instance = null;
    private string $data;

    private function __construct()
    {
        // Simulate expensive initialization.
        sleep(1);
        $this->data = "Object initialized!";
    }

    public function getData(): string
    {
        return $this->data;
    }

    public static function getInstance(): HeavyObject
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}

// Usage:
// The object isn't created until getInstance() is called.

// No initialization yet.
echo "Before getInstance call.\n";

// First call initializes the object.
$object1 = HeavyObject::getInstance();
echo $object1->getData() . "\n";

// Subsequent calls return the existing instance.
$object2 = HeavyObject::getInstance();
echo $object2->getData() . "\n";

echo "Both objects are the same: " . (spl_object_id($object1) === spl_object_id($object2)) . "\n";
?>
```