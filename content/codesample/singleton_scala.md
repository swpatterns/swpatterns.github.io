---
title: "Singleton - Scala"
date: 2025-12-03T11:07:32.853-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Scala"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it.  In Scala, this is most easily achieved using the `object` keyword. An `object` automatically creates a single instance of a class and makes it accessible without needing to explicitly instantiate it.  This implementation is highly idiomatic as Scala favors immutability and objects are a first-class citizen, often used for utility functions, constants, and globally accessible resources.  We define our singleton as an object, allowing access to its methods and properties directly through the object's name.

```scala
// Singleton Pattern in Scala

object Logger {
  private var logEntries: List[String] = List.empty

  def log(message: String): Unit = {
    val entry = s"[${java.time.LocalDateTime.now()}] $message"
    logEntries = entry :: logEntries
    println(entry)
  }

  def getLogEntries(): List[String] = logEntries
}

// Usage
object Main {
  def main(args: Array[String]): Unit = {
    Logger.log("Application started")
    Logger.log("Processing data...")
    val logs = Logger.getLogEntries()
    logs.foreach(println)
  }
}
```