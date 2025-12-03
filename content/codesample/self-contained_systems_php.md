---
title: "Self-contained Systems - PHP"
date: 2025-12-03T14:31:01.260-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["PHP"]
---
The Self-Contained System pattern advocates for building independent, deployable units of functionality within a larger application. Each system manages its own dependencies and data, minimizing external coupling. This fosters resilience, testability, and independent development/deployment. 

The code demonstrates a simplified "Order Processing" system. It encapsulates order creation, validation (using a dedicated validator class), and persistence (to a simple array for demonstration). Crucially, all dependencies are managed *within* the system itself: the validator is instantiated inside the OrderProcessor, and persistence is handled directly. This makes the OrderProcessor relatively independent and easier to test in isolation.  PHP’s class-based structure naturally aligns with creating these self-contained units.  Using dependency injection *within* the class is often preferred for simpler systems like this in PHP, due to its pragmatic nature.

```php
<?php

class Order {
    public function __construct(
        public int $orderId,
        public string $customerId,
        public array $items,
        public float $totalAmount
    ) {}
}

class OrderValidator {
    public function validate(array $orderData): bool {
        if (!isset($orderData['customerId']) || empty($orderData['customerId'])) {
            return false;
        }
        if (!isset($orderData['items']) || !is_array($orderData['items'])) {
            return false;
        }
        if (!isset($orderData['totalAmount']) || !is_numeric($orderData['totalAmount'])) {
            return false;
        }

        return true;
    }
}

class OrderProcessor {
    private array $orders = [];

    public function __construct() {
        $this->validator = new OrderValidator();
    }

    public function createOrder(array $orderData): ?Order {
        if (!$this->validator->validate($orderData)) {
            return null; // Validation failed
        }

        $orderId = count($this->orders) + 1;
        $newOrder = new Order($orderId, $orderData['customerId'], $orderData['items'], floatval($orderData['totalAmount']));
        $this->orders[$orderId] = $newOrder;
        return $newOrder;
    }

    public function getOrder(int $orderId): ?Order {
        return $this->orders[$orderId] ?? null;
    }
}

// Example Usage
$processor = new OrderProcessor();

$orderData = [
    'customerId' => 'user123',
    'items' => ['productA', 'productB'],
    'totalAmount' => 50.00,
];

$order = $processor->createOrder($orderData);

if ($order) {
    echo "Order created with ID: " . $order->orderId . "\n";
    $retrievedOrder = $processor->getOrder($order->orderId);
    print_r($retrievedOrder);
} else {
    echo "Order creation failed (validation).\n";
}

?>
```