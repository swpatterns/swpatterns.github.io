---
title: "Bridge - Scala"
date: 2025-12-03T11:33:30.731-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Scala"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that both can vary independently. It's useful when you have an abstraction with multiple possible implementations, and you want to avoid a combinatorial explosion of classes.

This Scala example demonstrates the Bridge pattern with a `Shape` abstraction and `Color` implementations. `Shape` has a `color` attribute, which is an instance of a `Color` trait. Different `Color` implementations (e.g., `RedColor`, `BlueColor`) provide specific coloring behaviors.  We can add new shapes or colors without modifying existing ones. The use of traits for `Color` and case classes for `Shape` are idiomatic Scala; traits allow for flexible interface implementation, and case classes provide concise data modeling.  The shapes delegate coloring to the specific color implementation.

```scala
trait Color {
  def applyColor(shape: String): String
}

case class RedColor() extends Color {
  override def applyColor(shape: String): String = s"Red ${shape}"
}

case class BlueColor() extends Color {
  override def applyColor(shape: String): String = s"Blue ${shape}"
}

abstract class Shape(color: Color) {
  def draw(): String
  def setColor(newColor: Color): Shape
  def getColorName(): String = color.getClass.getSimpleName
}

case class Circle(color: Color) extends Shape(color) {
  override def draw(): String = color.applyColor("Circle")
}

case class Square(color: Color) extends Shape(color) {
  override def draw(): String = color.applyColor("Square")
}

object BridgeExample {
  def main(args: Array[String]): Unit = {
    val redCircle = Circle(RedColor())
    println(redCircle.draw()) // Output: Red Circle

    val blueSquare = Square(BlueColor())
    println(blueSquare.draw()) // Output: Blue Square

    val greenColor = new Color() {
      override def applyColor(shape: String): String = s"Green ${shape}"
    }

    val circleWithGreen = redCircle.setColor(greenColor)
    println(circleWithGreen.draw()) // Output: Green Circle
  }
}
```