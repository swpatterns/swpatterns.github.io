---
title: "Service Locator - Python"
date: 2025-12-03T11:22:43.862-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Python"]
---
The Service Locator pattern provides a centralized way to access objects (services) without tightly coupling the client code to their concrete implementations. Instead of directly constructing dependencies, a client requests them from a central "locator". This promotes loose coupling and makes it easier to swap implementations or configure the application.  The Python implementation uses a dictionary to store services, keyed by their interface (typically a class or abstract base class) and returning the configured instance when requested. This is a practical approach for Python, relying on dynamic typing and the flexibility of dictionaries for dependency management, avoiding complex abstract factory setups when not strictly necessary.

```python
class DatabaseConnection:
    def __init__(self, connection_string):
        self.connection_string = connection_string

    def connect(self):
        print(f"Connecting to database: {self.connection_string}")

class Logger:
    def __init__(self, log_file):
        self.log_file = log_file

    def log(self, message):
        print(f"Logging to {self.log_file}: {message}")

class ServiceLocator:
    def __init__(self):
        self._services = {}

    def register(self, interface, implementation):
        self._services[interface] = implementation

    def resolve(self, interface):
        if interface in self._services:
            return self._services[interface]
        else:
            return None  # Or raise an exception

# Usage
locator = ServiceLocator()
locator.register(DatabaseConnection, DatabaseConnection("my_db_string"))
locator.register(Logger, Logger("app.log"))

def client_code(db_conn, logger):
    db_conn.connect()
    logger.log("Client code executed.")

db_conn = locator.resolve(DatabaseConnection)
logger = locator.resolve(Logger)

if db_conn and logger:
    client_code(db_conn, logger)
else:
    print("Dependencies not found!")
```