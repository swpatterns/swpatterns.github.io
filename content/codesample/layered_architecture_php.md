---
title: "Layered Architecture - PHP"
date: 2025-12-03T14:06:40.183-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["PHP"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This separation concerns allows for easier maintenance, testing, and modification – changes in one layer ideally don’t affect others.  Common layers include Presentation (UI), Application (Business Logic), and Data (Data Access).

My PHP implementation showcases these layers. The `Presentation` layer (handled through a simple controller) receives input and displays output. The `Application` layer (`UserService`) encapsulates business rules regarding users. The `Data` layer (`UserRepository`) is responsible for database interactions. Dependency Injection is used to connect the layers, promoting loose coupling and testability – making this implementation a standard approach in many PHP frameworks.

```php
<?php

// Data Layer: UserRepository
class UserRepository {
    private $db;

    public function __construct($db) {
        $this->db = $db; // Assume $db is a PDO connection
    }

    public function getAllUsers(): array {
        $stmt = $this->db->query("SELECT * FROM users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

// Application Layer: UserService
class UserService {
    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function getAllUsers(): array {
        return $this->userRepository->getAllUsers();
    }

    public function getUserById(int $id): ?array {
        return $this->userRepository->getUserById($id);
    }
}

// Presentation Layer: UserController
class UserController {
    private $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function index(): void {
        $users = $this->userService->getAllUsers();
        // In a real application, this would render a view (e.g., using Blade)
        echo "<pre>";
        print_r($users);
        echo "</pre>";
    }

    public function show(int $id): void {
        $user = $this->userService->getUserById($id);
        // In a real application, this would render a view
        echo "<pre>";
        print_r($user);
        echo "</pre>";
    }
}

// Setup (for demonstration purposes)
try {
    $db = new PDO('sqlite::memory:');
    $db->exec("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
    $db->exec("INSERT INTO users (name) VALUES ('Alice')");
    $db->exec("INSERT INTO users (name) VALUES ('Bob')");

    $userRepository = new UserRepository($db);
    $userService = new UserService($userRepository);
    $userController = new UserController($userService);

    $userController->index(); // List all users
    $userController->show(1);  // Show user with ID 1

} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
```