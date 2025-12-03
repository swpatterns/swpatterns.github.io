---
title: "Null Object - PHP"
date: 2025-12-03T13:48:49.751-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["PHP"]
---
The Null Object pattern provides a default object with no-op behavior to handle cases where an object is expected but may not exist. This avoids null checks throughout the code, improving readability and reducing potential errors.  The example implements a `Customer` interface with methods like `getName` and `getOrders`.  `NullCustomer` implements the same interface, returning default values (empty string for name, empty array for orders) instead of throwing errors or requiring conditional logic.  This is idiomatic PHP as interfaces are commonly used for loose coupling, and returning default values is preferred over strict error handling when a reasonable fallback exists.

```php
<?php

/**
 * Customer Interface
 */
interface Customer
{
    public function getName(): string;
    public function getOrders(): array;
}

/**
 * Concrete Customer Implementation
 */
class RealCustomer implements Customer
{
    private string $name;
    private array $orders;

    public function __construct(string $name, array $orders)
    {
        $this->name = $name;
        $this->orders = $orders;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getOrders(): array
    {
        return $this->orders;
    }
}

/**
 * Null Customer Implementation
 */
class NullCustomer implements Customer
{
    public function getName(): string
    {
        return '';
    }

    public function getOrders(): array
    {
        return [];
    }
}

/**
 * Example Usage
 */
function processCustomer(Customer $customer): void
{
    echo "Customer Name: " . $customer->getName() . PHP_EOL;
    echo "Number of Orders: " . count($customer->getOrders()) . PHP_EOL;
}

// Usage with a real customer
$realCustomer = new RealCustomer("Alice", ["Order 1", "Order 2"]);
processCustomer($realCustomer);

// Usage with a null customer
$nullCustomer = new NullCustomer();
processCustomer($nullCustomer);

?>
```