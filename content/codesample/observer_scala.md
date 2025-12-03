---
title: "Observer - Scala"
date: 2025-12-03T13:27:15.593-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Scala"]
---
The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.  Here, we implement it using Scala's functional approach with `Observable` holding a collection of `Observer` function types. When the `Observable`'s state changes (e.g., via a `notifyObservers` method), it iterates through the observers and invokes each one with the new state. This leverages Scala’s first-class functions and immutability for a clean, concise, and type-safe implementation, avoiding mutable state where possible.

```scala
// Observable.scala
trait Observable[T] {
  private var observers: List[T => Unit] = List.empty

  def addObserver(observer: T => Unit): Unit = {
    observers = observer :: observers
  }

  def removeObserver(observer: T => Unit): Unit = {
    observers = observers.filter(_ != observer)
  }

  def notifyObservers(newState: T): Unit = {
    observers.foreach(_(newState))
  }
}

// Example Usage
case class SensorData(temperature: Double, humidity: Double)

object SensorExample {
  def main(args: Array[String]): Unit = {
    val sensor = new Observable[SensorData]
    
    val display1 = (data: SensorData) => println(s"Display 1: Temperature = ${data.temperature}, Humidity = ${data.humidity}")
    val display2 = (data: SensorData) => println(s"Display 2: Temperature = ${data.temperature}")
    
    sensor.addObserver(display1)
    sensor.addObserver(display2)

    sensor.notifyObservers(SensorData(25.0, 60.0))
    sensor.notifyObservers(SensorData(27.5, 62.5))

    sensor.removeObserver(display2)
    sensor.notifyObservers(SensorData(30.0, 70.0))
  }
}
```