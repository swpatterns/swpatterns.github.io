---
title: "Bridge - Python"
date: 2025-12-03T11:30:19.299-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Python"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that the two can vary independently. It’s useful when you have an abstraction that can have multiple implementations, and you want to avoid a combinatorial explosion of classes.

This Python example demonstrates a `RemoteControl` (the Abstraction) that can work with different `Device` (Implementor) types – `TV` and `Radio`. The `RemoteControl` doesn’t *know* how each device functions, only that they have a common interface (`Device`).  This allows adding new devices without modifying the `RemoteControl` class, and changing the remote's functionality without altering device specifics. The code leverages Python’s duck typing for a flexible implementation and uses basic classes to represent the abstraction and implementor.

```python
from abc import ABC, abstractmethod

# Implementor: Defines the interface for device-specific operations.
class Device(ABC):
    @abstractmethod
    def turn_on(self):
        pass

    @abstractmethod
    def turn_off(self):
        pass

    @abstractmethod
    def set_volume(self, volume):
        pass

# Concrete Implementors: Implement the Device interface for specific devices.
class TV(Device):
    def turn_on(self):
        print("TV is turned on")

    def turn_off(self):
        print("TV is turned off")

    def set_volume(self, volume):
        print(f"TV volume set to {volume}")

class Radio(Device):
    def turn_on(self):
        print("Radio is turned on")

    def turn_off(self):
        print("Radio is turned off")

    def set_volume(self, volume):
        print(f"Radio volume set to {volume}")

# Abstraction: Defines the high-level interface for using the devices.
class RemoteControl:
    def __init__(self, device):
        self.device = device

    def press_button(self, button):
        if button == "on":
            self.device.turn_on()
        elif button == "off":
            self.device.turn_off()
        elif button == "volume_up":
            self.device.set_volume(self.device.get_volume() + 1) # Assuming get_volume exists
        elif button == "volume_down":
            self.device.set_volume(self.device.get_volume() - 1) # Assuming get_volume exists


    def get_volume(self):
        return self.device.get_volume() # Assuming get_volume exists - better to define in abstraction

# Example usage
if __name__ == "__main__":
    tv = TV()
    radio = Radio()

    remote_tv = RemoteControl(tv)
    remote_radio = RemoteControl(radio)

    remote_tv.press_button("on")
    remote_tv.press_button("volume_up")
    remote_radio.press_button("on")
    remote_radio.press_button("off")
```