---
title: "Memento - Scala"
date: 2025-12-03T13:22:43.761-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Scala"]
---
The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later, even if the object itself is modified or destroyed. This is crucial for implementing undo/redo functionality, transaction management, or versioning. 

The Scala code implements the Memento pattern by defining a `Memento` case class to hold the object's state (a string in this case), and a `Originator` class that creates mementos and restores itself from them.  A `Caretaker` class manages the storage of mementos without exposing their internal state. Scala's immutability and case classes make this pattern concise and safe, since Mementos are naturally immutable snapshots of the Originator's state, avoiding accidental modification. This adheres to functional programming principles commonly used in Scala.

```scala
// Memento
case class Memento(state: String)

// Originator
class Originator(initialState: String) {
  private var state: String = initialState

  def setState(newState: String): Unit = {
    state = newState
  }

  def getState: String = state

  def save(): Memento = Memento(state)
  def restore(memento: Memento): Unit = {
    this.state = memento.state
  }
}

// Caretaker
class Caretaker(private var mementos: List[Memento] = Nil) {
  def addMemento(memento: Memento): Unit = {
    mementos = memento :: mementos
  }

  def getMemento(index: Int): Option[Memento] = {
    mementos.lift(index)
  }
}

// Example Usage (for completeness - not essential for pattern)
object MementoExample {
  def main(args: Array[String]): Unit = {
    val originator = new Originator("Initial State")
    val caretaker = new Caretaker()

    caretaker.addMemento(originator.save())

    originator.setState("State 1")
    caretaker.addMemento(originator.save())

    originator.setState("State 2")
    println(originator.getState) // Output: State 2

    // Restore to the first saved state
    originator.restore(caretaker.getMemento(0).get)
    println(originator.getState) // Output: Initial State
  }
}
```