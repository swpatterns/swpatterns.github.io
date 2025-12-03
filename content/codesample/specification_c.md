---
title: "Specification - C"
date: 2025-12-03T13:51:48.474-05:00
draft: false
pattern_usage: ["Specification"]
language: ["C"]
---
The Specification pattern is a functional approach to defining complex data validation or filtering rules. It encapsulates these rules as objects, allowing for dynamic combination and reuse. This implementation uses function pointers to represent the specifications, making it lightweight and idiomatic for C.  The `spec_and`, `spec_or`, and `spec_not` functions combine specifications, while the `spec_match` function applies a specification to a given data item.  This avoids the need for complex object hierarchies common in OOP languages, fitting C's procedural nature.  The example demonstrates checking if a number is positive, even, and within a range.

```c
#include <stdio.h>
#include <stdbool.h>

// Specification type: a function pointer that takes an int and returns a bool
typedef bool (*Specification)(int);

// Define individual specifications
bool is_positive(int value) {
    return value > 0;
}

bool is_even(int value) {
    return value % 2 == 0;
}

bool is_in_range(int value) {
    return value >= 10 && value <= 20;
}

// Combine specifications
Specification spec_and(Specification spec1, Specification spec2) {
    return (Specification)(^(int value) { return spec1(value) && spec2(value); });
}

Specification spec_or(Specification spec1, Specification spec2) {
    return (Specification)(^(int value) { return spec1(value) || spec2(value); });
}

Specification spec_not(Specification spec) {
    return (Specification)(^(int value) { return !spec(value); });
}

// Apply a specification to a value
bool spec_match(Specification spec, int value) {
    return spec(value);
}

int main() {
    // Create a combined specification: positive AND even AND in range 10-20
    Specification combined_spec = spec_and(is_positive, spec_and(is_even, is_in_range));

    int test_values[] = {5, 12, 15, -8, 22};
    int num_values = sizeof(test_values) / sizeof(test_values[0]);

    for (int i = 0; i < num_values; i++) {
        printf("%d matches: %s\n", test_values[i], spec_match(combined_spec, test_values[i]) ? "true" : "false");
    }

    return 0;
}
```