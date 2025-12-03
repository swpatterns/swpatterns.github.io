---
title: "Service Locator - C++"
date: 2025-12-03T11:23:44.539-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["C++"]
---
The Service Locator pattern provides a central point of access to various services within an application. Instead of objects directly creating or finding their dependencies, they request them from a global locator. This decouples the client from concrete implementations, increasing flexibility and testability.

The code below demonstrates a simple Service Locator in C++.  The `ServiceLocator` class holds a map of service interfaces to their implementations.  `registerService` adds a service, and `resolve` retrieves it. Clients request services via `ServiceLocator::get()`, which handles the lookup. This fits C++ style by utilizing RAII for the locator's lifetime (though global scope is used here for simplicity) and using templates to provide type safety when resolving services.  Using interfaces (abstract classes) and concrete implementations promotes loose coupling common in C++ designs.

```cpp
#include <iostream>
#include <map>
#include <memory>
#include <stdexcept>

// Interface for services
class ILoggingService {
public:
  virtual void log(const std::string& message) = 0;
  virtual ~ILoggingService() = default;
};

// Concrete implementation of the logging service
class ConsoleLoggingService : public ILoggingService {
public:
  void log(const std::string& message) override {
    std::cout << "Log: " << message << std::endl;
  }
};

// Service Locator class
class ServiceLocator {
public:
  template <typename T>
  T& get() {
    auto it = services_.find(typeid(T));
    if (it == services_.end()) {
      throw std::runtime_error("Service not found");
    }
    return *std::any_cast<T>(it->second);
  }

  void registerService(const std::type_info& type, std::any service) {
    services_[type] = service;
  }

private:
  std::map<std::type_info, std::any> services_;
};

// Global Service Locator instance
ServiceLocator& locator = ServiceLocator::getInstance();

ServiceLocator& ServiceLocator::getInstance() {
    static ServiceLocator instance;
    return instance;
}

// Client class that uses the service
class Client {
public:
  Client(ILoggingService& loggingService) : loggingService_(loggingService) {}

  void doSomething() {
    loggingService_.log("Client is doing something...");
  }

private:
  ILoggingService& loggingService_;
};

int main() {
  // Register the logging service
  locator.registerService(typeid(ILoggingService), std::make_any<ConsoleLoggingService>());

  // Resolve and use the logging service
  Client client(locator.get<ILoggingService>());
  client.doSomething();

  return 0;
}
```