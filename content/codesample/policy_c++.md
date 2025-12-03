---
title: "Policy - C++"
date: 2025-12-03T13:56:14.514-05:00
draft: false
pattern_usage: ["Policy"]
language: ["C++"]
---
The Policy pattern allows you to decouple algorithms from the specific ways they perform certain steps (policies). These policies are then injected into the algorithm, enabling runtime variation of behavior without modifying the algorithm itself. This promotes flexibility and reusability.

The C++ example demonstrates a `DataProcessor` class that takes a `LoggingPolicy` as a parameter in its constructor. The `LoggingPolicy` is an abstract class with a single method, `logMessage()`.  Concrete policies like `ConsoleLogger` and `FileLogger` implement this method to log messages to the console or a file, respectively. The `DataProcessor` uses the injected policy to log data processing events. This is idiomatic C++ due to its use of polymorphism via abstract classes and dependency injection, avoiding tight coupling and enabling easy extension with new logging mechanisms.

```cpp
#include <iostream>
#include <fstream>
#include <string>

// Policy Interface
class LoggingPolicy {
public:
  virtual void logMessage(const std::string& message) = 0;
  virtual ~LoggingPolicy() = default;
};

// Concrete Policy 1: Console Logger
class ConsoleLogger : public LoggingPolicy {
public:
  void logMessage(const std::string& message) override {
    std::cout << "[Console] " << message << std::endl;
  }
};

// Concrete Policy 2: File Logger
class FileLogger : public LoggingPolicy {
private:
  std::ofstream logFile;

public:
  FileLogger(const std::string& filename) : logFile(filename, std::ios::app) {}

  void logMessage(const std::string& message) override {
    logFile << "[File] " << message << std::endl;
  }

  ~FileLogger() {
    logFile.close();
  }
};

// Context Class (Algorithm)
class DataProcessor {
private:
  LoggingPolicy* loggingPolicy;

public:
  DataProcessor(LoggingPolicy* policy) : loggingPolicy(policy) {}

  void processData(const std::string& data) {
    loggingPolicy->logMessage("Processing data: " + data);
    // Simulate data processing
    std::cout << "Data processed: " << data << std::endl;
  }

  ~DataProcessor() {
    delete loggingPolicy;
  }
};

int main() {
  // Use Console Logger
  DataProcessor processor1(new ConsoleLogger());
  processor1.processData("Sample Data 1");

  // Use File Logger
  DataProcessor processor2(new FileLogger("data_log.txt"));
  processor2.processData("Sample Data 2");

  return 0;
}
```