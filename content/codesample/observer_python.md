---
title: "Observer - Python"
date: 2025-12-03T13:23:45.324-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Python"]
---
The Observer pattern defines a one-to-many dependency between objects so that when one object (the subject) changes state, all its dependents (observers) are notified and updated automatically. This promotes loose coupling, allowing subjects and observers to evolve independently.

The code implements the pattern with a `Subject` class that maintains a list of `Observer` objects.  Observers register with the subject and define an `update` method to handle notifications. The `Subject`'s `attach`, `detach`, and `notify` methods manage the observer list and dispatch updates.  This uses Python's dynamic typing and first-class functions, fitting the language's flexible nature, and leverages lists for observer storage—a common and direct approach in Python.

```python
# Observer Pattern in Python

class Observer:
    def update(self, subject):
        raise NotImplementedError

class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def detach(self, observer):
        self._observers.remove(observer)

    def notify(self, data):
        for observer in self._observers:
            observer.update(data)

class ConcreteObserver(Observer):
    def __init__(self, name):
        self.name = name

    def update(self, subject):
        print(f"{self.name} received update: {subject}")

class DataStore(Subject):
    def __init__(self):
        super().__init__()
        self._data = None

    def set_data(self, data):
        self._data = data
        self.notify(data)

    def get_data(self):
        return self._data

if __name__ == "__main__":
    data_store = DataStore()
    observer1 = ConcreteObserver("Observer 1")
    observer2 = ConcreteObserver("Observer 2")

    data_store.attach(observer1)
    data_store.attach(observer2)

    data_store.set_data("Initial Data")
    data_store.set_data("Updated Data")

    data_store.detach(observer2)
    data_store.set_data("Final Data")
```