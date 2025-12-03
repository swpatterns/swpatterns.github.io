---
title: "Master-Slave - C#"
date: 2025-12-03T15:32:03.303-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["C#"]
---
The Master-Slave pattern distributes work to worker nodes (Slaves) from a central coordinator (Master). The Master maintains the overall task and divides it into subtasks, assigning them to available Slaves. Slaves process their assigned tasks and return results to the Master, which aggregates them. This pattern enhances parallelism and scalability.

The C# example uses `Task`s to represent the subtasks and a `BlockingCollection` to manage the queue of work for the slaves. The `Master` class distributes work, and the `Slave` class continuously pulls work from the collection and processes it.  This approach leverages C#'s asynchronous capabilities and thread-safe collections for efficient parallel processing, fitting the language's modern concurrency model.

```csharp
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

public class MasterSlave
{
    public static async Task Main(string[] args)
    {
        int dataSize = 10;
        int slaveCount = 3;

        var master = new Master(dataSize);
        var slaves = new List<Task>();

        for (int i = 0; i < slaveCount; i++)
        {
            slaves.Add(Task.Run(() => master.SlaveWorker()));
        }

        await Task.WhenAll(slaves);

        Console.WriteLine("Master: All tasks completed.");
        Console.WriteLine($"Master: Results: {string.Join(", ", master.Results)}");
    }

    public class Master
    {
        public List<int> Results { get; } = new List<int>();
        private readonly BlockingCollection<int> _workItems;
        private bool _isComplete = false;

        public Master(int dataSize)
        {
            _workItems = new BlockingCollection<int>();
            for (int i = 0; i < dataSize; i++)
            {
                _workItems.Add(i);
            }
        }

        public void SlaveWorker()
        {
            foreach (var item in _workItems.GetConsumingEnumerable())
            {
                // Simulate work
                int result = ProcessWork(item);
                lock (Results)
                {
                    Results.Add(result);
                }
            }
        }

        private int ProcessWork(int item)
        {
            // Replace with actual work
            return item * 2;
        }

        public void Complete()
        {
            _isComplete = true;
            _workItems.CompleteAdding();
        }
    }
}
```