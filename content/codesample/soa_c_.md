---
title: "SOA - C#"
date: 2025-12-03T14:47:30.674-05:00
draft: false
pattern_usage: ["SOA"]
language: ["C#"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a specific business function and exposes it through a well-defined interface, typically a contract. This promotes reusability, maintainability, and scalability.

The C# example demonstrates a simple SOA implementation with an `IUserService` interface defining user-related operations.  `UserService` is a concrete implementation.  A `UserController` class acts as a client, consuming the `UserService` to handle requests. Dependency Injection (DI) is used to decouple the controller from the concrete service implementation, enhancing testability and flexibility. This approach aligns with C#'s strong typing and interface-based programming, leveraging features like interfaces and DI containers for a clean and maintainable architecture.

```csharp
// IUserService.cs - Service Contract
public interface IUserService
{
    string GetUserName(int userId);
    void UpdateUserName(int userId, string newName);
}

// UserService.cs - Service Implementation
public class UserService : IUserService
{
    // In a real application, this would likely interact with a database.
    private readonly Dictionary<int, string> _users = new()
    {
        { 1, "Alice" },
        { 2, "Bob" },
        { 3, "Charlie" }
    };

    public string GetUserName(int userId)
    {
        if (_users.ContainsKey(userId))
        {
            return _users[userId];
        }
        return "User not found";
    }

    public void UpdateUserName(int userId, string newName)
    {
        if (_users.ContainsKey(userId))
        {
            _users[userId] = newName;
        }
    }
}

// UserController.cs - Service Client
public class UserController
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
    }

    public string GetUser(int userId)
    {
        return _userService.GetUserName(userId);
    }

    public void UpdateUser(int userId, string newName)
    {
        _userService.UpdateUserName(userId, newName);
    }
}

// Program.cs - Composition Root (Example Usage)
public class Program
{
    public static void Main(string[] args)
    {
        // Dependency Injection - Create and configure services
        var userService = new UserService();
        var userController = new UserController(userService);

        // Use the service through the controller
        Console.WriteLine(userController.GetUser(1)); // Output: Alice
        userController.UpdateUser(1, "Alicia");
        Console.WriteLine(userController.GetUser(1)); // Output: Alicia
    }
}
```