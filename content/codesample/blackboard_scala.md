---
title: "Blackboard - Scala"
date: 2025-12-03T15:26:34.576-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Scala"]
---
The Blackboard pattern is a computational architecture for solving problems with no pre-defined flow of control. Multiple independent knowledge sources (in this case, functions) observe a shared data structure (the "blackboard") and contribute to solving a problem based on the data's current state. This avoids tight coupling and allows for flexible, reactive problem-solving.

The Scala code defines a `Blackboard` class managing the shared data and triggering updates. `KnowledgeSource` traits declare functions that react to blackboard changes.  `ProblemSolver` orchestrates the process. The implementation uses Scala's functional programming strengths (traits, immutable data) and leverages type safety for data manipulation on the blackboard. The use of `Observable` simplifies the event-driven nature of the pattern, making it easily scalable and maintainable.

```scala
import scala.collection.mutable
import rx.lang.scala.Observable

trait BlackboardData {
  def currentStatus: String
}

trait KnowledgeSource {
  def react(data: BlackboardData): Unit
}

class Blackboard(initialData: BlackboardData) {
  private val observers = mutable.List[KnowledgeSource]()
  private var data: BlackboardData = initialData

  def register(ks: KnowledgeSource): Unit = observers += ks
  def unregister(ks: KnowledgeSource): Unit = observers -= ks

  def updateData(newData: BlackboardData): Unit = {
    data = newData
    observers.foreach(_.react(data))
  }

  def getData: BlackboardData = data
}

class ProblemSolver(blackboard: Blackboard, knowledgeSources: KnowledgeSource*) {
  knowledgeSources.foreach(blackboard.register)

  def solve(): Unit = {
    // Initial state triggers reactions
    blackboard.updateData(blackboard.getData)
  }

  def shutdown(): Unit = {
    knowledgeSources.foreach(blackboard.unregister)
  }
}

case class MyData(currentStatus: String) extends BlackboardData

object Example extends App {
  val initialData = MyData("Initial State")
  val blackboard = new Blackboard(initialData)

  val source1 = new KnowledgeSource {
    override def react(data: BlackboardData): Unit = {
      if (data.currentStatus == "Initial State") {
        println("Source 1: Reacting to initial state...")
        blackboard.updateData(MyData("State A"))
      }
    }
  }

  val source2 = new KnowledgeSource {
    override def react(data: BlackboardData): Unit = {
      if (data.currentStatus == "State A") {
        println("Source 2: Reacting to State A...")
        blackboard.updateData(MyData("Final State"))
      }
    }
  }
  
  val solver = new ProblemSolver(blackboard, source1, source2)
  solver.solve()
  solver.shutdown()
}
```