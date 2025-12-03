---
title: "Lazy Initialization - C++"
date: 2025-12-03T11:16:56.752-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["C++"]
---
The Lazy Initialization pattern delays the creation of an expensive object until its first use. This improves performance by avoiding unnecessary initialization overhead, especially when the object might not even be needed during runtime. The code demonstrates this by creating a class with a computationally intensive initialization task. The `getInstance()` method checks if the instance has already been created; if not, it performs the initialization and stores the result for future use. This is thread-safe using a `std::mutex` to prevent race conditions during the first initialization.  It’s typical C++ to use a static member to hold the instance & a mutex for thread safety.

```cpp
#include <iostream>
#include <mutex>

class ExpensiveObject {
public:
    ExpensiveObject() {
        std::cout << "ExpensiveObject created..." << std::endl;
        // Simulate a costly initialization
        for (int i = 0; i < 1000000; ++i) {
            // Do some work here
        }
    }

    void doSomething() {
        std::cout << "ExpensiveObject doing something..." << std::endl;
    }

    static ExpensiveObject& getInstance() {
        std::lock_guard<std::mutex> lock(mutex_); //Thread safety
        if (!instance_) {
            instance_ = ExpensiveObject();
        }
        return instance_;
    }

private:
    static ExpensiveObject* instance_;
    static std::mutex mutex_;

    ExpensiveObject(const ExpensiveObject&) = delete;
    ExpensiveObject& operator=(const ExpensiveObject&) = delete;
};

// Initialize static members
ExpensiveObject* ExpensiveObject::instance_ = nullptr;
std::mutex ExpensiveObject::mutex_;

int main() {
    // The object is not created yet
    std::cout << "Before getInstance()" << std::endl;

    // The object is created and initialized only when getInstance() is called.
    ExpensiveObject& obj = ExpensiveObject::getInstance();

    obj.doSomething();

    // Subsequent calls to getInstance() return the existing instance.
    ExpensiveObject& sameObj = ExpensiveObject::getInstance();
    sameObj.doSomething();

    return 0;
}
```