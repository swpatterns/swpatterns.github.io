---
title: "Service Locator - C#"
date: 2025-12-03T11:23:28.365-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["C#"]
---
The Service Locator pattern manages dependencies by providing a central point of access to services. Instead of a class directly creating or finding its dependencies, it asks the locator for them. This promotes loose coupling and makes it easier to switch implementations. The C# example utilizes a static class `ServiceLocator` to hold service registrations in a `Dictionary`.  `Resolve<T>()` retrieves a service, creating a new instance if not already registered (using a default constructor).  While dependency injection is generally preferred in modern C#, Service Locator can be useful in legacy systems or scenarios where complete control over dependency resolution isn’t possible upfront.

```csharp
using System;
using System.Collections.Generic;

public interface IOperation
{
    string Execute();
}

public class OperationA : IOperation
{
    public string Execute() => "Operation A Executed";
}

public class OperationB : IOperation
{
    public string Execute() => "Operation B Executed";
}

public static class ServiceLocator
{
    private static readonly Dictionary<Type, object> services = new();

    public static void Register<T>(T service) => services[typeof(T)] = service;

    public static T Resolve<T>() => (T)(services.ContainsKey(typeof(T)) ? services[typeof(T)] : Activator.CreateInstance(typeof(T)));
}

public class Client
{
    public void RunOperation(string operationType)
    {
        IOperation operation;
        switch (operationType)
        {
            case "A":
                operation = ServiceLocator.Resolve<IOperation>();
                break;
            case "B":
                operation = ServiceLocator.Resolve<IOperation>();
                break;
            default:
                throw new ArgumentException("Invalid operation type");
        }

        Console.WriteLine(operation.Execute());
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        ServiceLocator.Register(new OperationA());
        ServiceLocator.Register<IOperation>(new OperationB()); //Register explicitly with interface

        var client = new Client();
        client.RunOperation("A");
        client.RunOperation("B");
    }
}
```