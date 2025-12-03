---
title: "Hexagonal Architecture - Python"
date: 2025-12-03T14:07:46.491-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Python"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by separating core business logic from external concerns like UI, databases, and external services. This is achieved by defining "ports" (interfaces) that the core logic uses to interact with the outside world, and then providing "adapters" that implement these ports for specific technologies. Our example focuses on a simple task list. The core logic (use cases) doesn't know *how* tasks are stored; it only knows it can ask a port to `add_task` or `get_tasks`.  The adapters provide the concrete implementations using, for instance, a memory list or a database. Python's duck typing and use of interfaces (implicitly defined by abstract methods in `abc`) make it a natural fit.

```python
from abc import ABC, abstractmethod

# Core Business Logic (Use Cases)
class TaskListService:
    def __init__(self, task_port):
        self.task_port = task_port

    def add_task(self, title):
        self.task_port.add_task(title)

    def get_tasks(self):
        return self.task_port.get_tasks()


# Port (Interface)
class TaskPort(ABC):
    @abstractmethod
    def add_task(self, title):
        pass

    @abstractmethod
    def get_tasks(self):
        pass


# Adapters (Implementations)

# In-Memory Adapter (for testing or simple scenarios)
class InMemoryTaskAdapter(TaskPort):
    def __init__(self):
        self.tasks = []

    def add_task(self, title):
        self.tasks.append({"title": title, "done": False})

    def get_tasks(self):
        return self.tasks

# Example Usage (could be in a CLI, web app, etc.)
if __name__ == "__main__":
    task_adapter = InMemoryTaskAdapter()
    task_service = TaskListService(task_adapter)

    task_service.add_task("Buy groceries")
    task_service.add_task("Walk the dog")

    tasks = task_service.get_tasks()
    print(tasks)
```