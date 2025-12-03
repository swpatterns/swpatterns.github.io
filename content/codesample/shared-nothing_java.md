---
title: "Shared-Nothing - Java"
date: 2025-12-03T15:11:01.070-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Java"]
---
The Shared-Nothing architecture is a distributed computing paradigm where each node in the system has its own private, dedicated resources – CPU, memory, and storage – and communicates with other nodes solely via explicit communication protocols (like network calls). It avoids shared resources to minimize contention and improve scalability.

This Java example simulates a basic shared-nothing system with two worker nodes processing tasks. Each `WorkerNode` has its own `taskQueue` and processes tasks independently. The `Task` class represents the work units. The `TaskDispatcher` distributes tasks to nodes via simple method calls (representing network communication in a real system).  The code is object-oriented, following standard Java naming and class organization conventions, and focused on encapsulating the state and behavior of each independent node.  Concurrency within each node is not explicitly shown for brevity, but would be a natural extension.

```java
import java.util.LinkedList;
import java.util.Queue;
import java.util.List;
import java.util.ArrayList;

class Task {
    private final int id;
    private final String data;

    public Task(int id, String data) {
        this.id = id;
        this.data = data;
    }

    public int getId() {
        return id;
    }

    public String getData() {
        return data;
    }

    public void execute() {
        System.out.println("Executing task " + id + " with data: " + data);
    }
}

class WorkerNode {
    private final Queue<Task> taskQueue = new LinkedList<>();

    public void submitTask(Task task) {
        taskQueue.offer(task);
    }

    public void processTasks() {
        while (!taskQueue.isEmpty()) {
            Task task = taskQueue.poll();
            if (task != null) {
                task.execute();
            }
        }
    }
}

class TaskDispatcher {
    private final List<WorkerNode> workerNodes;

    public TaskDispatcher(List<WorkerNode> workerNodes) {
        this.workerNodes = workerNodes;
    }

    public void dispatchTask(Task task) {
        // Simple round-robin dispatch for demonstration
        WorkerNode node = workerNodes.get(task.getId() % workerNodes.size());
        node.submitTask(task);
    }

    public void startWorkers() {
        workerNodes.forEach(node -> new Thread(node::processTasks).start());
    }
}

public class SharedNothingExample {
    public static void main(String[] args) {
        List<WorkerNode> nodes = new ArrayList<>();
        nodes.add(new WorkerNode());
        nodes.add(new WorkerNode());

        TaskDispatcher dispatcher = new TaskDispatcher(nodes);
        dispatcher.startWorkers();

        for (int i = 0; i < 5; i++) {
            Task task = new Task(i, "Data for task " + i);
            dispatcher.dispatchTask(task);
        }
    }
}
```