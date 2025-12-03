---
title: "Command - C++"
date: 2025-12-03T13:01:50.275-05:00
draft: false
pattern_usage: ["Command"]
language: ["C++"]
---
The Command pattern encapsulates a request as an object, allowing parameterization of clients with different requests, queue or log requests, and support undoable operations. This implementation uses C++ classes to represent concrete commands, an interface for commands, and an invoker class that manages command execution.  It's idiomatic C++ due to its explicit use of classes, interfaces (abstract classes), and pointers to objects, leveraging polymorphism for flexible command handling.  The 'execute' method within the Command interface is a key element, adhering to the principle of separating the request from its execution.

```cpp
#include <iostream>
#include <memory>

// Command Interface
class Command {
public:
  virtual ~Command() = default;
  virtual void execute() = 0;
};

// Receiver
class Light {
public:
  void turnOn() {
    std::cout << "Light turned on" << std::endl;
  }
  void turnOff() {
    std::cout << "Light turned off" << std::endl;
  }
};

// Concrete Commands
class TurnOnCommand : public Command {
public:
  TurnOnCommand(Light* light) : light_(light) {}
  void execute() override {
    light_->turnOn();
  }

private:
  Light* light_;
};

class TurnOffCommand : public Command {
public:
  TurnOffCommand(Light* light) : light_(light) {}
  void execute() override {
    light_->turnOff();
  }

private:
  Light* light_;
};

// Invoker
class SimpleRemoteControl {
public:
  void setCommand(std::unique_ptr<Command> command) {
    command_ = std::move(command);
  }

  void buttonPressed() {
    if (command_) {
      command_->execute();
    } else {
      std::cout << "No command set." << std::endl;
    }
  }

private:
  std::unique_ptr<Command> command_;
};

int main() {
  Light* light = new Light();
  SimpleRemoteControl remote;

  remote.setCommand(std::make_unique<TurnOnCommand>(light));
  remote.buttonPressed();

  remote.setCommand(std::make_unique<TurnOffCommand>(light));
  remote.buttonPressed();

  delete light; //explicit memory management
  return 0;
}
```