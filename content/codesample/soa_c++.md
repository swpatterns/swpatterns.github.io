---
title: "SOA - C++"
date: 2025-12-03T14:47:52.684-05:00
draft: false
pattern_usage: ["SOA"]
language: ["C++"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, independent services. Each service encapsulates a specific business function and communicates with others through well-defined interfaces, typically using messages. This promotes modularity, reusability, and maintainability.

The C++ example demonstrates a simplified SOA with `UserService` and `ProductService`. Each service has a dedicated interface (`IUserService`, `IProductService`) defining its operations.  A `ServiceLocator` provides access to these services, decoupling clients from direct service instantiation.  This approach leverages interfaces for abstraction and a central locator for dependency management, aligning with C++'s emphasis on explicit control and resource management while achieving SOA's core principles.  The use of smart pointers (`std::shared_ptr`) manages service lifetimes safely.

```cpp
#include <iostream>
#include <memory>
#include <map>

// Service Interfaces
class IUserService {
public:
    virtual ~IUserService() = default;
    virtual std::string getUserName(int userId) = 0;
};

class IProductService {
public:
    virtual ~IProductService() = default;
    virtual double getProductPrice(int productId) = 0;
};

// Service Implementations
class UserService : public IUserService {
public:
    std::string getUserName(int userId) override {
        // Simulate database lookup
        if (userId == 123) {
            return "Alice";
        }
        return "Unknown";
    }
};

class ProductService : public IProductService {
public:
    double getProductPrice(int productId) override {
        // Simulate database lookup
        if (productId == 456) {
            return 19.99;
        }
        return 0.0;
    }
};

// Service Locator
class ServiceLocator {
public:
    void registerService(std::shared_ptr<IUserService> service) {
        services[typeid(IUserService)] = service;
    }

    void registerService(std::shared_ptr<IProductService> service) {
        services[typeid(IProductService)] = service;
    }

    std::shared_ptr<IUserService> getUserService() {
        return std::any_cast<std::shared_ptr<IUserService>>(services[typeid(IUserService)]);
    }

    std::shared_ptr<IProductService> getProductService() {
        return std::any_cast<std::shared_ptr<IProductService>>(services[typeid(IProductService)]);
    }

private:
    std::map<std::type_index, std::any> services;
};

// Client Code
int main() {
    ServiceLocator locator;
    locator.registerService(std::make_shared<UserService>());
    locator.registerService(std::make_shared<ProductService>());

    auto userService = locator.getUserService();
    auto productService = locator.getProductService();

    std::cout << "User Name: " << userService->getUserName(123) << std::endl;
    std::cout << "Product Price: " << productService->getProductPrice(456) << std::endl;

    return 0;
}
```