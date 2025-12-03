---
title: "Prototype - Kotlin"
date: 2025-12-03T11:03:21.483-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Kotlin"]
---
The Prototype pattern creates new objects from an existing object, a "prototype," rather than using a traditional constructor. This is useful when creating objects is expensive, or when the desired object configuration is complex and better determined by modifying an existing instance. The code defines an interface `Shape` with a `clone()` method. Concrete shapes like `Circle` and `Rectangle` implement this interface. A `ShapeFactory` holds references to prototypes and produces clones as needed, thus avoiding repeated object creation with the same configuration. This leverages Kotlin’s concise syntax and inherent support for interfaces and object references, making it a natural fit for the pattern.

```kotlin
// Shape Interface
interface Shape {
    fun clone(): Shape
    fun draw()
}

// Concrete Shapes
data class Circle(var x: Int, var y: Int, var radius: Int, var color: String) : Shape {
    override fun clone(): Shape {
        return Circle(x, y, radius, color)
    }

    override fun draw() {
        println("Drawing a Circle at ($x, $y) with radius $radius and color $color")
    }
}

data class Rectangle(var x: Int, var y: Int, var width: Int, var height: Int, var color: String) : Shape {
    override fun clone(): Shape {
        return Rectangle(x, y, width, height, color)
    }

    override fun draw() {
        println("Drawing a Rectangle at ($x, $y) with width $width, height $height and color $color")
    }
}

// Prototype Factory
class ShapeFactory {
    private val prototypes = mutableMapOf<String, Shape>()

    fun registerPrototype(type: String, shape: Shape) {
        prototypes[type] = shape
    }

    fun createShape(type: String): Shape? {
        return prototypes[type]?.clone()
    }
}

fun main() {
    val shapeFactory = ShapeFactory()

    // Register prototypes
    shapeFactory.registerPrototype("Circle", Circle(10, 10, 5, "Red"))
    shapeFactory.registerPrototype("Rectangle", Rectangle(0, 0, 10, 20, "Blue"))

    // Create clones
    val clonedCircle = shapeFactory.createShape("Circle")
    val clonedRectangle = shapeFactory.createShape("Rectangle")

    // Use the clones
    clonedCircle?.draw()
    clonedRectangle?.draw()

    //Modify the clone
    val anotherCircle = clonedCircle?.clone()
    anotherCircle?.x = 20
    anotherCircle?.draw()
}
```