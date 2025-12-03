---
title: "Onion Architecture - PHP"
date: 2025-12-03T14:15:30.332-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["PHP"]
---
The Onion Architecture aims for loose coupling by organizing code in concentric layers. The core layer contains business rules and entities, independent of any infrastructure.  Surrounding layers handle interface adapters (like controllers) and infrastructure details (databases, UI). Dependencies point *inward* – infrastructure components depend on application logic, not the other way around. This promotes testability and maintainability, as core logic doesn't need to know about external concerns. 

This PHP example demonstrates a simplified Onion Architecture with an `Entity`, `UseCases`, and `Interfaces` directory. The `UserController` (interface adapter) depends on the `UserUseCase` (application layer). `UserUseCase` depends on `UserEntity` (domain layer) and, ultimately, a database interface (`UserInterface`) which is implemented by a concrete `UserRepository` (infrastructure layer). Dependency Injection is used to manage dependencies.

```php
<?php

// --- Domain Layer ---
namespace App\Entity;

class UserEntity
{
    public function __construct(public int $id, public string $name, public string $email) {}
}

// --- Use Cases Layer ---
namespace App\UseCases;

use App\Entity\UserEntity;
use App\Interfaces\UserInterface;

class UserUseCase
{
    public function __construct(private UserInterface $userRepository) {}

    public function getUserById(int $id): ?UserEntity
    {
        return $this->userRepository->findById($id);
    }

    public function createUser(string $name, string $email): UserEntity
    {
        $user = new UserEntity(0, $name, $email);
        return $this->userRepository->create($user);
    }
}

// --- Interfaces Layer ---
namespace App\Interfaces;

use App\Entity\UserEntity;

interface UserInterface
{
    public function findById(int $id): ?UserEntity;
    public function create(UserEntity $user): UserEntity;
}

// --- Infrastructure Layer ---
namespace App\Infrastructure;

use App\Entity\UserEntity;
use App\Interfaces\UserInterface;

class UserRepository implements UserInterface
{
    // Simulate a database with an array
    private array $users = [];

    public function findById(int $id): ?UserEntity
    {
        foreach ($this->users as $user) {
            if ($user->id === $id) {
                return $user;
            }
        }
        return null;
    }

    public function create(UserEntity $user): UserEntity
    {
        $user->id = count($this->users) + 1;
        $this->users[] = $user;
        return $user;
    }
}

// --- Interface Adapter (Controller) ---
namespace App\Controllers;

use App\UseCases\UserUseCase;

class UserController
{
    public function __construct(private UserUseCase $userUseCase) {}

    public function show(int $id)
    {
        $user = $this->userUseCase->getUserById($id);
        if ($user) {
            return "User ID: " . $user->id . ", Name: " . $user->name . ", Email: " . $user->email;
        } else {
            return "User not found";
        }
    }

    public function create(string $name, string $email)
    {
        $user = $this->userUseCase->createUser($name, $email);
        return "User created with ID: " . $user->id;
    }
}

// --- Usage (Bootstrapping) ---
$userRepository = new UserRepository();
$userUseCase = new UserUseCase($userRepository);
$userController = new UserController($userUseCase);

echo $userController->show(1) . "\n"; // Output: User not found
echo $userController->create("John Doe", "john.doe@example.com") . "\n"; // Output: User created with ID: 1
echo $userController->show(1) . "\n"; // Output: User ID: 1, Name: John Doe, Email: john.doe@example.com

?>
```