---
title: "Supervisor-Worker - Python"
date: 2025-12-03T15:35:04.798-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["Python"]
---
The Supervisor-Worker pattern distributes tasks to multiple worker processes, managed by a supervisor. This improves performance and responsiveness by leveraging parallelism. The supervisor handles task queuing and distribution, while workers independently process assigned tasks.

This Python implementation uses `multiprocessing.Queue` for task passing and `multiprocessing.Process` to create worker processes. The `Supervisor` class manages the queue and starts workers.  Workers continuously retrieve tasks from the queue and execute them.  The use of queues is a natural fit for Python's multiprocessing, providing thread-safe communication.  The class-based structure promotes organization and reusability, aligning with Python's OOP capabilities.  The `if __name__ == '__main__':` guard is crucial for multiprocessing to function correctly on all platforms.

```python
import multiprocessing
import time

def worker_function(task_queue, worker_id):
    """Worker function to process tasks from the queue."""
    while True:
        task = task_queue.get()
        if task is None:
            break  # Signal to terminate
        try:
            result = task(worker_id)
            print(f"Worker {worker_id}: Processed task, result: {result}")
        except Exception as e:
            print(f"Worker {worker_id}: Error processing task: {e}")
        task_queue.task_done()  # Indicate task completion

class Supervisor:
    """Manages a pool of worker processes."""
    def __init__(self, num_workers):
        self.task_queue = multiprocessing.JoinableQueue()
        self.workers = []
        self.num_workers = num_workers

    def start(self):
        """Starts the worker processes."""
        for i in range(self.num_workers):
            worker = multiprocessing.Process(target=worker_function, args=(self.task_queue, i))
            self.workers.append(worker)
            worker.start()

    def add_task(self, task):
        """Adds a task to the queue."""
        self.task_queue.put(task)

    def shutdown(self):
        """Signals workers to terminate and waits for them to finish."""
        for _ in range(self.num_workers):
            self.task_queue.put(None)  # Sentinel value to signal termination
        self.task_queue.join()  # Wait for all tasks to be processed
        for worker in self.workers:
            worker.join()


if __name__ == '__main__':
    def my_task(worker_id):
        """A sample task to be processed."""
        return worker_id * 2

    supervisor = Supervisor(num_workers=3)
    supervisor.start()

    for i in range(10):
        supervisor.add_task(my_task)

    supervisor.shutdown()
    print("All tasks completed.")
```