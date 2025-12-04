---
title: "Flyweight - C#"
date: 2025-12-03T12:41:56.308-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["C_sharp"]
---
The Flyweight pattern aims to minimize memory usage by sharing as much data as possible between similar objects. It achieves this by separating an object's state into intrinsic (shared, immutable) and extrinsic (unique, passed as arguments) components.  The `Flyweight` interface defines the methods that accept extrinsic state. `ConcreteFlyweight` holds the intrinsic state. `FlyweightFactory` manages the creation and sharing of flyweight instances.

This C# implementation uses a dictionary within the `FlyweightFactory` to store and reuse existing flyweights based on their key.  The `IntrinsicState` is a simple string, representing shared data.  The `Client` code holds the extrinsic state (coordinates) and calls the flyweight's methods, passing in this unique context. This approach is idiomatic C# due to its use of interfaces, a factory pattern, and dictionaries for efficient object management.

```csharp
// Flyweight Interface
public interface IFlyweight
{
    void Operation(int x, int y);
}

// Concrete Flyweight
public class ConcreteFlyweight : IFlyweight
{
    private readonly string intrinsicState;

    public ConcreteFlyweight(string intrinsicState)
    {
        this.intrinsicState = intrinsicState;
    }

    public void Operation(int x, int y)
    {
        Console.WriteLine($"Flyweight with intrinsic state '{intrinsicState}' at coordinates: ({x}, {y})");
    }
}

// Flyweight Factory
public class FlyweightFactory
{
    private readonly Dictionary<string, IFlyweight> flyweights = new();

    public IFlyweight GetFlyweight(string key)
    {
        if (!flyweights.ContainsKey(key))
        {
            flyweights[key] = new ConcreteFlyweight(key);
        }
        return flyweights[key];
    }
}

// Client
public class Client
{
    public static void Main(string[] args)
    {
        FlyweightFactory factory = new();

        IFlyweight flyweight1 = factory.GetFlyweight("A");
        IFlyweight flyweight2 = factory.GetFlyweight("B");
        IFlyweight flyweight3 = factory.GetFlyweight("A"); // Reuse existing flyweight

        flyweight1.Operation(1, 2);
        flyweight2.Operation(3, 4);
        flyweight3.Operation(5, 6); // Uses the same instance as flyweight1
    }
}
```