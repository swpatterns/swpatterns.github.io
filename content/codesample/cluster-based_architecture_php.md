---
title: "Cluster-based Architecture - PHP"
date: 2025-12-03T15:18:37.079-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["PHP"]
---
The Cluster-based Architecture pattern distributes application components across multiple servers (a "cluster") to improve performance, reliability, and scalability. Each server within the cluster typically runs the same code and shares the workload. Requests are routed to available servers using a load balancer. This example simulates a simple cluster of worker servers processing tasks. It focuses on the core idea of distributing tasks and doesn't include a true load balancer for brevity, instead using a round-robin approach.  The use of classes and interfaces mirrors PHP's OOP capabilities, promoting modularity and maintainability.

```php
<?php

/**
 * Interface for a worker task.
 */
interface Task
{
    public function execute(): string;
}

/**
 * A concrete task example.
 */
class ExampleTask implements Task
{
    private string $data;

    public function __construct(string $data)
    {
        $this->data = $data;
    }

    public function execute(): string
    {
        return "Processed: " . $this->data . " on server " . uniqid();
    }
}

/**
 *  Worker Server - processes tasks.
 */
class WorkerServer
{
    public function processTask(Task $task): string
    {
        return $task->execute();
    }
}

// Simulate a cluster
$workers = [new WorkerServer(), new WorkerServer(), new WorkerServer()];
$tasks = [new ExampleTask("Task 1"), new ExampleTask("Task 2"), new ExampleTask("Task 3")];

// Distribute tasks round-robin
$workerIndex = 0;
foreach ($tasks as $task) {
    $result = $workers[$workerIndex]->processTask($task);
    echo $result . PHP_EOL;
    $workerIndex = ($workerIndex + 1) % count($workers);
}

?>
```