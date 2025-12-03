---
title: "Space-Based Architecture - PHP"
date: 2025-12-03T14:59:56.916-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["PHP"]
---
The Space-Based Architecture pattern organizes code into loosely coupled, independent "spaces" or modules, each responsible for a specific aspect of the application. These spaces communicate through well-defined interfaces, minimizing dependencies and promoting modularity. This implementation uses PHP namespaces to define these spaces. Each space (e.g., `User`, `Product`, `Order`) contains related classes. A central "kernel" or "bootstrap" file handles dependency injection and initial setup, allowing spaces to be used independently or composed into larger applications. This approach aligns with PHP's namespace feature and encourages a more organized, maintainable codebase, especially for larger projects.

```php
<?php

namespace App\User;

interface UserRepository {
    public function getUser(int $id): ?User;
}

class User {
    private int $id;
    private string $name;

    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getName(): string {
        return $this->name;
    }
}

class InMemoryUserRepository implements UserRepository {
    private array $users = [
        1 => new User(1, "Alice"),
        2 => new User(2, "Bob"),
    ];

    public function getUser(int $id): ?User {
        return $this->users[$id] ?? null;
    }
}

namespace App\Product;

class Product {
    private int $id;
    private string $name;
    private float $price;

    public function __construct(int $id, string $name, float $price) {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getPrice(): float {
        return $this->price;
    }
}

// Kernel/Bootstrap - minimal example
require_once __DIR__ . '/../vendor/autoload.php'; // Assuming Composer autoloader

function bootstrap(): void {
    // Dependency Injection - could be more sophisticated
    $userRepository = new InMemoryUserRepository();
    // Spaces can now use $userRepository
}

bootstrap();

// Example Usage (outside the spaces, relying on bootstrap)
$user = $userRepository->getUser(1);
if ($user) {
    echo "User: " . $user->getName() . "\n";
}

$product = new Product(101, "Example Product", 19.99);
echo "Product: " . $product->getName() . "\n";
?>
```