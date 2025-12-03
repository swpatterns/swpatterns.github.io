---
title: "Module - C++"
date: 2025-12-03T12:50:00.789-05:00
draft: false
pattern_usage: ["Module"]
language: ["C++"]
---
The Module Pattern aims to encapsulate functionality within a self-contained unit, controlling exposure to the outside world through a public API. This promotes code organization, avoids global namespace pollution, and enables reusability. In C++, this is best achieved using namespaces and carefully designed header files that define the public interface. Private implementation details are kept within `.cpp` files, inaccessible directly from outside the module. This example demonstrates a simple `Math` module with private helper functions and a public method for calculating the factorial.

```cpp
// Math.h - Public Interface
#ifndef MATH_H
#define MATH_H

namespace Math {
  /**
   * @brief Calculates the factorial of a non-negative integer.
   *
   * @param n The input integer.
   * @return The factorial of n.  Returns 1 for n = 0.
   * @throws std::invalid_argument if n is negative.
   */
  int factorial(int n);
} // namespace Math

#endif // MATH_H

// Math.cpp - Private Implementation
#include "Math.h"
#include <stdexcept>

namespace Math {
  // Private helper function for factorial calculation
  static int factorialHelper(int n) {
    if (n == 0) {
      return 1;
    }
    return n * factorialHelper(n - 1);
  }

  int factorial(int n) {
    if (n < 0) {
      throw std::invalid_argument("Factorial is not defined for negative numbers.");
    }
    return factorialHelper(n);
  }
} // namespace Math

// main.cpp - Usage Example
#include <iostream>
#include "Math.h"

int main() {
  try {
    std::cout << "Factorial of 5: " << Math::factorial(5) << std::endl;
    std::cout << "Factorial of 0: " << Math::factorial(0) << std::endl;
    // std::cout << Math::factorialHelper(5) << std::endl; // This would cause a compile error
    std::cout << "Factorial of -1: ";
    Math::factorial(-1);
  } catch (const std::invalid_argument& e) {
    std::cerr << "Error: " << e.what() << std::endl;
  }
  return 0;
}
```