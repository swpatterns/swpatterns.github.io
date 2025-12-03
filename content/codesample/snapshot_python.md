---
title: "Snapshot - Python"
date: 2025-12-03T13:59:22.143-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Python"]
---
The Snapshot pattern allows capturing and restoring the internal state of an object. This is useful for implementing features like undo/redo, transaction rollback, or saving game progress. The core idea is to separate the object's state from how it's presented or used, enabling state serialization and deserialization.

The Python implementation uses a separate `Snapshot` class to hold the object's state at a specific point in time. The `Originator` class manages the state and provides methods to create and revert to snapshots.  This approach leverages Python's data classes for concise state representation and its flexibility to handle object state effectively.  The use of dictionaries to store state is common in Python for its adaptability.

```python
from dataclasses import dataclass, field
from typing import Dict

@dataclass
class Snapshot:
    state: Dict

class Originator:
    def __init__(self, initial_state: Dict):
        self._state = initial_state

    def create_snapshot(self) -> Snapshot:
        return Snapshot(self._state.copy())

    def restore_snapshot(self, snapshot: Snapshot):
        self._state = snapshot.state

    def get_state(self) -> Dict:
        return self._state

    def set_value(self, key: str, value):
        self._state[key] = value

# Example Usage
if __name__ == "__main__":
    originator = Originator({"value": 10})

    snapshot1 = originator.create_snapshot()
    print(f"Initial state: {originator.get_state()}")

    originator.set_value("value", 20)
    print(f"State after modification: {originator.get_state()}")

    originator.restore_snapshot(snapshot1)
    print(f"State after restoring snapshot 1: {originator.get_state()}")

    snapshot2 = originator.create_snapshot()
    originator.set_value("value", 30)
    print(f"State after another modification: {originator.get_state()}")
    originator.restore_snapshot(snapshot2)
    print(f"State after restoring snapshot 2: {originator.get_state()}")
```