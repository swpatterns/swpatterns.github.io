---
title: "N-tier - PHP"
date: 2025-12-03T14:40:05.995-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["PHP"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application more maintainable, testable, and scalable. A typical N-tier architecture includes a presentation tier (UI), a business logic tier, and a data access tier.

This PHP example demonstrates a simple 3-tier architecture for managing user data. The `UserController` (Presentation) handles requests and responses. The `UserService` (Business Logic) contains the core application logic for user operations. The `UserRepository` (Data Access) interacts with a hypothetical database (represented here by a simple array) to retrieve and store user data.  This structure is common in PHP applications, particularly those using frameworks like Laravel or Symfony, and leverages PHP's class-based structure for clear organization.

```php
<?php

// Model: User.php
class User {
    public int $id;
    public string $name;
    public string $email;

    public function __construct(int $id, string $name, string $email) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }
}

// Data Access Layer: UserRepository.php
class UserRepository {
    private array $users = [
        1 => new User(1, 'John Doe', 'john.doe@example.com'),
        2 => new User(2, 'Jane Smith', 'jane.smith@example.com'),
    ];

    public function getUser(int $id): ?User {
        return $this->users[$id] ?? null;
    }
}

// Business Logic Layer: UserService.php
class UserService {
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function getUserDetails(int $id): ?User {
        return $this->userRepository->getUser($id);
    }
}

// Presentation Layer: UserController.php
class UserController {
    private UserService $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function showUser(int $id): ?string {
        $user = $this->userService->getUserDetails($id);

        if ($user) {
            return "User ID: {$user->id}, Name: {$user->name}, Email: {$user->email}";
        } else {
            return "User not found.";
        }
    }
}

// Example Usage
$userRepository = new UserRepository();
$userService = new UserService($userRepository);
$userController = new UserController($userService);

echo $userController->showUser(1) . PHP_EOL; // Output: User ID: 1, Name: John Doe, Email: john.doe@example.com
echo $userController->showUser(3) . PHP_EOL; // Output: User not found.

?>
```