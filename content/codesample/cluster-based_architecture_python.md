---
title: "Cluster-based Architecture - Python"
date: 2025-12-03T15:15:44.922-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Python"]
---
The Cluster-based Architecture pattern distributes tasks across a set of independent, yet coordinated, worker nodes (clusters). Each cluster handles a specific subset of the overall workload. This improves scalability, fault tolerance, and performance by enabling parallel processing and isolating failures. The provided Python code simulates this by defining `Worker` classes that represent individual clusters, each responsible for processing a portion of a list of items. A `Master` class distributes the work and aggregates the results.  This leverages Python’s class structure and list comprehensions for concise and readable worker operation and result collection, consistent with Python’s emphasis on clarity and simplicity.

```python
import threading

class Worker(threading.Thread):
    """
    Represents a worker cluster.
    """
    def __init__(self, worker_id, task_queue, result_queue):
        threading.Thread.__init__(self)
        self.worker_id = worker_id
        self.task_queue = task_queue
        self.result_queue = result_queue

    def run(self):
        """
        Processes tasks from the task queue and puts results into the result queue.
        """
        while True:
            task = self.task_queue.get()
            if task is None:
                break  # Signal to terminate
            result = self.process_task(task)
            self.result_queue.put(result)
            self.task_queue.task_done()

    def process_task(self, task):
        """
        Simulates task processing.  Replace with actual logic.
        """
        return f"Worker {self.worker_id} processed: {task}"


class Master:
    """
    Distributes tasks to workers and collects results.
    """
    def __init__(self, num_workers, tasks):
        self.num_workers = num_workers
        self.tasks = tasks
        self.task_queue = queue.Queue()
        self.result_queue = queue.Queue()
        self.workers = []

    def start(self):
        """
        Starts the worker threads and distributes tasks.
        """
        for i in range(self.num_workers):
            worker = Worker(i, self.task_queue, self.result_queue)
            self.workers.append(worker)
            worker.start()

        for task in self.tasks:
            self.task_queue.put(task)

        # Signal workers to terminate
        for _ in range(self.num_workers):
            self.task_queue.put(None)

        self.task_queue.join()  # Wait for all tasks to be processed

    def collect_results(self):
        """
        Collects results from the result queue.
        """
        results = []
        while not self.result_queue.empty():
            results.append(self.result_queue.get())
        return results

import queue

if __name__ == "__main__":
    tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    num_workers = 3

    master = Master(num_workers, tasks)
    master.start()
    results = master.collect_results()

    print("Results:")
    for result in results:
        print(result)
```