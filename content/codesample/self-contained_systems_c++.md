---
title: "Self-contained Systems - C++"
date: 2025-12-03T14:29:23.606-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["C++"]
---
The Self-Contained System pattern aims to minimize dependencies between components by encapsulating all necessary resources within a single unit. This promotes modularity, testability, and reusability. Here, we demonstrate this with a simple `Logger` class that manages its own output stream.  Instead of relying on a global stream or passing one in, the logger creates and uses its own `ofstream`. This makes the logger independent and easier to reason about. The implementation uses RAII (Resource Acquisition Is Initialization) with the `ofstream` to ensure the file is properly closed when the `Logger` object goes out of scope, a common and preferred C++ practice for resource management.

```cpp
#include <iostream>
#include <fstream>
#include <string>

class Logger {
public:
  Logger(const std::string& filename) : file_(filename) {
    if (!file_.is_open()) {
      std::cerr << "Error opening log file: " << filename << std::endl;
    }
  }

  void log(const std::string& message) {
    if (file_.is_open()) {
      file_ << message << std::endl;
      file_.flush(); // Ensure immediate writing
    }
  }

  ~Logger() {
    if (file_.is_open()) {
      file_.close();
    }
  }

private:
  std::ofstream file_;
};

int main() {
  Logger logger("application.log");
  logger.log("Application started.");
  logger.log("Performing some operation...");

  return 0;
}
```