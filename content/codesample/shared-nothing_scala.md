---
title: "Shared-Nothing - Scala"
date: 2025-12-03T15:14:49.599-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Scala"]
---
The Shared-Nothing architecture is a distributed computing model where each node in the system has its own private resources – CPU, memory, and disk – and communicates with other nodes solely through message passing. This avoids contention for shared resources, enhancing scalability and fault tolerance.

This Scala example simulates a simple Shared-Nothing system with worker nodes processing tasks.  `Task` represents a unit of work, and `WorkerNode` encapsulates processing logic.  A `TaskQueue` (simplified here as a `List`) distributes tasks, with each node pulling work from the queue and processing it independently.  Concurrency is managed by creating multiple `WorkerNode` instances, each operating on its own data.  This design is idiomatic Scala due to its focus on immutability (tasks are treated as immutable data) and functional programming principles.  The use of a `List` as a queue is illustrative; a more robust implementation would utilize concurrent data structures for production systems.

```scala
case class Task(id: Int, payload: String)

class WorkerNode(id: Int) {
  def processTask(task: Task): String = {
    println(s"Worker $id processing task $task.id")
    s"Worker $id processed task $task.id: ${task.payload.toUpperCase}" // Simulate work
  }
}

object SharedNothingExample {
  def main(args: Array[String]): Unit = {
    val tasks = List(
      Task(1, "data1"),
      Task(2, "data2"),
      Task(3, "data3"),
      Task(4, "data4")
    )

    val numWorkers = 2
    val workerNodes = (1 to numWorkers).map(i => new WorkerNode(i)).toList

    tasks.foreach { task =>
      // Simplistic task assignment - round robin
      val workerIndex = task.id % numWorkers
      val worker = workerNodes(workerIndex)
      val result = worker.processTask(task)
      println(result)
    }
  }
}
```