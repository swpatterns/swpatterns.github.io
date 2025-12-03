---
title: "Shared-Nothing - PHP"
date: 2025-12-03T15:14:33.806-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["PHP"]
---
The Shared-Nothing pattern is an architecture where each worker (or node) in a distributed system has its own private memory and storage, and communication happens primarily through network calls. No shared resources like databases or file systems are directly accessed by multiple workers. This enhances scalability and fault isolation.  The PHP example simulates this by creating independent worker classes, each handling its own data and communicating using message passing (here, simple function calls could be replaced by a queue system in a real implementation).  This uses simple class structures and dependency injection, following standard PHP OOP principles, to showcase the isolation and communication aspects.

```php
<?php

/**
 * Represents a worker in a shared-nothing system.
 */
class Worker
{
    private $id;
    private $data;

    public function __construct(int $id, array $data)
    {
        $this->id = $id;
        $this->data = $data;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function processData(): array
    {
        // Simulate processing the data.  In a real system this would be more intensive.
        $processedData = array_map(fn($item) => $item * 2, $this->data);
        return $processedData;
    }

    public function receiveMessage(string $message, ?array $payload = null): string
    {
        return "Worker {$this->id}: Received message '$message'";
    }
}


/**
 * A simple coordinator to manage workers.
 */
class Coordinator
{
    private $workers = [];

    public function addWorker(Worker $worker): void
    {
        $this->workers[] = $worker;
    }

    public function distributeWork(): array
    {
        $allResults = [];
        foreach ($this->workers as $worker) {
            $results = $worker->processData();
            $allResults[$worker->getId()] = $results;
        }
        return $allResults;
    }

    public function sendMessageToWorker(int $workerId, string $message, ?array $payload = null): string
    {
        foreach ($this->workers as $worker) {
            if ($worker->getId() === $workerId) {
                return $worker->receiveMessage($message, $payload);
            }
        }
        return "Worker with ID {$workerId} not found.";
    }
}

// Example Usage
$coordinator = new Coordinator();

$worker1 = new Worker(1, [1, 2, 3]);
$worker2 = new Worker(2, [4, 5, 6]);

$coordinator->addWorker($worker1);
$coordinator->addWorker($worker2);

$results = $coordinator->distributeWork();
print_r($results);

echo $coordinator->sendMessageToWorker(1, "Status update");

?>
```