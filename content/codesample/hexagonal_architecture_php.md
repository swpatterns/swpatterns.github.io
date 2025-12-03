---
title: "Hexagonal Architecture - PHP"
date: 2025-12-03T14:11:11.046-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["PHP"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by decoupling the core application logic from external concerns like databases, UI, or third-party services. This is achieved by defining *ports* – interfaces that the core uses to interact with the outside world – and *adapters* that implement those ports to connect to specific technologies. The core (application and domain) is unaware of the adapters.

This PHP example demonstrates a simple use case: fetching user data. The `UserApplication` represents the core. The `UserRepository` port defines how the core interacts with user data. `MySQLUserRepository` and `InMemoryUserRepository` are adapters implementing that port, allowing the application to work with either a MySQL database or an in-memory array without modification. Dependency Injection is used to provide the desired adapter to the application. This approach is idiomatic PHP due to its flexible nature and support for interfaces and dependency injection.

```php
<?php

// Domain Model
class User {
    public function __construct(public int $id, public string $name) {}
}

// Port: UserRepository Interface
interface UserRepository {
    public function getUser(int $id): ?User;
}

// Adapter: MySQL UserRepository
class MySQLUserRepository implements UserRepository {
    private $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getUser(int $id): ?User {
        $stmt = $this->pdo->prepare("SELECT id, name FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($user) {
            return new User($user['id'], $user['name']);
        }

        return null;
    }
}

// Adapter: InMemory UserRepository
class InMemoryUserRepository implements UserRepository {
    private $users = [
        1 => new User(1, 'John Doe'),
        2 => new User(2, 'Jane Doe'),
    ];

    public function getUser(int $id): ?User {
        return $this->users[$id] ?? null;
    }
}

// Application Core
class UserApplication {
    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function getUserDetails(int $id): ?User {
        return $this->userRepository->getUser($id);
    }
}

// Example Usage (Actuator/UI - minimal for demonstration)
try {
    $pdo = new \PDO("mysql:host=localhost;dbname=testdb", 'user', 'password'); // Replace with your MySQL details
    $userRepository = new MySQLUserRepository($pdo);
} catch (\PDOException $e) {
    // Fallback to InMemory if MySQL is unavailable
    $userRepository = new InMemoryUserRepository();
}

$userApp = new UserApplication($userRepository);

$user = $userApp->getUserDetails(1);

if ($user) {
    echo "User ID: " . $user->id . "\n";
    echo "User Name: " . $user->name . "\n";
} else {
    echo "User not found.\n";
}

```