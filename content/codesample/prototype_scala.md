---
title: "Prototype - Scala"
date: 2025-12-03T11:04:24.008-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Scala"]
---
The Prototype pattern creates new objects from an existing object (the prototype) instead of using a traditional constructor. This is useful when object creation is expensive or complex, or when you need to create variations of existing objects without specifying a precise class for each variation.  In Scala, this is efficiently implemented using the `clone` method (which requires the `Cloneable` trait) along with case classes for immutable data structures. The example showcases a `Shape` hierarchy where new shapes are created by cloning existing ones, allowing for variations without new class definitions.  Scala's immutability with case classes further leverages the pattern's benefits by ensuring cloned objects aren’t unexpectedly modified.

```scala
import scala.reflect.ClassTag

trait Shape extends Cloneable {
  def draw(): String
  def clone(): Shape = super.clone().asInstanceOf[Shape]
}

case class Circle(var x: Int, var y: Int, radius: Int) extends Shape {
  override def draw(): String = s"Drawing a circle at ($x, $y) with radius $radius"
}

case class Rectangle(var x: Int, var y: Int, width: Int, height: Int) extends Shape {
  override def draw(): String = s"Drawing a rectangle at ($x, $y) with width $width and height $height"
}

object PrototypeExample {
  def main(args: Array[String]): Unit = {
    val circlePrototype = new Circle(0, 0, 5)
    val rectanglePrototype = new Rectangle(0, 0, 10, 5)

    val circle1 = circlePrototype.clone()
    circle1.x = 10
    println(circle1.draw())

    val circle2 = circlePrototype.clone()
    circle2.y = 5
    println(circle2.draw())

    val rectangle1 = rectanglePrototype.clone()
    rectangle1.width = 20
    println(rectangle1.draw())
  }
}
```