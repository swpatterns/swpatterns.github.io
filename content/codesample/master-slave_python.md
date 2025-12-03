---
title: "Master-Slave - Python"
date: 2025-12-03T15:31:22.197-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Python"]
---
The Master-Slave pattern involves one object (the Master) controlling and delegating work to one or more other objects (the Slaves). The Master maintains the overall state and distributes tasks, while the Slaves execute those tasks and potentially return results. This pattern promotes concurrency and separation of concerns.

The Python code below demonstrates a simple Master-Slave setup using threads. The `Master` class creates and manages `Slave` threads, assigning them work (numbers to square).  Slaves perform the squaring operation and return the result to the Master.  This implementation leverages Python's threading library, a natural fit for concurrent task execution, and uses a queue to safely pass work to the slaves.  The use of classes and methods aligns with Python's object-oriented style.

```python
import threading
import queue

class Slave(threading.Thread):
    def __init__(self, task_queue, result_queue):
        threading.Thread.__init__(self)
        self.task_queue = task_queue
        self.result_queue = result_queue

    def run(self):
        while True:
            task = self.task_queue.get()
            if task is None:
                break
            result = task * task
            self.result_queue.put(result)
            self.task_queue.task_done()

class Master:
    def __init__(self, num_slaves):
        self.task_queue = queue.Queue()
        self.result_queue = queue.Queue()
        self.slaves = []
        for _ in range(num_slaves):
            slave = Slave(self.task_queue, self.result_queue)
            self.slaves.append(slave)
            slave.daemon = True  # Allow main thread to exit even if slaves are blocked
            slave.start()

    def submit_tasks(self, tasks):
        for task in tasks:
            self.task_queue.put(task)

    def get_results(self, num_tasks):
        results = []
        for _ in range(num_tasks):
            results.append(self.result_queue.get())
        return results

    def shutdown(self):
        for _ in range(len(self.slaves)):
            self.task_queue.put(None)
        self.task_queue.join() # Block until all tasks are done

if __name__ == "__main__":
    master = Master(num_slaves=4)
    tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    master.submit_tasks(tasks)
    results = master.get_results(len(tasks))
    master.shutdown()
    print(f"Results: {results}")
```