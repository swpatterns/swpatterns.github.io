---
title: "Cluster-based Architecture - Java"
date: 2025-12-03T15:15:27.623-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Java"]
---
The Cluster-based Architecture pattern distributes application logic and data across multiple independent computing nodes (a "cluster") to improve availability, scalability, and performance. Tasks are divided and potentially replicated within the cluster. This example simulates a simple log processing cluster. Each `LogProcessor` represents a node processing a portion of the log data.  A `ClusterManager` distributes the work and aggregates results.  The implementation uses Java's threading capabilities to mimic distributed processing, focusing on the core concept of dividing work amongst independent workers.  This approach is idiomatic Java as it leverages classes for modularity and threading for concurrency, common practices in building scalable applications.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

class LogProcessor implements Runnable {
    private final List<String> logs;
    private final int processorId;
    private int processedCount = 0;

    public LogProcessor(List<String> logs, int processorId) {
        this.logs = logs;
        this.processorId = processorId;
    }

    @Override
    public void run() {
        for (String log : logs) {
            processLog(log);
        }
    }

    private void processLog(String log) {
        // Simulate log processing
        try {
            Thread.sleep(new Random().nextInt(50)); // Simulate processing time
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        processedCount++;
        System.out.println("Processor " + processorId + " processed log: " + log);
    }

    public int getProcessedCount() {
        return processedCount;
    }
}

class ClusterManager {
    private final List<Thread> processors = new ArrayList<>();
    private final List<LogProcessor> processorInstances = new ArrayList<>();

    public ClusterManager(List<String> logs, int numProcessors) {
        int logsPerProcessor = logs.size() / numProcessors;
        for (int i = 0; i < numProcessors; i++) {
            List<String> processorLogs = logs.subList(i * logsPerProcessor,
                    (i == numProcessors - 1) ? logs.size() : (i + 1) * logsPerProcessor);

            LogProcessor processor = new LogProcessor(processorLogs, i + 1);
            processorInstances.add(processor);
            Thread thread = new Thread(processor);
            processors.add(thread);
            thread.start();
        }
    }

    public void waitForCompletion() throws InterruptedException {
        for (Thread thread : processors) {
            thread.join();
        }
    }
    
    public int getTotalProcessedLogs(){
        int total = 0;
        for(LogProcessor processor : processorInstances){
            total += processor.getProcessedCount();
        }
        return total;
    }
}

public class ClusterExample {
    public static void main(String[] args) throws InterruptedException {
        List<String> logs = new ArrayList<>();
        for (int i = 1; i <= 100; i++) {
            logs.add("Log entry " + i);
        }

        int numProcessors = 4;
        ClusterManager clusterManager = new ClusterManager(logs, numProcessors);

        clusterManager.waitForCompletion();

        System.out.println("Total logs processed: " + clusterManager.getTotalProcessedLogs());
    }
}
```