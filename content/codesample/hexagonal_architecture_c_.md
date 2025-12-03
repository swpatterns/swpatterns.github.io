---
title: "Hexagonal Architecture - C#"
date: 2025-12-03T14:08:39.814-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["C#"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by isolating the core business logic from external concerns like UI, database, or external services. It achieves this through defining *ports* (interfaces representing interactions with the outside world) which the core application uses, and *adapters* (implementations of those ports) translating between the core and the external technologies.  This facilitates testability, maintainability, and flexibility, allowing you to swap out implementations without affecting the core logic.

Here, the core logic resides in `UseCases`.  We define ports for input (e.g., `IUserPresenter`) and output (e.g., `IUserRepository`).  Adapters like `ConsolePresenter` and `InMemoryUserRepository` bridge the gap between our application and concrete technologies.  Dependency Injection is used to provide these adapters to the core. This leverages C#'s strong typing and composition-focused design to make the architecture clear and maintainable.

```csharp
// Core Application (Use Cases)
public interface IUserRepository
{
    User GetUser(int userId);
    void SaveUser(User user);
}

public interface IUserPresenter
{
    void PresentUser(User user);
}

public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly IUserPresenter _userPresenter;

    public UserService(IUserRepository userRepository, IUserPresenter userPresenter)
    {
        _userRepository = userRepository;
        _userPresenter = userPresenter;
    }

    public void GetUserDetails(int userId)
    {
        User user = _userRepository.GetUser(userId);
        _userPresenter.PresentUser(user);
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
}

// Adapters
public class InMemoryUserRepository : IUserRepository
{
    private readonly Dictionary<int, User> _users = new Dictionary<int, User>()
    {
        { 1, new User { Id = 1, Name = "Alice" } },
        { 2, new User { Id = 2, Name = "Bob" } }
    };

    public User GetUser(int userId) => _users.TryGetValue(userId, out var user) ? user : null;

    public void SaveUser(User user)
    {
        _users[user.Id] = user;
    }
}

public class ConsolePresenter : IUserPresenter
{
    public void PresentUser(User user)
    {
        Console.WriteLine($"User ID: {user.Id}, Name: {user.Name}");
    }
}

// Entry Point (Driving Adapter)
public class Program
{
    public static void Main(string[] args)
    {
        // Composition Root - Injecting Adapters
        IUserRepository userRepository = new InMemoryUserRepository();
        IUserPresenter userPresenter = new ConsolePresenter();
        UserService userService = new UserService(userRepository, userPresenter);

        userService.GetUserDetails(1);
    }
}
```