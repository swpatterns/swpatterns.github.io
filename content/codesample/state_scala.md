---
title: "State - Scala"
date: 2025-12-03T13:31:22.373-05:00
draft: false
pattern_usage: ["State"]
language: ["Scala"]
---
The State pattern allows an object to alter its behavior when its internal state changes. Instead of implementing state-dependent logic with conditional statements (if/else or switch/case), it encapsulates each state into a separate class. These state classes define the behavior for that specific state, and a context object holds a reference to the current state, delegating requests to it. This promotes single-responsibility principle and makes extending with new states easier without modifying existing code.

This Scala example implements a simple traffic light with three states: Red, Yellow, and Green.  The `TrafficLight` class represents the context and holds the current state.  The `State` trait defines the `nextState` method, allowing each concrete state to transition to the next.  The implementation leverages Scala's case classes for concise state definitions and pattern matching for clean state transitions, fitting the language’s functional style.

```scala
sealed trait State {
  def nextState: State
  def getColor: String
}

case object Red extends State {
  def nextState: State = Green
  def getColor: String = "Red"
}

case object Yellow extends State {
  def nextState: State = Red
  def getColor: String = "Yellow"
}

case object Green extends State {
  def nextState: State = Yellow
  def getColor: String = "Green"
}

class TrafficLight(initialState: State) {
  private var currentState: State = initialState

  def getColor: String = currentState.getColor

  def next: Unit = {
    currentState = currentState.nextState
  }
}

object TrafficLightExample {
  def main(args: Array[String]): Unit = {
    val light = new TrafficLight(Red)
    println(s"Initial color: ${light.getColor}")
    light.next()
    println(s"Next color: ${light.getColor}")
    light.next()
    println(s"Next color: ${light.getColor}")
    light.next()
    println(s"Next color: ${light.getColor}")
  }
}
```