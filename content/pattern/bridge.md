---
title: "Bridge"
date: 2024-02-29T14:56:12-00:00
draft: false
pattern_types: ["structural", "GOF"]
wikipedia: "https://en.wikipedia.org/wiki/Bridge_pattern"
diagramtype: "class"
diagram: "[Abstractor] --|> [RefinedAbstractor: Concrete implementations] \n[Implementor] --|> [ConcreteImplementorA], [ConcreteImplementorB] \n[Abstractor] o-- [Implementor: uses]"
code: true
---

The Bridge pattern is a structural design pattern that lets you split an interface into separate interfaces. This pattern is useful when you want to avoid a tight coupling between an abstraction and its implementation, allowing you to vary them independently. It’s particularly effective when you anticipate that both the abstraction and implementation will change in different ways.

In essence, the Bridge introduces an `Implementor` interface which provides the core functionality, and an `Abstractor` interface which uses the `Implementor` to deliver a higher-level abstraction. This decoupling allows for flexibility and extensibility.  Different implementations can be swapped without affecting the abstraction, and vice versa.

## Usage

The Bridge pattern is commonly used in the following scenarios:

*   **Database Abstraction:** When your application needs to work with different database systems (e.g., MySQL, PostgreSQL, Oracle), you can use the Bridge pattern to isolate the database-specific implementation details from the application's core logic.
*   **Graphics Rendering:** When you have different rendering engines (e.g., OpenGL, DirectX, SVG), a Bridge pattern allows you to switch between them easily without altering the code that uses them.
*   **Platform Independence:** When application logic must be independent of the underlying operating system (Windows, macOS, Linux), the Bridge can separate platform-specific calls.
*   **Message Queues:** Using different message queue systems (RabbitMQ, Kafka, Redis Pub/Sub) requires the abstraction of the messaging implementation.

## Examples

**1. Java Virtual Machine (JVM)**

The JVM internally uses a Bridge pattern. The Java language specification defines the `Abstractor` – the bytecode instructions and the Java API. The actual `Implementor` is the underlying native code execution environment, which differs for each operating system (Windows, macOS, Linux).  The JVM bridges the gap between the platform-independent Java bytecode and the platform-dependent hardware instructions.

**2. Remote Control with Different Protocols**

Consider a remote control that can control different devices. The remote control's button presses (`Abstractor`) need to be translated into specific commands for the device. The communication protocol (`Implementor`) – such as infrared, Bluetooth, or Wi-Fi – can be changed without needing to modify the remote control’s core logic. You could have a `RemoteControl` class paired with interfaces like `InfraredCommandExecutor`, `BluetoothCommandExecutor`, and `WiFiCommandExecutor`.

java
// Implementor
interface CommandExecutor {
  void execute(String command);
}

class InfraredCommandExecutor implements CommandExecutor {
  @Override
  public void execute(String command) {
    System.out.println("Sending infrared command: " + command);
  }
}

class BluetoothCommandExecutor implements CommandExecutor {
  @Override
  public void execute(String command) {
    System.out.println("Sending bluetooth command: " + command);
  }
}

// Abstractor
class RemoteControl {
  private CommandExecutor executor;

  public RemoteControl(CommandExecutor executor) {
    this.executor = executor;
  }

  public void pressButton(String command) {
    executor.execute(command);
  }
}

// Example Usage
public class BridgeExample {
  public static void main(String[] args) {
    RemoteControl irRemote = new RemoteControl(new InfraredCommandExecutor());
    irRemote.pressButton("channelUp");

    RemoteControl btRemote = new RemoteControl(new BluetoothCommandExecutor());
    btRemote.pressButton("volumeDown");
  }
}
