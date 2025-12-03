---
title: "Supervisor-Worker - Java"
date: 2025-12-03T15:34:48.354-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["Java"]
---
The Supervisor-Worker pattern distributes tasks to multiple worker threads managed by a supervisor thread. The supervisor maintains a work queue and assigns tasks to idle workers. This promotes concurrency and responsiveness by preventing the main thread from blocking on long-running operations.

The Java implementation uses a `Supervisor` class to manage a queue of `WorkItem` tasks and a pool of `Worker` threads. Workers continuously check the queue for tasks and execute them. The `WorkItem` is a functional interface representing a unit of work.  This approach leverages Java's threading capabilities and functional interfaces for a clean and efficient solution. Using a blocking queue ensures thread safety and efficient task distribution.

```java
 import java.util.concurrent.BlockingQueue;
 import java.util.concurrent.LinkedBlockingQueue;
 import java.util.List;
 import java.util.ArrayList;

 interface WorkItem {
  void execute();
 }

 class Supervisor {
  private final BlockingQueue<WorkItem> workQueue;
  private final List<Worker> workers;

  public Supervisor(int numWorkers) {
   this.workQueue = new LinkedBlockingQueue<>();
   this.workers = new ArrayList<>();
   for (int i = 0; i < numWorkers; i++) {
    Worker worker = new Worker(workQueue);
    workers.add(worker);
    worker.start();
   }
  }

  public void submit(WorkItem workItem) {
   workQueue.add(workItem);
  }

  public void shutdown() {
   workers.forEach(Worker::interrupt);
  }
 }

 class Worker extends Thread {
  private final BlockingQueue<WorkItem> workQueue;

  public Worker(BlockingQueue<WorkItem> workQueue) {
   this.workQueue = workQueue;
  }

  @Override
  public void run() {
   while (true) {
    try {
     WorkItem workItem = workQueue.take();
     workItem.execute();
    } catch (InterruptedException e) {
     break; // Allow thread to exit
    }
   }
  }
 }

 // Example Usage
 public class Main {
  public static void main(String[] args) throws InterruptedException {
   Supervisor supervisor = new Supervisor(3);

   for (int i = 0; i < 10; i++) {
    final int taskNumber = i;
    supervisor.submit(() -> System.out.println("Executing task: " + taskNumber + " by " + Thread.currentThread().getName()));
    Thread.sleep(100); // Simulate task submission rate
   }

   Thread.sleep(1000); // Allow tasks to complete
   supervisor.shutdown();
  }
 }
```