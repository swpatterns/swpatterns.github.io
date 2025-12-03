---
title: "Microkernel - Scala"
date: 2025-12-03T14:23:44.517-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Scala"]
---
The Microkernel pattern aims for a minimal core (the microkernel) with functionality extended through plugins. This promotes flexibility, maintainability, and loose coupling. The core provides just enough to load, manage, and communicate with plugins.

This Scala implementation defines a `Microkernel` that manages a collection of `Plugin`s via a `PluginRegistry`. Plugins are simple case classes with a `run` method to execute their logic.  The kernel offers a `process` method to dispatch work to registered plugins. Scala’s case classes and traits align well with the pattern’s dependency injection needs and provide a concise way to define plugin interfaces. The use of collections and functional style enhances the adaptability and composition desired in a microkernel architecture.

```scala
trait Plugin {
  def run(command: String): String
}

object PluginRegistry {
  private var plugins: List[Plugin] = List.empty

  def register(plugin: Plugin): Unit = {
    plugins = plugin :: plugins
  }

  def unregister(plugin: Plugin): Unit = {
    plugins = plugins.filter(_ != plugin)
  }

  def getPlugins: List[Plugin] = plugins
}

class Microkernel extends PluginRegistry {
  def process(command: String): String = {
    getPlugins.find(_.getClass.getSimpleName.toLowerCase.contains(command.toLowerCase)) match {
      case Some(plugin) => plugin.run(command)
      case None => "No plugin found to handle command: " + command
    }
  }
}

// Example Plugins
case class GreetingPlugin() extends Plugin {
  override def run(command: String): String = {
    s"Hello from the Greeting Plugin! You said: $command"
  }
}

case class EchoPlugin() extends Plugin {
  override def run(command: String): String = {
    command
  }
}

// Usage
object Main extends App {
  val kernel = new Microkernel()
  kernel.register(GreetingPlugin())
  kernel.register(EchoPlugin())

  println(kernel.process("greet"))
  println(kernel.process("echo hello"))
  println(kernel.process("unknown"))
}
```