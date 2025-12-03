---
title: "Cluster-based Architecture - Scala"
date: 2025-12-03T15:18:53.057-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Scala"]
---
The Cluster-based Architecture pattern involves distributing application components across multiple machines (a cluster) to achieve scalability, fault tolerance, and high availability. In this Scala example, we simulate a simple cluster with worker nodes performing tasks and a master node distributing them.  We use Actors (from Akka) to represent these nodes and communicate asynchronously. Each Worker actor registers with the Master upon startup. The Master receives tasks and forwards them to available workers.  This implementation is idiomatic Scala due to its emphasis on immutability, message passing concurrency via Actors, and concise functional style when defining worker behavior.  Akka’s actor system handles the complexities of distribution, serialization, and error recovery, making it well-suited for building distributed systems in Scala.

```scala
import akka.actor.{Actor, ActorSystem, Props}
import scala.collection.mutable
import scala.util.Random

// Messages
case class Task(id: Int, payload: String)
case class Result(taskId: Int, outcome: String)
case class RegisterWorker
case class Work(task: Task)

// Worker Actor
class Worker extends Actor {
  override def receive: Receive = {
    case Work(task) =>
      println(s"Worker received task ${task.id}: ${task.payload}")
      val result = s"Processed: ${task.payload}"
      sender() ! Result(task.id, result) // Send result back to the master
    case _ => println("Worker received unknown message")
  }
}

// Master Actor
class Master extends Actor {
  val workers = new mutable.ListBuffer[Actor.Receive]()
  var nextTaskId = 1

  override def receive: Receive = {
    case RegisterWorker =>
      val worker = sender()
      workers += worker
      println(s"Worker registered: ${worker}")
    case task: Task =>
      println(s"Master received task ${task.id}")
      if (workers.isEmpty) {
        println("No workers available")
      } else {
        val worker = workers(Random.nextInt(workers.length))
        worker ! Work(task)
      }
    case result: Result =>
      println(s"Master received result for task ${result.taskId}: ${result.outcome}")
  }
}

// Main Application
object ClusterExample {
  def main(args: Array[String]): Unit = {
    val system = ActorSystem("ClusterSystem")

    val master = system.actorOf(Props[Master], "master")

    val worker1 = system.actorOf(Props[Worker], "worker1")
    val worker2 = system.actorOf(Props[Worker], "worker2")
    val worker3 = system.actorOf(Props[Worker], "worker3")

    worker1 ! RegisterWorker
    worker2 ! RegisterWorker
    worker3 ! RegisterWorker

    master ! Task(1, "Data to process 1")
    master ! Task(2, "Data to process 2")
    master ! Task(3, "Data to process 3")

    Thread.sleep(2000)
    system.terminate()
  }
}
```