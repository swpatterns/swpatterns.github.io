---
title: "Adapter - C#"
date: 2025-12-03T11:27:22.829-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["C#"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. This enables classes with incompatible interfaces to work together. Here, we adapt a `LegacyRectangle` class (with a different way of calculating area) to the `IShape` interface, allowing it to be used interchangeably with other shapes that implement this interface. This implementation utilizes C#'s interface-based approach for loose coupling and is a common approach for integrating older systems with modern ones.  The adapter class `RectangleAdapter` holds an instance of `LegacyRectangle` and exposes the desired `IShape` interface.

```csharp
// IShape interface - the expected interface
public interface IShape
{
    double Area();
}

// Concrete Shape class
public class Circle : IShape
{
    private double radius;

    public Circle(double radius)
    {
        this.radius = radius;
    }

    public double Area()
    {
        return Math.PI * radius * radius;
    }
}

// Legacy class with incompatible interface
public class LegacyRectangle
{
    private double width;
    private double height;

    public LegacyRectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public double GetWidth() { return width; }
    public double GetHeight() { return height; }
}

// Adapter class
public class RectangleAdapter : IShape
{
    private LegacyRectangle legacyRectangle;

    public RectangleAdapter(LegacyRectangle legacyRectangle)
    {
        this.legacyRectangle = legacyRectangle;
    }

    public double Area()
    {
        return legacyRectangle.GetWidth() * legacyRectangle.GetHeight();
    }
}

// Example Usage
public class Program
{
    public static void Main(string[] args)
    {
        IShape[] shapes = { new Circle(5), new RectangleAdapter(new LegacyRectangle(4, 6)) };

        foreach (var shape in shapes)
        {
            Console.WriteLine($"Area: {shape.Area()}");
        }
    }
}
```
