---
title: "Chain of Responsibility - Python"
date: 2025-12-03T12:55:41.906-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Python"]
---
The Chain of Responsibility pattern is a behavioral design pattern that allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, allowing for flexible and extensible handling of requests.

The Python implementation uses classes to represent handlers, each with a `handle` method and a reference to the next handler. The `handle` method checks if the handler can process the request; if not, it passes it on.  The client initiates the chain by sending the request to the first handler. This approach is Pythonic due to its use of classes and method dispatch, promoting code organization and extensibility without tight coupling.

```python
from abc import ABC, abstractmethod

class Handler(ABC):
    """
    Abstract Handler class. Defines the interface for handling requests
    and passing them on to the next handler in the chain.
    """
    def __init__(self, successor=None):
        self._successor = successor

    @abstractmethod
    def handle(self, request):
        pass

class ConcreteHandlerA(Handler):
    """
    Concrete Handler A. Handles requests of type 'A'.
    """
    def handle(self, request):
        if request == 'A':
            print("ConcreteHandlerA handling request 'A'")
        elif self._successor:
            self._successor.handle(request)
        else:
            print("Request 'A' reached the end of the chain!")

class ConcreteHandlerB(Handler):
    """
    Concrete Handler B. Handles requests of type 'B'.
    """
    def handle(self, request):
        if request == 'B':
            print("ConcreteHandlerB handling request 'B'")
        elif self._successor:
            self._successor.handle(request)
        else:
            print("Request 'B' reached the end of the chain!")

class ConcreteHandlerC(Handler):
    """
    Concrete Handler C. Handles requests of type 'C'.
    """
    def handle(self, request):
        if request == 'C':
            print("ConcreteHandlerC handling request 'C'")
        elif self._successor:
            self._successor.handle(request)
        else:
            print("Request 'C' reached the end of the chain!")


def client_code(handler):
    """
    The client code. Sends different requests to the chain.
    """
    requests = ['A', 'B', 'C', 'D']
    for request in requests:
        print(f"Client sending request '{request}'\n")
        handler.handle(request)
        print("\n")

if __name__ == "__main__":
    # Build the chain: A -> B -> C
    handler_a = ConcreteHandlerA(ConcreteHandlerB(ConcreteHandlerC()))

    # Run the client code
    client_code(handler_a)
```