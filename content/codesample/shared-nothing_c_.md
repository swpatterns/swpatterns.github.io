---
title: "Shared-Nothing - C#"
date: 2025-12-03T15:12:06.998-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["C_sharp"]
---
The Shared-Nothing architecture is a distributed computing model where each node in the system has its own private resources – CPU, memory, and disk – and communicates with other nodes solely through explicit network messages. This avoids contention and bottlenecks associated with shared resources. This C# example simulates a simplified shared-nothing system with worker nodes processing independent tasks. Each `WorkerNode` has its own `TaskQueue` and processes tasks without directly accessing the queues of other nodes. Communication happens via a central `TaskDistributor` which assigns tasks. This approach aligns with C#’s support for concurrency and asynchronous operations, leveraging `async/await` for non-blocking task distribution and processing.

```csharp
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

// TaskDistributor: Assigns tasks to worker nodes.
public class TaskDistributor
{
    private readonly ConcurrentQueue<WorkerNode> _workers;

    public TaskDistributor(params WorkerNode[] workers)
    {
        _workers = new ConcurrentQueue<WorkerNode>(workers);
    }

    public async Task DistributeTask(int task)
    {
        if (_workers.TryDequeue(out var worker))
        {
            await worker.ProcessTaskAsync(task);
            _workers.Enqueue(worker); // Return worker to the pool
        }
        else
        {
            Console.WriteLine("No workers available.");
        }
    }
}

// WorkerNode: Represents a node in the distributed system.
public class WorkerNode
{
    private readonly ConcurrentQueue<int> _taskQueue = new ConcurrentQueue<int>();
    private bool _isProcessing = false;

    public async Task ProcessTaskAsync(int task)
    {
        _taskQueue.Enqueue(task);
        if (!_isProcessing)
        {
            _isProcessing = true;
            while (_taskQueue.Count > 0)
            {
                if (_taskQueue.TryDequeue(out int currentTask))
                {
                    Console.WriteLine($"Worker {Environment.CurrentManagedThreadId} processing task: {currentTask}");
                    await Task.Delay(100); // Simulate work
                }
            }
            _isProcessing = false;
        }
    }
}

// Example Usage:
public class Program
{
    public static async Task Main(string[] args)
    {
        var distributor = new TaskDistributor(new WorkerNode(), new WorkerNode(), new WorkerNode());

        for (int i = 1; i <= 10; i++)
        {
            await distributor.DistributeTask(i);
        }

        Console.WriteLine("All tasks distributed.");
    }
}
```