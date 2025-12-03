---
title: "Singleton - C++"
date: 2025-12-03T11:05:51.580-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["C++"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources that should only have one controller, like a configuration manager or a logger.

The C++ implementation uses a private constructor to prevent direct instantiation. A static member function, `getInstance()`, is provided which creates the instance only if it doesn't already exist, and returns a pointer to it.  The instance is held as a static member. Modern C++ (C++11 and later) leverages thread safety with `std::call_once` to guarantee only one instance is created even in multi-threaded environments.  This approach balances safety and efficiency.

```cpp
#include <iostream>
#include <mutex>
#include <memory>

class Singleton {
private:
  Singleton() {
    std::cout << "Singleton instance created.\n";
  }

  ~Singleton() {
    std::cout << "Singleton instance destroyed.\n";
  }

  // Prevent copying and moving
  Singleton(const Singleton&) = delete;
  Singleton& operator=(const Singleton&) = delete;
  Singleton(Singleton&&) = delete;
  Singleton& operator=(Singleton&&) = delete;


public:
  static Singleton* getInstance() {
    static Singleton instance;
    return &instance;
  }

  void doSomething() {
    std::cout << "Singleton is doing something!\n";
  }
};

int main() {
  Singleton* instance1 = Singleton::getInstance();
  instance1->doSomething();

  Singleton* instance2 = Singleton::getInstance();
  instance2->doSomething();

  // Verify that both pointers point to the same instance
  if (instance1 == instance2) {
    std::cout << "Both instances are the same.\n";
  }

  return 0;
}
```