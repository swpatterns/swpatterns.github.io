---
title: "Abstract Factory - C#"
date: 2025-12-03T10:48:48.153-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["C_sharp"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It promotes loose coupling and allows for easy switching between different "themes" or configurations of objects.

This C# example defines abstract classes for `Chair`, `Table`, and `Factory` (the Abstract Factory). Concrete classes `ModernChair`, `ModernTable`, and `ModernFurnitureFactory` implement the modern furniture theme. Similarly, `VictorianChair`, `VictorianTable`, and `VictorianFurnitureFactory` implement the Victorian theme.  A client can request a furniture set (chair and table) through the factory interface without knowing the specifics of the concrete classes. This adheres to C#’s interface-based programming and promotes extensibility through new factory and product implementations.

```csharp
// Abstract Products
public abstract class Chair
{
    public abstract void SitOn();
}

public abstract class Table
{
    public abstract void PlaceOn();
}

// Abstract Factory
public abstract class FurnitureFactory
{
    public abstract Chair CreateChair();
    public abstract Table CreateTable();
}

// Concrete Products (Modern)
public class ModernChair : Chair
{
    public override void SitOn()
    {
        Console.WriteLine("Sitting on a modern chair.");
    }
}

public class ModernTable : Table
{
    public override void PlaceOn()
    {
        Console.WriteLine("Placing items on a modern table.");
    }
}

// Concrete Factory (Modern)
public class ModernFurnitureFactory : FurnitureFactory
{
    public override Chair CreateChair()
    {
        return new ModernChair();
    }

    public override Table CreateTable()
    {
        return new ModernTable();
    }
}

// Concrete Products (Victorian)
public class VictorianChair : Chair
{
    public override void SitOn()
    {
        Console.WriteLine("Sitting on a Victorian chair.");
    }
}

public class VictorianTable : Table
{
    public override void PlaceOn()
    {
        Console.WriteLine("Placing items on a Victorian table.");
    }
}

// Concrete Factory (Victorian)
public class VictorianFurnitureFactory : FurnitureFactory
{
    public override Chair CreateChair()
    {
        return new VictorianChair();
    }

    public override Table CreateTable()
    {
        return new VictorianTable();
    }
}

// Client
public class Client
{
    public static void Main(string[] args)
    {
        FurnitureFactory modernFactory = new ModernFurnitureFactory();
        Chair modernChair = modernFactory.CreateChair();
        Table modernTable = modernFactory.CreateTable();

        modernChair.SitOn();
        modernTable.PlaceOn();

        FurnitureFactory victorianFactory = new VictorianFurnitureFactory();
        Chair victorianChair = victorianFactory.CreateChair();
        Table victorianTable = victorianFactory.CreateTable();

        victorianChair.SitOn();
        victorianTable.PlaceOn();
    }
}
```
