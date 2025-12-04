---
title: "Lazy Initialization - C#"
date: 2025-12-03T11:16:42.322-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["C_sharp"]
---
The Lazy Initialization pattern delays the creation of an expensive object until its first use (when its value is actually needed). This improves performance, especially if the object is not always required. C# provides the `Lazy<T>` type to easily implement this pattern. The example below demonstrates creating a `Singleton` instance only when `Instance` is first accessed. This ensures the potentially costly `Singleton` constructor is not called unnecessarily. The `ThreadSafe` option makes the instance creation thread-safe, which is typical for singletons. The use of a property with a get accessor that uses `Lazy<T>.Value` is the standard and efficient way to expose the lazily initialized instance in C#.

```csharp
using System;

public class Singleton
{
    private Singleton() { } // Private constructor to prevent external instantiation

    public static readonly Lazy<Singleton> Instance =
        new Lazy<Singleton>(() => new Singleton(), true);

    public string Value { get; set; } = "Singleton Initial Value";
}

public class Example
{
    public static void Main(string[] args)
    {
        // Singleton is not created yet
        Console.WriteLine("Before access: Singleton not created.");

        // Accessing Instance triggers the Singleton's creation
        Singleton s = Singleton.Instance;
        Console.WriteLine("After access: Singleton created.");
        Console.WriteLine(s.Value);

        // Accessing again doesn't recreate the instance
        Console.WriteLine(Singleton.Instance.Value);
    }
}
```