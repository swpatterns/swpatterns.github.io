---
title: "Microservices - PHP"
date: 2025-12-03T14:45:18.230-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["PHP"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, built around specific business capabilities. Each service owns its data and communicates with others typically via lightweight mechanisms like HTTP. This example simulates a simple e-commerce system with `OrderService` and `ProductService`.  Each service has its own basic logic.  Communication is achieved through simple function calls (in a real-world scenario, this would be API calls). This approach promotes modularity, scalability, and independent development/deployment, fitting PHP's capability for creating independent scripts and utilizing frameworks for API development.

```php
<?php

// ProductService.php
class ProductService {
    private $products = [
        1 => ['id' => 1, 'name' => 'Shirt', 'price' => 20],
        2 => ['id' => 2, 'name' => 'Pants', 'price' => 30],
    ];

    public function getProduct(int $id): ?array {
        return $this->products[$id] ?? null;
    }
}

// OrderService.php
class OrderService {
    private $productService;

    public function __construct(ProductService $productService) {
        $this->productService = $productService;
    }

    public function createOrder(int $productId, int $quantity): array {
        $product = $this->productService->getProduct($productId);

        if (!$product) {
            return ['error' => 'Product not found'];
        }

        $totalPrice = $product['price'] * $quantity;
        return ['order_id' => uniqid(), 'product_id' => $productId, 'quantity' => $quantity, 'total_price' => $totalPrice];
    }
}

// Example Usage (could be a separate script or entry point)
require_once 'ProductService.php';
require_once 'OrderService.php';

$productService = new ProductService();
$orderService = new OrderService($productService);

$order = $orderService->createOrder(1, 2);

if (isset($order['error'])) {
    echo $order['error'];
} else {
    echo "Order created: " . json_encode($order);
}
?>
```