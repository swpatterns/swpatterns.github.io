---
title: "Command - Swift"
date: 2025-12-03T13:03:26.393-05:00
draft: false
pattern_usage: ["Command"]
language: ["Swift"]
---
The Command pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations. This implementation uses a protocol to define the command interface, with concrete commands implementing specific actions on a receiver object.  The `RemoteControl` acts as the invoker, holding and executing commands. Swift's protocol-oriented programming lends itself well to this pattern, as protocols naturally define interfaces, and functions can be passed as first-class citizens—effectively making them commands.  Using a dictionary to map buttons to commands provides a flexible way to configure the remote.

```swift
// Command Protocol
protocol Command {
    func execute()
}

// Receiver
class Light {
    var isOn: Bool = false

    func turnOn() {
        isOn = true
        print("Light turned on")
    }

    func turnOff() {
        isOn = false
        print("Light turned off")
    }
}

// Concrete Commands
class TurnOnCommand: Command {
    private let light: Light

    init(light: Light) {
        self.light = light
    }

    func execute() {
        light.turnOn()
    }
}

class TurnOffCommand: Command {
    private let light: Light

    init(light: Light) {
        self.light = light
    }

    func execute() {
        light.turnOff()
    }
}

// Invoker
class RemoteControl {
    private var commands: [String: Command] = [:]

    func setCommand(button: String, command: Command) {
        commands[button] = command
    }

    func buttonPressed(button: String) {
        if let command = commands[button] {
            command.execute()
        } else {
            print("No command assigned to button \(button)")
        }
    }
}

// Client Code
let light = Light()
let turnOnCommand = TurnOnCommand(light: light)
let turnOffCommand = TurnOffCommand(light: light)

let remote = RemoteControl()
remote.setCommand(button: "on", command: turnOnCommand)
remote.setCommand(button: "off", command: turnOffCommand)

remote.buttonPressed(button: "on")
remote.buttonPressed(button: "off")
remote.buttonPressed(button: "unknown")
```