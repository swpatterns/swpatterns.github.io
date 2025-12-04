---
title: "Dependency Injection - C#"
date: 2025-12-03T11:19:54.283-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["C_sharp"]
---
Dependency Injection (DI) is a design pattern that promotes loose coupling by providing dependencies to a class instead of the class creating them itself. This improves testability, maintainability, and reusability.  Our C# example uses a simple interface `ILogger` and a concrete implementation `ConsoleLogger`.  A `Service` class depends on `ILogger`, but instead of instantiating `ConsoleLogger` directly, it receives an instance through its constructor.  This is *constructor injection*, a common DI technique.  The `Program` class demonstrates how to configure and provide the dependency. This approach aligns with C#'s strong typing and object-oriented principles, and is easily extended with more complex dependency graphs using a DI container (though one isn't strictly necessary for this basic example).

```csharp
// Define the dependency interface
public interface ILogger
{
    void Log(string message);
}

// Concrete implementation of the dependency
public class ConsoleLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine($"LOG: {message}");
    }
}

// Class that depends on the interface
public class Service
{
    private readonly ILogger _logger;

    public Service(ILogger logger)
    {
        _logger = logger;
    }

    public void DoSomething()
    {
        _logger.Log("Service is doing something...");
        // ... Service logic ...
    }
}

// Program to configure and use the dependencies
public class Program
{
    public static void Main(string[] args)
    {
        // Create the dependency
        ILogger logger = new ConsoleLogger();

        // Inject the dependency into the Service
        Service service = new Service(logger);

        // Use the service
        service.DoSomething();
    }
}
```