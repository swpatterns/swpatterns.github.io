---
title: "Dependency Injection - C++"
date: 2025-12-03T11:20:07.249-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["C++"]
---
Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. This promotes loose coupling, making code more testable, maintainable, and reusable.  Our C++ example uses constructor injection, a common DI technique. The `Service` class depends on `Logger`. Instead of `Service` creating a `Logger` instance internally, we pass a `Logger` object into the `Service` constructor. This facilitates unit testing by allowing us to provide mock `Logger` implementations.  The code is idiomatic C++ as it leverages constructors for dependency provision and utilizes smart pointers (`std::unique_ptr`) for ownership management, avoiding potential memory leaks.

```cpp
#include <iostream>
#include <memory>
#include <string>

// Interface for the dependency (Logger)
class Logger {
public:
    virtual void log(const std::string& message) = 0;
    virtual ~Logger() = default;
};

// Concrete implementation of the dependency (ConsoleLogger)
class ConsoleLogger : public Logger {
public:
    void log(const std::string& message) override {
        std::cout << "Log: " << message << std::endl;
    }
};

// Class that depends on the Logger interface (Service)
class Service {
private:
    std::unique_ptr<Logger> logger_;

public:
    // Constructor injection: Receive the Logger dependency
    Service(std::unique_ptr<Logger> logger) : logger_(std::move(logger)) {}

    void doSomething() {
        logger_->log("Service is doing something...");
    }
};

int main() {
    // Create the dependency
    auto logger = std::make_unique<ConsoleLogger>();

    // Inject the dependency into the Service
    Service service(std::move(logger));

    service.doSomething();

    return 0;
}
```