---
title: "Bridge - C++"
date: 2025-12-03T11:31:20.381-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["C++"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different abstractions with different implementations, and vice versa. This is useful when you have multiple abstractions and implementations that you want to combine without creating a tight coupling between them.

The code demonstrates this by defining an `Abstraction` class (e.g., `RemoteControl`) which uses an interface `Implementor` (e.g., `Device`). Concrete Implementors (e.g., `TV`, `Radio`) handle specific device operations. Different concrete Abstractions can then use the *same* Implementor, or an abstraction can switch Implementors at runtime. This C++ implementation favors composition over inheritance, which aligns with modern C++ best practices, providing flexibility and avoiding the rigidity of tight coupling, and showcases polymorphism through the `Implementor` interface.

```cpp
#include <iostream>

// Implementor interface
class Device {
public:
    virtual void turnOn() = 0;
    virtual void turnOff() = 0;
    virtual void setChannel(int channel) = 0;
    virtual ~Device() = default;
};

// Concrete Implementors
class TV : public Device {
public:
    void turnOn() override { std::cout << "TV is turned on.\n"; }
    void turnOff() override { std::cout << "TV is turned off.\n"; }
    void setChannel(int channel) override { std::cout << "TV set to channel " << channel << ".\n"; }
};

class Radio : public Device {
public:
    void turnOn() override { std::cout << "Radio is turned on.\n"; }
    void turnOff() override { std::cout << "Radio is turned off.\n"; }
    void setChannel(int channel) override { std::cout << "Radio set to frequency " << channel << ".\n"; }
};

// Abstraction
class RemoteControl {
private:
    Device* device;

public:
    RemoteControl(Device* device) : device(device) {}

    void turnOn() { device->turnOn(); }
    void turnOff() { device->turnOff(); }
    void setChannel(int channel) { device->setChannel(channel); }

    // Allows changing the device implementation at runtime
    void setDevice(Device* device) { this->device = device; }
};

int main() {
    TV tv;
    Radio radio;

    RemoteControl remote1(&tv);
    remote1.turnOn();
    remote1.setChannel(10);
    remote1.turnOff();

    RemoteControl remote2(&radio);
    remote2.turnOn();
    remote2.setChannel(915);
    remote2.turnOff();

    // Demonstrate changing the implementation at runtime
    remote1.setDevice(&radio);
    remote1.turnOn(); // Now controls the radio
    remote1.setChannel(987);

    return 0;
}
```