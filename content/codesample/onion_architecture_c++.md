---
title: "Onion Architecture - C++"
date: 2025-12-03T14:13:26.861-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["C++"]
---
The Onion Architecture aims for loose coupling by organizing code into concentric layers. The innermost layer represents the core business logic, independent of any external concerns (databases, UI, etc.). Layers outward represent infrastructure details, only depending on inner layers. This promotes testability and adaptability.

Our C++ example simplifies a basic user service. The `Entities` layer defines the `User` data structure. `UseCases` contain the business logic, operating on `User` objects.  `InterfaceAdapters` (presenters/controllers - here just a simple controller) acts as a translator between external requests and use cases.  Finally, the `FrameworkDrivers` layer (e.g., CLI, web framework) handles I/O and dependency injection.  Forward declarations heavily used to manage dependencies and avoid circular includes, maintaining the architecture’s layering.



```cpp
#include <iostream>
#include <string>
#include <vector>

// Entities (Core Business Objects)
namespace Entities {
struct User {
  int id;
  std::string name;
};
} // namespace Entities

// Use Cases (Business Logic)
namespace UseCases {
using Entities::User;

class UserService {
public:
  std::vector<User> getAllUsers() {
    // In a real application, this would fetch from a repository.
    return {{1, "Alice"}, {2, "Bob"}};
  }
};
} // namespace UseCases

// Interface Adapters (Presenters/Controllers)
namespace InterfaceAdapters {
namespace Controllers {
using Entities::User;
using UseCases::UserService;

class UserController {
public:
  UserController(UserService& userService) : userService_(userService) {}

  void listUsers() {
    std::vector<User> users = userService_.getAllUsers();
    for (const auto& user : users) {
      std::cout << "User ID: " << user.id << ", Name: " << user.name << std::endl;
    }
  }

private:
  UserService& userService_;
};
} // namespace Controllers
} // namespace InterfaceAdapters

// Framework Drivers (I/O, Dependencies)
int main() {
  UseCases::UserService userService;
  InterfaceAdapters::Controllers::UserController controller(userService);

  std::cout << "Listing Users:" << std::endl;
  controller.listUsers();

  return 0;
}
```