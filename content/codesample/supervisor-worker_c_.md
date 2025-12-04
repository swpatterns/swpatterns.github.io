---
title: "Supervisor-Worker - C#"
date: 2025-12-03T15:35:51.507-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["C_sharp"]
---
The Supervisor-Worker pattern delegates complex tasks to multiple worker threads managed by a supervisor thread. The supervisor distributes work, monitors worker status, and handles results or failures. This improves responsiveness and utilizes multi-core processors.

This C# implementation uses a `Supervisor` class to manage a pool of `Worker` threads.  The `Supervisor` accepts tasks via a queue and assigns them to available workers. Workers process tasks and return results to the supervisor.  The use of `Task` and `async/await` is idiomatic C# for asynchronous operations and thread management, avoiding explicit thread handling where possible.  A `BlockingCollection` provides a thread-safe queue for task distribution.

```csharp
using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

public class Supervisor
{
    private readonly int _workerCount;
    private readonly BlockingCollection<Func<Task<string>>> _taskQueue;
    private readonly Task[] _workers;

    public Supervisor(int workerCount)
    {
        _workerCount = workerCount;
        _taskQueue = new BlockingCollection<Func<Task<string>>>();
        _workers = new Task[_workerCount];

        for (int i = 0; i < _workerCount; i++)
        {
            _workers[i] = Task.Run(async () => await WorkerTask());
        }
    }

    public void SubmitTask(Func<Task<string>> task)
    {
        _taskQueue.Add(task);
    }

    private async Task WorkerTask()
    {
        while (true)
        {
            Func<Task<string>> task = _taskQueue.Take();
            try
            {
                string result = await task();
                Console.WriteLine($"Worker {Thread.CurrentThread.ManagedThreadId} completed task with result: {result}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Worker {Thread.CurrentThread.ManagedThreadId} failed with: {ex.Message}");
            }
        }
    }

    public void Stop()
    {
        _taskQueue.CompleteAdding();
        Task.WaitAll(_workers);
    }
}

public class Example
{
    public static async Task Main(string[] args)
    {
        var supervisor = new Supervisor(3);

        for (int i = 0; i < 10; i++)
        {
            int taskNumber = i;
            supervisor.SubmitTask(async () =>
            {
                await Task.Delay(100); // Simulate some work
                return $"Task {taskNumber} completed";
            });
        }

        await Task.Delay(500); // Allow tasks to complete
        supervisor.Stop();
    }
}
```