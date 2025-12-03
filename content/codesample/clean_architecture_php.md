---
title: "Clean Architecture - PHP"
date: 2025-12-03T14:19:38.464-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["PHP"]
---
The Clean Architecture pattern separates the application into concentric layers: Entities, Use Cases, Interface Adapters, and Frameworks & Drivers. The core business logic (Entities & Use Cases) is independent of external concerns like databases, UI, or frameworks. This promotes testability, maintainability, and adaptability. 

The PHP example below demonstrates a simplified version. Entities represent the core data; Use Cases define application operations; Interface Adapters convert data between Use Cases and the framework (a basic CLI); and the Frameworks & Drivers layer handles external interaction. Dependency Injection is crucial, ensuring higher-level layers don't depend on lower ones.  This utilizes PHP’s flexible typing and focus on composition, fitting its typical application structure.

```php
<?php

// Entities
class User
{
    public function __construct(public string $id, public string $name) {}
}

// Use Cases
interface UserRepositoryInterface
{
    public function getUser(string $id): ?User;
}

class GetUserUseCase
{
    public function __construct(private UserRepositoryInterface $userRepository) {}

    public function execute(string $id): ?User
    {
        return $this->userRepository->getUser($id);
    }
}

// Interface Adapters
class UserConsolePresenter
{
    public function presentUser(?User $user): void
    {
        if ($user) {
            echo "User ID: " . $user->id . "\n";
            echo "User Name: " . $user->name . "\n";
        } else {
            echo "User not found.\n";
        }
    }
}

// Frameworks & Drivers (CLI)
class UserConsole
{
    public function __construct(private GetUserUseCase $getUserUseCase, private UserConsolePresenter $presenter) {}

    public function handle(string $id): void
    {
        $user = $this->getUserUseCase->execute($id);
        $this->presenter->presentUser($user);
    }
}

// Concrete Implementation (for testing/dependency injection)
class InMemoryUserRepository implements UserRepositoryInterface
{
    private array $users = [
        '1' => new User('1', 'John Doe'),
        '2' => new User('2', 'Jane Smith'),
    ];

    public function getUser(string $id): ?User
    {
        return $this->users[$id] ?? null;
    }
}

// Wiring
$userRepository = new InMemoryUserRepository();
$getUserUseCase = new GetUserUseCase($userRepository);
$presenter = new UserConsolePresenter();
$console = new UserConsole($getUserUseCase, $presenter);

// Run
if (isset($argv[1])) {
    $console->handle($argv[1]);
} else {
    echo "Please provide a user ID as an argument.\n";
}
```