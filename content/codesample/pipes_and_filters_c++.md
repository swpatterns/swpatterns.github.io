---
title: "Pipes and Filters - C++"
date: 2025-12-03T15:20:29.379-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["C++"]
---
The Pipes and Filters pattern is a design pattern where a series of processing units (filters) are connected by channels (pipes). Each filter performs a specific transformation on its input and passes the result to the next filter through a pipe. This promotes modularity, reusability, and simplifies complex processing pipelines.

This C++ example demonstrates the pattern by creating filters for converting a string to uppercase, removing spaces, and checking for a palindrome. Each filter is a function taking an `std::string` and returning an `std::string`. These functions are chained together using `std::functional::bind` and `std::for_each` to pass the string through the pipeline. The use of functions as first-class citizens with `std::bind` and the standard library `std::for_each` showcases idiomatic C++ functional programming style and enables a clean, composable solution.

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <functional>

// Filters
std::string to_uppercase(const std::string& input) {
  std::string result = input;
  std::transform(result.begin(), result.end(), result.begin(), ::toupper);
  return result;
}

std::string remove_spaces(const std::string& input) {
  std::string result;
  std::remove_copy_if(input.begin(), input.end(), std::back_inserter(result), ::isspace);
  return result;
}

bool is_palindrome(const std::string& input) {
  std::string reversed_input = input;
  std::reverse(reversed_input.begin(), reversed_input.end());
  return input == reversed_input;
}

int main() {
  std::string input = "Race car";

  // Define the processing pipeline
  auto pipeline = [&to_uppercase, &remove_spaces, &is_palindrome](const std::string& input_str) {
    std::string stage1 = to_uppercase(input_str);
    std::string stage2 = remove_spaces(stage1);
    return is_palindrome(stage2);
  };
  
  // Execute the pipeline
  bool result = pipeline(input);
  std::cout << "Is '" << input << "' a palindrome? " << (result ? "Yes" : "No") << std::endl;

  return 0;
}
```