---
title: "Shared-Nothing - Python"
date: 2025-12-03T15:11:19.287-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Python"]
---
The Shared-Nothing architecture is a distributed computing model where each node has its own independent resources – CPU, memory, and disk – and communicates with other nodes solely through network connections. There's no shared storage or shared memory. This promotes scalability and fault tolerance. My Python example simulates this using multiple processes, each with its own data and processing logic. A `Worker` class represents each node, receiving tasks via a queue and processing them independently. The `main` function spawns multiple worker processes, distributes tasks, and collects results. This aligns with Python's multiprocessing capabilities and emphasizes isolating process state to mimic the "nothing shared" concept.

```python
import multiprocessing
import random

class Worker:
    def __init__(self, worker_id, task_queue, result_queue):
        self.worker_id = worker_id
        self.task_queue = task_queue
        self.result_queue = result_queue

    def run(self):
        while True:
            task = self.task_queue.get()
            if task is None:
                break  # Signal to terminate worker
            
            # Simulate some processing
            result = self.process_task(task)
            self.result_queue.put(result)
            print(f"Worker {self.worker_id}: Processed task {task} and got result {result}")

    def process_task(self, task):
        # Replace with your actual task processing logic
        return task * 2


def main():
    num_workers = 3
    tasks = [random.randint(1, 10) for _ in range(5)]

    task_queue = multiprocessing.Queue()
    result_queue = multiprocessing.Queue()

    workers = []
    for i in range(num_workers):
        worker = Worker(i, task_queue, result_queue)
        process = multiprocessing.Process(target=worker.run)
        workers.append(process)
        process.start()

    # Feed tasks to the queue
    for task in tasks:
        task_queue.put(task)

    # Signal workers to terminate
    for _ in range(num_workers):
        task_queue.put(None)

    # Collect results
    results = []
    for _ in range(len(tasks)):
        results.append(result_queue.get())

    # Wait for workers to finish
    for process in workers:
        process.join()
        
    print("\nAll results:", results)

if __name__ == "__main__":
    main()
```