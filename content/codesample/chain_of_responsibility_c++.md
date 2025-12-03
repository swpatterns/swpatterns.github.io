---
title: "Chain of Responsibility - C++"
date: 2025-12-03T12:56:58.684-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["C++"]
---
The Chain of Responsibility pattern is a behavioral design pattern that allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers.

The C++ example defines an abstract `Handler` class with a `setNext` and `handleRequest` method. Concrete handlers (`ConcreteHandlerA`, `ConcreteHandlerB`) override `handleRequest` to process specific requests or pass them on. The `Client` code creates the chain and sends a request. This implementation leverages inheritance and virtual functions, core concepts in C++ OOP, to achieve polymorphism—a key aspect of the pattern—and follows common C++ naming and class structure conventions, promoting readability and maintainability.

```cpp
#include <iostream>
#include <string>

class Handler {
public:
  virtual ~Handler() = default;
  void setNext(Handler* handler) { nextHandler_ = handler; }
  virtual void handleRequest(std::string request) {
    if (nextHandler_) {
      nextHandler_->handleRequest(request);
    } else {
      std::cout << "End of chain reached. Request not handled: " << request << std::endl;
    }
  }

protected:
  Handler* nextHandler_;
};

class ConcreteHandlerA : public Handler {
public:
  void handleRequest(std::string request) override {
    if (request == "A") {
      std::cout << "ConcreteHandlerA handled request: " << request << std::endl;
    } else {
      std::cout << "ConcreteHandlerA passed request: " << request << std::endl;
      Handler::handleRequest(request);
    }
  }
};

class ConcreteHandlerB : public Handler {
public:
  void handleRequest(std::string request) override {
    if (request == "B") {
      std::cout << "ConcreteHandlerB handled request: " << request << std::endl;
    } else {
      std::cout << "ConcreteHandlerB passed request: " << request << std::endl;
      Handler::handleRequest(request);
    }
  }
};

int main() {
  ConcreteHandlerA handlerA;
  ConcreteHandlerB handlerB;

  handlerA.setNext(&handlerB);

  handlerA.handleRequest("A");
  handlerA.handleRequest("B");
  handlerA.handleRequest("C");

  return 0;
}
```