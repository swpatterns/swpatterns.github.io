---
title: "Prototype - C#"
date: 2025-12-03T11:01:43.965-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["C_sharp"]
---
The Prototype pattern is a creational design pattern that specifies the kinds of objects to create through a prototypical instance, and creates new objects by copying these prototypes. This avoids the need for explicit constructors when object creation is costly or complex, offering flexibility and reducing coupling.

The following C# example demonstrates the Prototype pattern using the `ICloneable` interface and implements both "Shallow Copy" and "Deep Copy" strategies. A `Monster` class serves as the prototype. Concrete monster types (`Goblin`, `Dragon`) clone themselves, providing different implementations of cloning to handle potentially complex object graphs (demonstrated by the `Dragon`'s list of `Part`s to showcase deep copying). This leverages C#'s built-in mechanisms for object cloning and interfaces, aligning with its flexible and type-safe nature.



```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Prototype interface
public interface IPrototype<T>
{
    T Clone();
}

// Base Monster class
public class Monster : IPrototype<Monster>
{
    public string Name { get; set; }
    public int Level { get; set; }

    public Monster(string name, int level)
    {
        Name = name;
        Level = level;
    }

    public virtual Monster Clone()
    {
        // Shallow Copy (MemberwiseClone) - good for simple objects
        return (Monster)MemberwiseClone();
    }

    public override string ToString()
    {
        return $"Name: {Name}, Level: {Level}";
    }
}

// Concrete Monster - Goblin (Shallow Copy)
public class Goblin : Monster
{
    public Goblin(string name, int level) : base(name, level) { }
}

// Concrete Monster - Dragon (Deep Copy)
public class Dragon : Monster
{
    public List<Part> Parts { get; set; }

    public Dragon(string name, int level, List<Part> parts) : base(name, level)
    {
        Parts = parts;
    }

    public override Dragon Clone()
    {
        // Deep Copy - create new instances of nested objects
        List<Part> clonedParts = Parts.Select(p => p.Clone()).ToList();
        return new Dragon(Name, Level, clonedParts);
    }
}

// Part class (for Dragon's deep copy example)
public class Part : ICloneable
{
    public string Name { get; set; }

    public Part(string name)
    {
        Name = name;
    }

    public Part Clone()
    {
        return (Part)MemberwiseClone();
    }

    public override string ToString()
    {
        return Name;
    }
}

public class PrototypeExample
{
    public static void Main(string[] args)
    {
        // Create a prototype Dragon
        Dragon originalDragon = new Dragon("Smaug", 10, new List<Part> { new Part("Wing"), new Part("Scale") });

        // Clone the Dragon
        Dragon clonedDragon = originalDragon.Clone();

        // Modify the cloned Dragon's parts
        clonedDragon.Parts[0].Name = "Broken Wing";

        Console.WriteLine("Original Dragon:");
        Console.WriteLine(originalDragon);
        Console.WriteLine("Parts: " + string.Join(", ", originalDragon.Parts.Select(p => p.ToString())));

        Console.WriteLine("\nCloned Dragon:");
        Console.WriteLine(clonedDragon);
        Console.WriteLine("Parts: " + string.Join(", ", clonedDragon.Parts.Select(p => p.ToString())));

        // Demonstrate Goblin shallow copy
        Goblin goblin = new Goblin("Griz", 5);
        Goblin clonedGoblin = goblin.Clone();
        clonedGoblin.Name = "Griz Jr.";

        Console.WriteLine("\nOriginal Goblin");
        Console.WriteLine(goblin);

        Console.WriteLine("\nCloned Goblin");
        Console.WriteLine(clonedGoblin);
    }
}
```