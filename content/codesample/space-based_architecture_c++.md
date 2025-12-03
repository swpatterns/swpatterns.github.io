---
title: "Space-Based Architecture - C++"
date: 2025-12-03T14:57:44.110-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["C++"]
---
The Space-Based Architecture pattern decouples the data structures used by a system from the algorithms that operate on that data. Instead of tightly coupling data and methods within classes (like traditional OOP), it focuses on representing data as a collection of "spaces" – contiguous memory blocks – and providing separate functions to manipulate these spaces. This promotes flexibility, allows for easy addition of new algorithms without modifying data structures, and can improve performance through data locality.

The C++ example uses `std::vector` to represent the data spaces. Separate functions (`process_data`, `calculate_average`) operate on these vectors, taking them as input. This avoids class encapsulation of the data and algorithms, favoring a more functional approach where data is passed to functions for processing. Using vectors is idiomatic C++ for dynamic arrays and provides efficient contiguous storage, aligning with the pattern's emphasis on data locality.

```cpp
#include <iostream>
#include <vector>
#include <numeric> // For std::accumulate

// Data spaces (represented as vectors)
std::vector<int> data_space_1;
std::vector<int> data_space_2;

// Algorithm 1: Process data in a space
void process_data(std::vector<int>& space) {
  for (int& value : space) {
    value *= 2; // Example processing: double each value
  }
}

// Algorithm 2: Calculate the average of a space
double calculate_average(const std::vector<int>& space) {
  if (space.empty()) {
    return 0.0;
  }
  double sum = std::accumulate(space.begin(), space.end(), 0.0);
  return sum / space.size();
}

int main() {
  // Initialize data spaces
  data_space_1 = {1, 2, 3, 4, 5};
  data_space_2 = {6, 7, 8, 9, 10};

  // Process data in space 1
  process_data(data_space_1);

  // Calculate the average of space 2
  double average_space_2 = calculate_average(data_space_2);

  // Output results
  std::cout << "Data Space 1 (processed): ";
  for (int value : data_space_1) {
    std::cout << value << " ";
  }
  std::cout << std::endl;

  std::cout << "Average of Data Space 2: " << average_space_2 << std::endl;

  return 0;
}
```