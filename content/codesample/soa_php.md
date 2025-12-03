---
title: "SOA - PHP"
date: 2025-12-03T14:50:06.552-05:00
draft: false
pattern_usage: ["SOA"]
language: ["PHP"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a distinct business function and exposes a well-defined interface, typically via network calls. This promotes reusability, maintainability, and scalability.

This PHP example demonstrates a simplified SOA approach using interfaces and classes to represent services.  `UserServiceInterface` defines the contract for user-related operations. `UserService` implements this interface, providing concrete functionality.  A `UserController` then *consumes* the `UserService` to handle requests. This separation of concerns is key to SOA.  The use of interfaces promotes loose coupling, allowing different implementations of the user service to be swapped in without affecting the controller. This aligns with PHP's object-oriented capabilities and encourages modular design.

```php
<?php

// Define the User Service Interface
interface UserServiceInterface {
    public function getUser(int $id): array;
    public function createUser(array $userData): int;
}

// Implement the User Service
class UserService implements UserServiceInterface {
    private $users = [];
    private $nextId = 1;

    public function getUser(int $id): array {
        if (isset($this->users[$id])) {
            return $this->users[$id];
        }
        return []; // Return empty array if user not found
    }

    public function createUser(array $userData): int {
        $id = $this->nextId++;
        $this->users[$id] = $userData;
        return $id;
    }
}

// Controller to consume the User Service
class UserController {
    private $userService;

    public function __construct(UserServiceInterface $userService) {
        $this->userService = $userService;
    }

    public function showUser(int $id): array {
        return $this->userService->getUser($id);
    }

    public function createUser(array $userData): int {
        return $this->userService->createUser($userData);
    }
}

// Example Usage
$userService = new UserService();
$userController = new UserController($userService);

$newUserId = $userController->createUser(['name' => 'John Doe', 'email' => 'john.doe@example.com']);
$user = $userController->showUser($newUserId);

print_r($user);
?>
```