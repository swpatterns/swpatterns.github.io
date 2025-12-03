---
title: "Memento - Python"
date: 2025-12-03T13:18:41.826-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Python"]
---
The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later, even if the object is modified or destroyed. This is particularly useful for implementing undo/redo functionality.  Here, we use a `Memento` class to hold the state, an `Originator` to create and manage the memento, and a `Caretaker` to store and retrieve mementoes without directly accessing the originator's state. This implementation is Pythonic due to its reliance on simple classes and data structures, avoiding complex state management within the originator itself.

```python
class Memento:
    """
    Holds the state of the Originator.
    """
    def __init__(self, state):
        self.state = state

    def get_state(self):
        return self.state


class Originator:
    """
    Creates mementos and restores itself from them.
    """
    def __init__(self, default_state):
        self.state = default_state

    def set_state(self, state):
        self.state = state

    def create_memento(self):
        """
        Saves the current state to a Memento.
        """
        return Memento(self.state)

    def restore_memento(self, memento):
        """
        Restores the state from a Memento.
        """
        self.state = memento.get_state()

    def __str__(self):
        return f"State: {self.state}"


class Caretaker:
    """
    Stores and retrieves mementos.  Doesn't inspect the memento's contents.
    """
    def __init__(self):
        self.mementos = []

    def add_memento(self, memento):
        self.mementos.append(memento)

    def get_memento(self, index):
        return self.mementos[index]


if __name__ == "__main__":
    originator = Originator("Initial State")
    caretaker = Caretaker()

    # Save the initial state
    caretaker.add_memento(originator.create_memento())

    originator.set_state("First State")
    print(originator)
    caretaker.add_memento(originator.create_memento())

    originator.set_state("Second State")
    print(originator)
    caretaker.add_memento(originator.create_memento())

    # Restore to the first state
    originator.restore_memento(caretaker.get_memento(1))
    print(originator)

    # Restore to the initial state
    originator.restore_memento(caretaker.get_memento(0))
    print(originator)
```