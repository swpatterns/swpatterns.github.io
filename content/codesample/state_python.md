---
title: "State - Python"
date: 2025-12-03T13:28:01.876-05:00
draft: false
pattern_usage: ["State"]
language: ["Python"]
---
The State pattern allows an object to alter its behavior when its internal state changes. This avoids using complex conditional logic (if/else or switch/case) by encapsulating each state as a separate class. The context object holds a reference to a current state object and delegates behavior to it.  This example models a traffic light with states Red, Yellow, and Green. Each state class defines the `handle()` method representing the light's action for a given signal. The `TrafficLight` class, the context, manages the current state and transitions between them. Using classes for each state is a natural fit for Python’s object-oriented capabilities and promotes readability.

```python
# traffic_light.py
class State:
    def handle(self):
        raise NotImplementedError

class RedState(State):
    def handle(self):
        print("Red: Stop!")

class YellowState(State):
    def handle(self):
        print("Yellow: Caution, prepare to stop.")

class GreenState(State):
    def handle(self):
        print("Green: Go!")

class TrafficLight:
    def __init__(self):
        self._state = RedState()

    def change_state(self, state):
        self._state = state

    def signal(self):
        self._state.handle()

if __name__ == "__main__":
    light = TrafficLight()
    light.signal()  # Red: Stop!
    light.change_state(GreenState())
    light.signal()  # Green: Go!
    light.change_state(YellowState())
    light.signal()  # Yellow: Caution, prepare to stop.
```