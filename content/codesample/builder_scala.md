---
title: "Builder - Scala"
date: 2025-12-03T10:56:11.005-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Scala"]
---
The Builder pattern separates the construction of a complex object from its representation. It allows creating different variations of an object through a fluent interface, step-by-step, without exposing the complex internal construction logic to the client.

This Scala implementation uses case classes for immutability and a companion object to define the Builder. The `Computer` class represents the complex object, and the `ComputerBuilder` provides a fluent API to set its attributes.  The `build()` method constructs the final `Computer` instance. This approach leverages Scala's conciseness and immutability features, making the code readable and thread-safe. The use of a companion object is a common Scala practice for creating factory methods and builders.

```scala
case class Computer(cpu: String, ram: Int, storage: String, os: String)

object Computer {
  class Builder {
    private var cpu: String = ""
    private var ram: Int = 0
    private var storage: String = ""
    private var os: String = ""

    def withCpu(cpu: String): Builder = {
      this.cpu = cpu
      this
    }

    def withRam(ram: Int): Builder = {
      this.ram = ram
      this
    }

    def withStorage(storage: String): Builder = {
      this.storage = storage
      this
    }

    def withOs(os: String): Builder = {
      this.os = os
      this
    }

    def build(): Computer = {
      Computer(cpu, ram, storage, os)
    }
  }

  def newBuilder(): Builder = new Builder()
}

object BuilderExample {
  def main(args: Array[String]): Unit = {
    val gamingComputer = Computer.newBuilder()
      .withCpu("Intel i9")
      .withRam(32)
      .withStorage("1TB SSD")
      .withOs("Windows 11")
      .build()

    val officeComputer = Computer.newBuilder()
      .withCpu("Intel i5")
      .withRam(16)
      .withStorage("512GB SSD")
      .withOs("MacOS")
      .build()

    println(gamingComputer)
    println(officeComputer)
  }
}
```