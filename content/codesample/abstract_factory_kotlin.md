---
title: "Abstract Factory - Kotlin"
date: 2025-12-03T10:50:24.424-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Kotlin"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a "factory of factories," allowing you to switch between different "look and feels" or configurations easily.

This Kotlin example defines an `AbstractFactory` interface with a method to create a `Button` and a `TextField`. Concrete factories, `WindowsFactory` and `MacOSFactory`, implement this interface, returning Windows-specific or macOS-specific UI elements respectively. A `Client` class uses the factory to create UI components without knowing their concrete types. This implementation leverages Kotlin's interfaces and classes for a clean, type-safe approach, fitting its object-oriented nature.  The use of `object` for the concrete factories demonstrates Kotlin's preference for singletons when appropriate.

```kotlin
// Abstract Factory Interface
interface AbstractFactory {
    fun createButton(): Button
    fun createTextField(): TextField
}

// Abstract Product Interfaces
interface Button {
    fun paint()
}

interface TextField {
    fun display()
}

// Concrete Products - Windows
class WindowsButton : Button {
    override fun paint() {
        println("Painting a Windows button")
    }
}

class WindowsTextField : TextField {
    override fun display() {
        println("Displaying a Windows text field")
    }
}

// Concrete Products - macOS
class MacOSButton : Button {
    override fun paint() {
        println("Painting a macOS button")
    }
}

class MacOSTextField : TextField {
    override fun display() {
        println("Displaying a macOS text field")
    }
}

// Concrete Factories
object WindowsFactory : AbstractFactory {
    override fun createButton(): Button = WindowsButton()
    override fun createTextField(): TextField = WindowsTextField()
}

object MacOSFactory : AbstractFactory {
    override fun createButton(): Button = MacOSButton()
    override fun createTextField(): TextField = MacOSTextField()
}

// Client
class Client(factory: AbstractFactory) {
    private val button: Button = factory.createButton()
    private val textField: TextField = factory.createTextField()

    fun render() {
        button.paint()
        textField.display()
    }
}

// Usage
fun main() {
    println("Using Windows Factory:")
    Client(WindowsFactory).render()

    println("\nUsing macOS Factory:")
    Client(MacOSFactory).render()
}
```