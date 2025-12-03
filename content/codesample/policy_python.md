---
title: "Policy - Python"
date: 2025-12-03T13:55:03.634-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Python"]
---
The Policy pattern allows for runtime modification of object behavior without altering the object's code. It achieves this by encapsulating the behavior within separate policy classes, and allowing the object to accept different policies as needed. This promotes flexibility and adheres to the Open/Closed Principle.

The Python example defines a `Subject` class representing the object whose behavior is to be modified.  A `Policy` abstract base class defines the interface for behaviors. Concrete policies like `ValidationPolicy` and `LoggingPolicy` implement this interface. The `Subject` accepts a policy during initialization and delegates behavior to it. This is idiomatic Python due to its use of duck typing and ABCs for defining interfaces, and its flexible nature allows for easy extension with new policies.

```python
from abc import ABC, abstractmethod
import logging

logging.basicConfig(level=logging.INFO)

class Policy(ABC):
    @abstractmethod
    def execute(self, data):
        pass

class ValidationPolicy(Policy):
    def __init__(self, rules):
        self.rules = rules

    def execute(self, data):
        for rule in self.rules:
            if not rule(data):
                raise ValueError("Data validation failed.")
        return data

class LoggingPolicy(Policy):
    def execute(self, data):
        logging.info(f"Data processed: {data}")
        return data

class Subject:
    def __init__(self, policy: Policy):
        self.policy = policy

    def process_data(self, data):
        return self.policy.execute(data)

# Example Usage
def is_positive(data):
    return data > 0

def is_string(data):
    return isinstance(data, str)

if __name__ == "__main__":
    # Process a positive number with validation and logging
    validation_policy = ValidationPolicy([is_positive])
    logging_policy = LoggingPolicy()

    # Combine policies (chain of responsibility style)
    combined_policy = lambda data: logging_policy.execute(validation_policy.execute(data))
    subject = Subject(combined_policy)

    try:
        result = subject.process_data(5)
        print(f"Processed data: {result}")
    except ValueError as e:
        print(f"Error: {e}")

    try:
        result = subject.process_data(-2)
        print(f"Processed data: {result}")
    except ValueError as e:
        print(f"Error: {e}")

    # Process a string with only logging
    subject = Subject(logging_policy)
    result = subject.process_data("Hello, Policy Pattern!")
    print(f"Processed data: {result}")
```