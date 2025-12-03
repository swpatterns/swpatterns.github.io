---
title: "Proxy - C++"
date: 2025-12-03T12:46:33.019-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["C++"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like remote access, security checks, or lazy initialization.  The `Subject` interface defines the common access point, the `RealSubject` is the actual object of interaction, and the `Proxy` controls access to the `RealSubject`.  

This C++ implementation uses smart pointers (`std::shared_ptr`) to manage the lifetime of the `RealSubject` within the `Proxy`.  The `Proxy` intercepts requests and performs actions (like logging or access control) before forwarding them to the `RealSubject`.  Using interfaces (`std::enable_shared_from_this`) allows the `RealSubject` to be safely shared through the `Proxy`. This approach is idiomatic C++ due to its emphasis on resource management and the use of RAII principles.

```cpp
#include <iostream>
#include <memory>
#include <string>

// Forward declaration
class RealSubject;

// Subject interface
class Subject {
public:
    virtual ~Subject() = default;
    virtual void request() = 0;
};

// RealSubject
class RealSubject : public std::enable_shared_from_this<RealSubject> {
public:
    void request() {
        std::cout << "RealSubject: Handling request." << std::endl;
    }
};

// Proxy
class Proxy : public Subject {
public:
    Proxy(std::shared_ptr<RealSubject> realSubject) : realSubject_(realSubject) {}

    void request() override {
        std::cout << "Proxy: Logging the request before forwarding." << std::endl;
        // Add access control or other logic here if needed
        if (realSubject_) {
            realSubject_->request();
        } else {
            std::cout << "Proxy: RealSubject is unavailable." << std::endl;
        }
    }

private:
    std::shared_ptr<RealSubject> realSubject_;
};

// Client code
int main() {
    auto realSubject = std::make_shared<RealSubject>();
    auto proxy = std::make_shared<Proxy>(realSubject);

    proxy->request();

    // Simulate RealSubject becoming unavailable
    realSubject.reset();
    proxy->request();

    return 0;
}
```