---
title: "Singleton - C#"
date: 2025-12-03T11:05:38.402-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["C#"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. It's useful for managing resources like database connections or configuration settings where multiple instances would be detrimental. This C# implementation uses a static instance and a private constructor to enforce the single instance rule. The `Instance` property provides the global access point, and it’s lazy-initialized, meaning the instance is created only when first accessed. This approach is thread-safe in C# due to the inherent behavior of static initialization. The use of properties and a static member are standard C# conventions for achieving this.

```csharp
// Singleton.cs
public sealed class Singleton
{
    private static readonly Singleton instance = new Singleton(); // Lazy initialization

    // Private constructor to prevent external instantiation
    private Singleton()
    {
        // Initialization logic here (e.g., loading configuration)
    }

    public static Singleton Instance
    {
        get
        {
            return instance;
        }
    }

    public void DoSomething()
    {
        Console.WriteLine("Singleton is doing something!");
    }
}

// Example usage
public class Example
{
    public static void Main(string[] args)
    {
        Singleton s1 = Singleton.Instance;
        Singleton s2 = Singleton.Instance;

        Console.WriteLine(ReferenceEquals(s1, s2)); // Output: True

        s1.DoSomething();
    }
}
```