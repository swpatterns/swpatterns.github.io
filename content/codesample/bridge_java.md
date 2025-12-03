---
title: "Bridge - Java"
date: 2025-12-03T11:30:02.867-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Java"]
---
The Bridge pattern is a structural design pattern that lets you split one or several interfaces from their implementations. This pattern allows implementations to vary independently of interfaces, avoiding rigid inheritance hierarchies. It promotes loose coupling, making it easy to switch implementations without affecting clients.

In this Java example, `RemoteControl` is the *Abstraction*, defining a high-level interface for controlling a device. `Device` is the *Implementor* interface, representing the concrete device operations. `ConcreteRemoteControl` is a specific abstraction, using the `Device` interface.  `TV` and `Radio` are concrete implementors providing device-specific functionalities. The client interacts with `ConcreteRemoteControl` through the `Device` interface. This implementation uses interfaces, an idiomatic Java practice, favoring composition over inheritance and allowing for flexible implementation changes.

```java
// Implementor Interface
interface Device {
    void turnOn();
    void turnOff();
    void setVolume(int volume);
}

// Concrete Implementors
class TV implements Device {
    @Override
    public void turnOn() {
        System.out.println("TV is on!");
    }

    @Override
    public void turnOff() {
        System.out.println("TV is off!");
    }

    @Override
    public void setVolume(int volume) {
        System.out.println("Setting TV volume to " + volume);
    }
}

class Radio implements Device {
    @Override
    public void turnOn() {
        System.out.println("Radio is on!");
    }

    @Override
    public void turnOff() {
        System.out.println("Radio is off!");
    }

    @Override
    public void setVolume(int volume) {
        System.out.println("Setting Radio volume to " + volume);
    }
}

// Abstraction Interface
interface RemoteControl {
    void buttonPressed(String button);
}

// Concrete Abstraction
class ConcreteRemoteControl implements RemoteControl {
    private Device device;

    public ConcreteRemoteControl(Device device) {
        this.device = device;
    }

    @Override
    public void buttonPressed(String button) {
        if (button.equals("on")) {
            device.turnOn();
        } else if (button.equals("off")) {
            device.turnOff();
        } else if (button.startsWith("volume")) {
            int volume = Integer.parseInt(button.split(" ")[1]);
            device.setVolume(volume);
        } else {
            System.out.println("Unknown button!");
        }
    }
}


// Client
public class BridgeExample {
    public static void main(String[] args) {
        Device tv = new TV();
        RemoteControl tvRemote = new ConcreteRemoteControl(tv);
        tvRemote.buttonPressed("on");
        tvRemote.buttonPressed("volume 5");
        tvRemote.buttonPressed("off");

        Device radio = new Radio();
        RemoteControl radioRemote = new ConcreteRemoteControl(radio);
        radioRemote.buttonPressed("on");
        radioRemote.buttonPressed("volume 3");
        radioRemote.buttonPressed("off");
    }
}
```