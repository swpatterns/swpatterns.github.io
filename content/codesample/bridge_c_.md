---
title: "Bridge - C#"
date: 2025-12-03T11:31:02.897-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["C#"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different abstractions and implementations and can change them independently. This is useful when there’s a possibility of needing to change an abstraction or an implementation without affecting the other.

The example demonstrates a `Shape` abstraction with `Circle` and `Rectangle` concrete abstractions. These abstractions operate on a `Renderer` interface, implemented concretely by `VectorRenderer` and `RasterRenderer`.  Each shape can use either renderer without modification, and you can introduce new shapes or renderers without altering existing classes. This C# implementation utilizes interfaces for both the abstraction and implementation to promote loose coupling, a key aspect of good C# design. Specifically, it showcases the principle of "favor composition over inheritance."

```csharp
// Abstraction
public interface IShape
{
    void Draw(IRenderer renderer);
}

// Concrete Abstractions
public class Circle : IShape
{
    public int Radius { get; }

    public Circle(int radius)
    {
        Radius = radius;
    }

    public void Draw(IRenderer renderer)
    {
        renderer.RenderCircle(Radius);
    }
}

public class Rectangle : IShape
{
    public int Width { get; }
    public int Height { get; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public void Draw(IRenderer renderer)
    {
        renderer.RenderRectangle(Width, Height);
    }
}

// Implementation
public interface IRenderer
{
    void RenderCircle(int radius);
    void RenderRectangle(int width, int height);
}

// Concrete Implementations
public class VectorRenderer : IRenderer
{
    public void RenderCircle(int radius)
    {
        Console.WriteLine($"Drawing a circle with radius {radius} using vector graphics.");
    }

    public void RenderRectangle(int width, int height)
    {
        Console.WriteLine($"Drawing a rectangle with width {width} and height {height} using vector graphics.");
    }
}

public class RasterRenderer : IRenderer
{
    public void RenderCircle(int radius)
    {
        Console.WriteLine($"Drawing a circle with radius {radius} using raster graphics.");
    }

    public void RenderRectangle(int width, int height)
    {
        Console.WriteLine($"Drawing a rectangle with width {width} and height {height} using raster graphics.");
    }
}

// Client
public class Client
{
    public static void Main(string[] args)
    {
        Circle circle = new Circle(5);
        Rectangle rectangle = new Rectangle(4, 6);

        IRenderer vectorRenderer = new VectorRenderer();
        IRenderer rasterRenderer = new RasterRenderer();

        circle.Draw(vectorRenderer);
        rectangle.Draw(rasterRenderer);
    }
}
```
