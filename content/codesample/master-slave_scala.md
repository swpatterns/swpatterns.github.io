---
title: "Master-Slave - Scala"
date: 2025-12-03T15:34:19.818-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Scala"]
---
The Master-Slave pattern distributes work to worker nodes (slaves) from a central coordinator (master). The master assigns tasks, and slaves execute them independently, returning results to the master. This example uses Scala Actors to implement the pattern. The `Master` actor receives tasks and distributes them to available `Worker` actors. Each `Worker` processes a task and sends the result back to the master.  Scala Actors provide a natural concurrency model for this, handling message passing and worker lifecycle. This implementation is idiomatic Scala due to its use of Actors for concurrent processing and immutable data for task representation.

```scala
import akka.actor._
import scala.util.Random

object MasterSlave {

  case class Task(id: Int, data: Int)
  case class Result(taskId: Int, value: Int)

  class Master extends Actor {
    var workers: Vector[ActorRef] = Vector.empty
    var results: Vector[Result] = Vector.empty

    def receive: Receive = {
      case worker: ActorRef =>
        workers = workers :+ worker
        println(s"Master: Worker joined - ${worker.path}")
      case task: Task =>
        println(s"Master: Received task ${task.id}")
        if (workers.nonEmpty) {
          val worker = workers(Random.nextInt(workers.length))
          worker ! task
        } else {
          println("Master: No workers available.")
        }
      case result: Result =>
        results = results :+ result
        println(s"Master: Received result for task ${result.taskId} - ${result.value}")
        if (results.length == 5) { // Example: Wait for 5 results
          println("Master: All tasks completed.")
          context.stop(self)
        }
    }
  }

  class Worker extends Actor {
    def receive: Receive = {
      case task: Task =>
        println(s"Worker: Processing task ${task.id}")
        val result = task.data * 2 // Simulate some work
        sender() ! Result(task.id, result)
        println(s"Worker: Finished task ${task.id}")
    }
  }

  def main(args: Array[String]): Unit = {
    implicit val system = ActorSystem("MasterSlaveSystem")
    val master = system.actorOf(Props[Master], "master")

    // Create and register workers
    for (i <- 1 to 3) {
      val worker = system.actorOf(Props[Worker], s"worker-$i")
      master ! worker
    }

    // Send tasks
    for (i <- 1 to 5) {
      master ! Task(i, i * 10)
    }
  }
}
```