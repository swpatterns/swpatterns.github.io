---
title: "Command - Java"
date: 2025-12-03T13:00:17.041-05:00
draft: false
pattern_usage: ["Command"]
language: ["Java"]
---
The Command pattern encapsulates a request as an object, thereby allowing for parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This implementation defines a `Command` interface with an `execute` method. Concrete commands like `TurnOnCommand` and `TurnOffCommand` implement this interface, holding a reference to the `Light` (the receiver). The `RemoteControl` acts as the invoker, accepting and executing commands. This aligns with Java's OOP principles promoting loose coupling and extensibility.  Using interfaces and concrete classes is a standard Java approach for achieving polymorphism and a clean design.

```java
// Command Interface
interface Command {
    void execute();
}

// Receiver
class Light {
    private boolean on;

    public void turnOn() {
        on = true;
        System.out.println("Light is on");
    }

    public void turnOff() {
        on = false;
        System.out.println("Light is off");
    }

    public boolean isOn() {
        return on;
    }
}

// Concrete Commands
class TurnOnCommand implements Command {
    private final Light light;

    public TurnOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }
}

class TurnOffCommand implements Command {
    private final Light light;

    public TurnOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOff();
    }
}


// Invoker
class RemoteControl {
    private Command slot;

    public RemoteControl() {
    }

    public void setCommand(Command command) {
        this.slot = command;
    }

    public void buttonPressed() {
        slot.execute();
    }
}

// Main
public class CommandExample {
    public static void main(String[] args) {
        Light light = new Light();
        TurnOnCommand turnOn = new TurnOnCommand(light);
        TurnOffCommand turnOff = new TurnOffCommand(light);

        RemoteControl remote = new RemoteControl();
        remote.setCommand(turnOn);
        remote.buttonPressed(); // Light is on

        remote.setCommand(turnOff);
        remote.buttonPressed(); // Light is off
    }
}
```