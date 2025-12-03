---
title: "Monolith - C++"
date: 2025-12-03T14:25:33.109-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["C++"]
---
The Monolith pattern refers to building an application as a single, unified unit. All functionalities and concerns are tightly coupled within a single codebase. This implementation demonstrates a basic example where all related operations – handling data, performing calculations, and displaying results – reside within the `Calculator` class and the `main` function. C++ naturally supports this pattern given its procedural and object-oriented nature, and it's a very common starting point for smaller applications. The tight coupling doesn’t aim for elegance here, rather to show the essence of everything being in one place.  No dependency management or modularity is specifically implemented, reflecting the core concept of the pattern.

```cpp
#include <iostream>
#include <string>
#include <stdexcept>

class Calculator {
public:
  Calculator() {}

  double add(double a, double b) {
    return a + b;
  }

  double subtract(double a, double b) {
    return a - b;
  }

  double multiply(double a, double b) {
    return a * b;
  }

  double divide(double a, double b) {
    if (b == 0) {
      throw std::runtime_error("Division by zero!");
    }
    return a / b;
  }

  void run() {
    std::string operation;
    double num1, num2;

    std::cout << "Enter an operation (+, -, *, /): ";
    std::cin >> operation;

    std::cout << "Enter two numbers: ";
    std::cin >> num1 >> num2;

    try {
      double result;
      if (operation == "+") {
        result = add(num1, num2);
      } else if (operation == "-") {
        result = subtract(num1, num2);
      } else if (operation == "*") {
        result = multiply(num1, num2);
      } else if (operation == "/") {
        result = divide(num1, num2);
      } else {
        std::cout << "Invalid operation." << std::endl;
        return;
      }

      std::cout << "Result: " << result << std::endl;
    } catch (const std::runtime_error& error) {
      std::cout << "Error: " << error.what() << std::endl;
    }
  }
};

int main() {
  Calculator calculator;
  calculator.run();
  return 0;
}
```