---
title: "Layered Architecture - C++"
date: 2025-12-03T14:04:40.049-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["C++"]
---
The Layered Architecture pattern organizes an application into distinct horizontal layers, each performing a specific role. This promotes separation of concerns, making the system more maintainable and testable. Layers typically include a Presentation Layer (UI), a Business Logic Layer, and a Data Access Layer.  Each layer only interacts with the layers immediately above and below it. 

This C++ example demonstrates a simplified layered architecture for managing user accounts. The `PresentationLayer` handles user interaction, the `BusinessLogicLayer` contains account-related business rules (like validation), and the `DataAccessLayer` interacts with a simple in-memory database.  The use of interfaces (`IAccountRepository`, `IAccountService`) is a common C++ practice for decoupling layers and allowing for easier dependency injection and testing.  This approach is readily adaptable to more complex scenarios with real databases and applications.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

// Data Access Layer
class IAccountRepository {
public:
  virtual bool saveAccount(const std::string& username, const std::string& password) = 0;
  virtual bool authenticateAccount(const std::string& username, const std::string& password) = 0;
  virtual ~IAccountRepository() = default;
};

class InMemoryAccountRepository : public IAccountRepository {
private:
  std::vector<std::pair<std::string, std::string>> accounts;
public:
  bool saveAccount(const std::string& username, const std::string& password) override {
    accounts.push_back({username, password});
    return true;
  }

  bool authenticateAccount(const std::string& username, const std::string& password) override {
    return std::any_of(accounts.begin(), accounts.end(), 
                       [&](const auto& account){ return account.first == username && account.second == password; });
  }
};

// Business Logic Layer
class IAccountService {
public:
  virtual bool registerAccount(const std::string& username, const std::string& password) = 0;
  virtual bool loginAccount(const std::string& username, const std::string& password) = 0;
  virtual ~IAccountService() = default;
};

class AccountService : public IAccountService {
private:
  IAccountRepository* repository;

public:
  AccountService(IAccountRepository* repo) : repository(repo) {}

  bool registerAccount(const std::string& username, const std::string& password) override {
    if (username.empty() || password.empty()) return false;
    return repository->saveAccount(username, password);
  }

  bool loginAccount(const std::string& username, const std::string& password) override {
    if (username.empty() || password.empty()) return false;
    return repository->authenticateAccount(username, password);
  }
};

// Presentation Layer
class PresentationLayer {
private:
  IAccountService* service;

public:
  PresentationLayer(IAccountService* svc) : service(svc) {}

  void run() {
    std::string username, password;
    char choice;

    do {
      std::cout << "\nMenu:\n";
      std::cout << "1. Register\n";
      std::cout << "2. Login\n";
      std::cout << "3. Exit\n";
      std::cout << "Enter your choice: ";
      std::cin >> choice;

      switch (choice) {
        case '1':
          std::cout << "Enter username: ";
          std::cin >> username;
          std::cout << "Enter password: ";
          std::cin >> password;
          if (service->registerAccount(username, password)) {
            std::cout << "Account registered successfully!\n";
          } else {
            std::cout << "Registration failed.\n";
          }
          break;
        case '2':
          std::cout << "Enter username: ";
          std::cin >> username;
          std::cout << "Enter password: ";
          std::cin >> password;
          if (service->loginAccount(username, password)) {
            std::cout << "Login successful!\n";
          } else {
            std::cout << "Login failed.\n";
          }
          break;
        case '3':
          std::cout << "Exiting...\n";
          break;
        default:
          std::cout << "Invalid choice. Try again.\n";
      }
    } while (choice != '3');
  }
};

int main() {
  InMemoryAccountRepository repository;
  AccountService service(&repository);
  PresentationLayer presentation(&service);

  presentation.run();

  return 0;
}
```