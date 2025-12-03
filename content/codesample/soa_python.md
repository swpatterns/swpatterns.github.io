---
title: "SOA - Python"
date: 2025-12-03T14:46:34.071-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Python"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a specific business function and communicates with others through well-defined interfaces, typically using messages. This promotes modularity, reusability, and independent deployment.

The Python example demonstrates a simplified SOA with two services: `Greeter` and `Logger`. `Greeter` provides a greeting message, and `Logger` records events. They communicate via a simple message passing system (function calls in this case, but could be queues or APIs).  The use of classes for services aligns with Python's OOP capabilities, encapsulating data and behavior.  The clear separation of concerns and minimal dependencies between services exemplify SOA principles. This approach is Pythonic due to its emphasis on readability and modular design.

```python
# greeter_service.py
class Greeter:
    def __init__(self, name):
        self.name = name

    def get_greeting(self):
        return f"Hello, {self.name}!"

# logger_service.py
class Logger:
    def log_event(self, message):
        print(f"LOG: {message}")

# main.py
from greeter_service import Greeter
from logger_service import Logger

def main():
    greeter = Greeter("World")
    logger = Logger()

    greeting = greeter.get_greeting()
    logger.log_event(f"Greeting generated: {greeting}")
    print(greeting)

if __name__ == "__main__":
    main()
```