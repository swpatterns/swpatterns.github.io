---
title: "Abstract Factory - Scala"
date: 2025-12-03T10:51:33.277-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Scala"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a "factory of factories," allowing you to switch between different "looks and feels" or object sets easily.

This Scala implementation defines traits `Button` and `Checkbox` representing product types, and concrete classes for different themes (e.g., `WindowsButton`, `MacOSCheckbox`).  The `GUIFactory` trait is the abstract factory, defining methods to create buttons and checkboxes. Concrete factories like `WindowsFactory` and `MacOSFactory` implement these methods to return objects specific to their theme.  A `Client` class uses the factory to create a GUI without knowing the concrete classes involved, promoting loose coupling and flexibility. Scala's traits and case classes make this pattern concise and type-safe.

```scala
trait Button {
  def paint(): String
}

trait Checkbox {
  def paint(): String
}

trait GUIFactory {
  def createButton(): Button
  def createCheckbox(): Checkbox
}

case class WindowsButton() extends Button {
  override def paint(): String = "Windows Button"
}

case class MacOSButton() extends Button {
  override def paint(): String = "MacOS Button"
}

case class WindowsCheckbox() extends Checkbox {
  override def paint(): String = "Windows Checkbox"
}

case class MacOSCheckbox() extends Checkbox {
  override def paint(): String = "MacOS Checkbox"
}

case class WindowsFactory() extends GUIFactory {
  override def createButton(): Button = WindowsButton()
  override def createCheckbox(): Checkbox = WindowsCheckbox()
}

case class MacOSFactory() extends GUIFactory {
  override def createButton(): Button = MacOSButton()
  override def createCheckbox(): Checkbox = MacOSCheckbox()
}

object Client {
  def createGUI(factory: GUIFactory): String = {
    val button = factory.createButton()
    val checkbox = factory.createCheckbox()
    s"${button.paint()}, ${checkbox.paint()}"
  }
}

object Main extends App {
  val windowsGUI = Client.createGUI(WindowsFactory())
  println(windowsGUI)

  val macosGUI = Client.createGUI(MacOSFactory())
  println(macosGUI)
}
```