---
title: "Policy - C"
date: 2025-12-03T13:56:28.992-05:00
draft: false
pattern_usage: ["Policy"]
language: ["C"]
---
The Policy pattern allows you to define a family of algorithms (policies) and encapsulate each one into a separate class. It then allows the client to choose which algorithm to use at runtime without knowing the details of its implementation. This promotes loose coupling and flexibility.

Here, we define a `data_t` structure and a `process_data` function that takes a pointer to this structure and a policy function pointer.  Different policies (e.g., `square_policy`, `double_policy`) are implemented as functions that conform to the `data_policy` type. The client code can then select and apply a policy to the data without modifying the core processing logic. This approach is idiomatic C as it leverages function pointers to achieve polymorphism and avoids the complexities of C++ style virtual functions.

```c
#include <stdio.h>

// The data structure to be processed
typedef struct {
  int value;
} data_t;

// Define a function pointer type for the policy
typedef int (*data_policy)(const data_t *data);

// Policy 1: Square the value
int square_policy(const data_t *data) {
  return data->value * data->value;
}

// Policy 2: Double the value
int double_policy(const data_t *data) {
  return data->value * 2;
}

// Function to process the data using a given policy
int process_data(const data_t *data, data_policy policy) {
  return policy(data);
}

int main() {
  data_t my_data = {5};

  // Apply the square policy
  int squared_value = process_data(&my_data, square_policy);
  printf("Squared value: %d\n", squared_value);

  // Apply the double policy
  int doubled_value = process_data(&my_data, double_policy);
  printf("Doubled value: %d\n", doubled_value);

  return 0;
}
```