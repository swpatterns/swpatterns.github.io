---
title: "Multiton - C#"
date: 2025-12-03T11:08:56.867-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["C#"]
---
The Multiton pattern ensures that only a fixed number of instances of a class exist. It's a variation of the Singleton pattern, but instead of one instance, it allows for a small, predefined set. This is useful for managing resources where a limited pool is appropriate — think database connections, printer spoolers, or a fixed configuration set. 

The C# implementation uses a private static readonly list to hold the instances. A static factory method creates instances only if the count is below the specified maximum, and retrieves existing instances after that. The `IsRegistered()` method confirms instance existence. This approach leverages C#’s static initialization and list capabilities to achieve the Multiton behavior. Using a list makes the code easily extensible for managing more than one instance if needed.

```csharp
using System;
using System.Collections.Generic;

public class Multiton
{
    private static readonly List<Multiton> _instances = new(3); // Maximum 3 instances
    private readonly int _id;

    private Multiton(int id)
    {
        _id = id;
        Console.WriteLine($"Multiton instance {_id} created.");
    }

    public static Multiton GetInstance()
    {
        if (_instances.Count < 3)
        {
            lock (typeof(Multiton))
            {
                if (_instances.Count < 3) //Double check locking for thread safety
                {
                    _instances.Add(new Multiton(_instances.Count + 1));
                    return _instances[^1]; // Return the last element
                }
            }
        }

        // Return an existing instance (round-robin)
        return _instances[new Random().Next(_instances.Count)];
    }

    public int GetId()
    {
        return _id;
    }

    private static bool IsRegistered(Multiton instance)
    {
        return _instances.Contains(instance);
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        Multiton instance1 = Multiton.GetInstance();
        Multiton instance2 = Multiton.GetInstance();
        Multiton instance3 = Multiton.GetInstance();
        Multiton instance4 = Multiton.GetInstance(); // Returns existing instance

        Console.WriteLine($"Instance 1 ID: {instance1.GetId()}");
        Console.WriteLine($"Instance 2 ID: {instance2.GetId()}");
        Console.WriteLine($"Instance 3 ID: {instance3.GetId()}");
        Console.WriteLine($"Instance 4 ID: {instance4.GetId()}");
    }
}
```