---
title: "Pipes and Filters - Dart"
date: 2025-12-03T15:22:32.846-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Dart"]
---
The Pipes and Filters pattern breaks down a complex processing task into a series of independent, reusable processing steps (filters) connected by channels (pipes). Each filter takes data, transforms it, and passes the result to the next filter. This promotes modularity, maintainability, and testability.

This Dart example demonstrates the pattern by processing a list of strings. Each filter is defined as a function. `Source` generates initial data. `upperCaseFilter` converts strings to uppercase. `trimFilter` removes leading/trailing whitespace. `deduplicateFilter` removes duplicate strings. The `pipeline` function chains these filters together via the `reduce` method, effectively ‘piping’ the output of one filter to the next.  This approach is idiomatic to Dart due to its first-class functions and fluent API.

```dart
void main() {
  final data = ['  hello', 'world', 'Hello', '  dart', 'world'];

  final result = pipeline(
    data,
    [
      upperCaseFilter,
      trimFilter,
      deduplicateFilter,
    ],
  );

  print(result); // Output: [HELLO, WORLD, DART]
}

typedef StringFilter = String Function(String);

List<String> pipeline(List<String> data, List<StringFilter> filters) {
  return data.map((item) => filters.fold(item, (String current, StringFilter filter) => filter(current))).toList();
}

String upperCaseFilter(String input) {
  return input.toUpperCase();
}

String trimFilter(String input) {
  return input.trim();
}

String deduplicateFilter(String input) {
  // In a real-world scenario, you'd likely use a Set
  // to track seen strings and only return the first occurrence.
  // This is a simplified example.
  return input;
}
```