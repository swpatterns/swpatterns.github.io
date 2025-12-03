---
title: "Hexagonal Architecture - C++"
date: 2025-12-03T14:08:56.202-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["C++"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by separating the core application logic from external concerns like databases, UI, and third-party services.  The core interacts with the outside world via *ports* (interfaces defining allowed interactions) which are then implemented by *adapters* (concrete components connecting to specific technologies). This allows swapping implementations of external concerns without affecting the core.

This example outlines a simple use case: a service that processes user names. The core defines a `UserProcessorPort` interface.  A `ConsoleUI` adapter provides input/output, and a `NameRepository` adapter mocks data persistence.  This structure exemplifies C++'s strength in interface-based design and promotes testability, as the core logic doesn't depend on concrete implementations and can be tested with mock adapters.  Dependency Injection is used for loose coupling.

```cpp
#include <iostream>
#include <string>

// Core Application Logic - Define the Port
class UserProcessorPort {
public:
  virtual ~UserProcessorPort() = default;
  virtual std::string processName(const std::string& name) = 0;
};

// Core Application - Implementation of the use case
class UserProcessor : public UserProcessorPort {
public:
  std::string processName(const std::string& name) override {
    //Business logic to process the name (example: capitalize)
    std::string processedName = name;
    if (!processedName.empty()) {
      processedName[0] = toupper(processedName[0]);
    }
    return processedName;
  }
};

// External Concern - Data Storage (Port)
class UserRepositoryPort {
public:
  virtual ~UserRepositoryPort() = default;
  virtual bool saveUser(const std::string& name) = 0;
};

// External Concern - Adapter for Data Storage (Mock Implementation)
class NameRepository : public UserRepositoryPort {
public:
  bool saveUser(const std::string& name) override {
    std::cout << "Saving user: " << name << " to database (mock)." << std::endl;
    return true;
  }
};

// External Concern - User Interface (Adapter)
class ConsoleUI {
public:
  ConsoleUI(UserProcessorPort* userProcessor, UserRepositoryPort* userRepository)
      : userProcessor_(userProcessor), userRepository_(userRepository) {}

  void run() {
    std::string name;
    std::cout << "Enter your name: ";
    std::cin >> name;

    std::string processedName = userProcessor_->processName(name);
    std::cout << "Processed Name: " << processedName << std::endl;

    if (userRepository_->saveUser(processedName)) {
      std::cout << "User saved successfully." << std::endl;
    } else {
      std::cout << "Failed to save user." << std::endl;
    }
  }

private:
  UserProcessorPort* userProcessor_;
  UserRepositoryPort* userRepository_;
};

int main() {
  UserProcessor processor;
  NameRepository repository;
  ConsoleUI ui(&processor, &repository);

  ui.run();
  return 0;
}
```