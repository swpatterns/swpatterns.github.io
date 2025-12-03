---
title: "Prototype - Java"
date: 2025-12-03T11:00:36.400-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Java"]
---
The Prototype pattern is a creational pattern that specifies the kinds of objects to create through a prototype instance and creates new objects by copying this prototype. It’s useful when creating objects is expensive or complex, and you need many similar objects. Instead of initializing each object from scratch, you clone a pre-configured prototype.  

This Java example implements the Prototype pattern using the `Cloneable` interface and `copy()` method.  The `Shape` class serves as the base prototype, and concrete shapes like `Circle` and `Rectangle` implement cloning. We use a `ShapeFactory` to store and retrieve prototypes, avoiding direct new instantiation for common shapes.  This approach leverages Java's object copying mechanisms and is a relatively standard way to approach prototyping, favoring interfaces over abstract classes for greater flexibility.

```java
// Shape.java
public interface Shape extends Cloneable {
    Object copy();
    String getType();
}

// Circle.java
public class Circle implements Shape {
    private int x;
    private int y;
    private int radius;

    public Circle(int x, int y, int radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    @Override
    public Object copy() {
        return new Circle(x, y, radius);
    }

    @Override
    public String getType() {
        return "Circle";
    }

    @Override
    public String toString(){
        return String.format("Circle{x=%d, y=%d, radius=%d}", x, y, radius);
    }
}

// Rectangle.java
public class Rectangle implements Shape {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public Object copy() {
        return new Rectangle(width, height);
    }

    @Override
    public String getType() {
        return "Rectangle";
    }

    @Override
    public String toString(){
        return String.format("Rectangle{width=%d, height=%d}", width, height);
    }
}

// ShapeFactory.java
import java.util.HashMap;
import java.util.Map;

public class ShapeFactory {
    private final Map<String, Shape> prototypes = new HashMap<>();

    public ShapeFactory() {
        prototypes.put("Circle", new Circle(0, 0, 1));
        prototypes.put("Rectangle", new Rectangle(10, 20));
    }

    public Shape getPrototype(String type) {
        try {
            return (Shape) prototypes.get(type).copy(); // Explicit cast after copy
        } catch (NullPointerException e) {
            return null; // Or throw an exception if the prototype isn't found
        }
    }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        ShapeFactory shapeFactory = new ShapeFactory();

        Shape circle1 = shapeFactory.getPrototype("Circle");
        Shape circle2 = shapeFactory.getPrototype("Circle");

        Shape rectangle1 = shapeFactory.getPrototype("Rectangle");

        System.out.println(circle1);
        System.out.println(circle2);
        System.out.println(rectangle1);

        System.out.println("circle1 == circle2: " + (circle1 == circle2)); // Should print false
    }
}
```