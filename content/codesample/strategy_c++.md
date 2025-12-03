---
title: "Strategy - C++"
date: 2025-12-03T13:33:37.223-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["C++"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. This is achieved by having a context class that holds a strategy object and delegates work to it.

The C++ code implements this using an abstract `AlgorithmStrategy` base class, defining a pure virtual `execute` method. Concrete strategies like `SortAscending` and `SortDescending` inherit from this and provide their own implementations. The `DataProcessor` class (the context) accepts an `AlgorithmStrategy` through its constructor and uses it to process data. Using polymorphism is idiomatic C++ for implementing this, allowing the DataProcessor to work with any concrete strategy without knowing its specific type, promoting loose coupling and extensibility.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

// Abstract Strategy
class AlgorithmStrategy {
public:
  virtual void execute(std::vector<int>& data) = 0;
  virtual ~AlgorithmStrategy() = default;
};

// Concrete Strategies
class SortAscending : public AlgorithmStrategy {
public:
  void execute(std::vector<int>& data) override {
    std::sort(data.begin(), data.end());
  }
};

class SortDescending : public AlgorithmStrategy {
public:
  void execute(std::vector<int>& data) override {
    std::sort(data.begin(), data.end(), std::greater<int>());
  }
};

// Context
class DataProcessor {
private:
  AlgorithmStrategy* strategy;

public:
  DataProcessor(AlgorithmStrategy* strategy) : strategy(strategy) {}

  void processData(std::vector<int>& data) {
    if (strategy) {
      strategy->execute(data);
    }
  }

  void setStrategy(AlgorithmStrategy* newStrategy) {
    delete strategy;
    strategy = newStrategy;
  }
};

int main() {
  std::vector<int> data = {5, 2, 8, 1, 9};

  DataProcessor processor(new SortAscending());
  processor.processData(data);
  std::cout << "Ascending: ";
  for (int x : data) {
    std::cout << x << " ";
  }
  std::cout << std::endl;

  processor.setStrategy(new SortDescending());
  processor.processData(data);
  std::cout << "Descending: ";
  for (int x : data) {
    std::cout << x << " ";
  }
  std::cout << std::endl;

  return 0;
}
```