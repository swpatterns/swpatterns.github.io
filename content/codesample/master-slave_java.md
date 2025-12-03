---
title: "Master-Slave - Java"
date: 2025-12-03T15:31:06.307-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Java"]
---
The Master-Slave pattern distributes work to multiple worker nodes (slaves) from a central coordinator (master). The master assigns tasks, and slaves execute them, reporting results back to the master. This improves performance through parallelization. This Java example uses a simple thread-based implementation. The `Master` class creates worker threads (`Slave`) and assigns them tasks (integers to square).  Slaves compute the square and return the result to the master.  Using threads is a natural fit for Java's concurrency model, and the `ExecutorService` simplifies thread management. The `Future` objects allow the master to retrieve results asynchronously.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class MasterSlave {

    private final ExecutorService executor;
    private final int numSlaves;

    public MasterSlave(int numSlaves) {
        this.numSlaves = numSlaves;
        this.executor = Executors.newFixedThreadPool(numSlaves);
    }

    public List<Integer> execute(List<Integer> tasks) {
        List<Future<Integer>> futures = new ArrayList<>();
        for (Integer task : tasks) {
            futures.add(executor.submit(new Slave(task)));
        }

        List<Integer> results = new ArrayList<>();
        for (Future<Integer> future : futures) {
            try {
                results.add(future.get()); // Wait for and retrieve the result
            } catch (InterruptedException | ExecutionException e) {
                System.err.println("Error executing task: " + e.getMessage());
            }
        }

        executor.shutdown();
        return results;
    }

    private static class Slave implements Callable<Integer> {
        private final int task;

        public Slave(int task) {
            this.task = task;
        }

        @Override
        public Integer call() {
            // Simulate some work
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return null;
            }
            return task * task;
        }
    }

    public static void main(String[] args) {
        MasterSlave master = new MasterSlave(4);
        List<Integer> tasks = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        List<Integer> results = master.execute(tasks);
        System.out.println("Results: " + results);
    }
}
```