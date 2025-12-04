---
title: "Clean Architecture - C#"
date: 2025-12-03T14:17:30.380-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["C_sharp"]
---
Clean Architecture aims to create systems independent of frameworks, databases, UI, and any external agency. It achieves this by structuring code into concentric layers: Entities (core business rules), Use Cases (application-specific logic), Interface Adapters (presenters, controllers, gateways), and Frameworks & Drivers (UI, databases). Dependencies point *inward*; inner layers know nothing of outer layers. This makes the system testable, maintainable, and adaptable to change.

The example demonstrates a simplified Clean Architecture with Entities, a Use Case, an Application (Interface Adapter) and a basic console framework. The `User` class represents an Entity. `CreateUser` is a Use Case. `UserApplication` is an Interface Adapter, translating Use Case results for the framework. The console app serves as the basic ‘Frameworks & Drivers’ layer, calling the application. Dependency Injection is used to decouple layers, fulfilling the inward dependency rule. This is aligned with common C# patterns like using interfaces for abstractions and separation of concerns.

```csharp
// Entities
public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// Use Cases
public interface ICreateUserUseCase
{
    User Create(string name, string email);
}

public class CreateUserUseCase : ICreateUserUseCase
{
    public User Create(string name, string email)
    {
        // In a real app, this would likely involve validation,
        // checking for existing users, etc.
        return new User { Id = Guid.NewGuid(), Name = name, Email = email };
    }
}

// Application (Interface Adapter)
public interface IUserApplication
{
    User CreateUser(string name, string email);
}

public class UserApplication : IUserApplication
{
    private readonly ICreateUserUseCase _createUserUseCase;

    public UserApplication(ICreateUserUseCase createUserUseCase)
    {
        _createUserUseCase = createUserUseCase;
    }

    public User CreateUser(string name, string email)
    {
        return _createUserUseCase.Create(name, email);
    }
}

// Frameworks & Drivers (Console App)
public class Program
{
    public static void Main(string[] args)
    {
        // Dependency Injection (Wiring up the layers)
        var createUserUseCase = new CreateUserUseCase();
        var userApplication = new UserApplication(createUserUseCase);

        // Create a new user via the application layer
        var newUser = userApplication.CreateUser("John Doe", "john.doe@example.com");

        // Output the user details
        Console.WriteLine($"User Created: Id = {newUser.Id}, Name = {newUser.Name}, Email = {newUser.Email}");
    }
}
```