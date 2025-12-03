---
title: "Strategy - C"
date: 2025-12-03T13:33:55.446-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["C"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows selecting an algorithm at runtime without modifying the client code. This implementation achieves this by defining a function pointer type `Operation` representing the strategy. Different operation functions (e.g., addition, subtraction) conform to this type. A `Calculator` struct holds a pointer to the current `Operation` strategy and a data context.  Changing the strategy is done by assigning a different function to the `operation` member of the `Calculator`. This is idiomatic C as it leverages function pointers for flexibility and avoids complex object hierarchies, keeping the code lightweight and performant.

```c
#include <stdio.h>

// Define the strategy interface (function pointer type)
typedef int (*Operation)(int a, int b);

// Concrete strategies
int add(int a, int b) {
  return a + b;
}

int subtract(int a, int b) {
  return a - b;
}

int multiply(int a, int b) {
  return a * b;
}

// Context
typedef struct {
  Operation operation;
  int data; // Example data context
} Calculator;

// Function to set the operation (strategy)
void setOperation(Calculator *calculator, Operation op) {
  calculator->operation = op;
}

// Function to perform the calculation using the current strategy
int calculate(Calculator *calculator, int b) {
  return calculator->operation(calculator->data, b);
}

int main() {
  Calculator calc;
  calc.data = 10;

  // Set the strategy to addition
  setOperation(&calc, add);
  printf("10 + 5 = %d\n", calculate(&calc, 5));

  // Change the strategy to subtraction
  setOperation(&calc, subtract);
  printf("10 - 5 = %d\n", calculate(&calc, 5));

  //Change the strategy to multiply.
  setOperation(&calc, multiply);
  printf("10 * 5 = %d\n", calculate(&calc, 5));

  return 0;
}
```