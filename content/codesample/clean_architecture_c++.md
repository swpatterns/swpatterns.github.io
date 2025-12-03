---
title: "Clean Architecture - C++"
date: 2025-12-03T14:17:44.921-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["C++"]
---
The Clean Architecture pattern separates the application into concentric layers: Entities (core business rules), Use Cases (application-specific logic), Interface Adapters (translates data between layers), and Frameworks & Drivers (UI, databases, etc.). Dependencies point inwards – outer layers depend on inner layers, but inner layers have no knowledge of outer ones. This promotes testability, maintainability, and independence from frameworks.

This C++ implementation focuses on the core principle of dependency inversion. Entities are simple data classes. Use Cases define application operations, depending only on Entity interfaces.  Interface Adapters (e.g., `Presenter`) receive data from Use Cases and format it for the outer layer.  The `main` function represents Frameworks & Drivers, orchestrating calls but remaining separate from business logic. Using interfaces and dependency injection allows swapping implementations without affecting core logic, aligning with C++ best practices of abstraction and modularity.

```cpp
#include <iostream>
#include <string>
#include <vector>

// Entities
namespace Entities {
  class User {
  public:
    std::string name;
    int age;
  };
}

// Use Cases
namespace UseCases {
  class UserInteractor {
  public:
    virtual void getUser(int userId, Entities::User& user) = 0;
  };

  class GetUserUseCase : public UserInteractor {
  public:
    void getUser(int userId, Entities::User& user) override {
      // In a real app, this would fetch from a repository.
      // Here, we fake it for simplicity.
      if (userId == 1) {
        user.name = "Alice";
        user.age = 30;
      } else {
        user.name = "Unknown";
        user.age = 0;
      }
    }
  };
}

// Interface Adapters
namespace InterfaceAdapters {
  class Presenter {
  public:
    virtual void presentUser(const Entities::User& user) = 0;
  };

  class ConsolePresenter : public Presenter {
  public:
    void presentUser(const Entities::User& user) override {
      std::cout << "User: Name = " << user.name << ", Age = " << user.age << std::endl;
    }
  };
}

int main() {
  // Frameworks & Drivers (orchestration)
  UseCases::GetUserUseCase userUseCase;
  InterfaceAdapters::ConsolePresenter presenter;

  Entities::User user;
  userUseCase.getUser(1, user);
  presenter.presentUser(user);

  userUseCase.getUser(2, user);
  presenter.presentUser(user);

  return 0;
}
```