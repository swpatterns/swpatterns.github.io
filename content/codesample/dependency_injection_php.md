---
title: "Dependency Injection - PHP"
date: 2025-12-03T11:21:49.393-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["PHP"]
---
Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. This promotes loose coupling, making the class more testable, reusable, and maintainable. Our example demonstrates Constructor Injection, a common DI technique. The `UserController` *requires* a `UserRepository` to function, but instead of instantiating `UserRepository` within `UserController`, it receives a pre-configured instance through its constructor. This allows us to easily swap out different `UserRepository` implementations (e.g., a Mock for testing) without modifying `UserController`. This approach aligns with PHP's principles of separation of concerns and is often leveraged with Dependency Injection Containers (though not explicitly used here for simplicity).

```php
<?php

interface UserRepository
{
    public function getUser(int $id): ?User;
}

class User
{
    private int $id;
    private string $name;

    public function __construct(int $id, string $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }
}

class UserController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function show(int $id): ?User
    {
        return $this->userRepository->getUser($id);
    }
}

class RealUserRepository implements UserRepository
{
    public function getUser(int $id): ?User
    {
        // Simulate fetching from a database
        if ($id == 1) {
            return new User(1, "John Doe");
        }
        return null;
    }
}

// Usage:
$userRepository = new RealUserRepository();
$userController = new UserController($userRepository);
$user = $userController->show(1);

if ($user) {
    echo "User ID: " . $user->getId() . ", Name: " . $user->getName() . "\n";
} else {
    echo "User not found.\n";
}

?>
```