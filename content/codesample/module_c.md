---
title: "Module - C"
date: 2025-12-03T12:50:14.735-05:00
draft: false
pattern_usage: ["Module"]
language: ["C"]
---
The Module pattern encapsulates data and functionality within a single unit, exposing only a well-defined interface. This promotes code organization, reduces global namespace pollution, and enhances maintainability. In C, this is achieved through header files (.h) declaring the public interface and source files (.c) implementing the private details.  The header file acts as the module's public face, while the source file contains the implementation and static variables/functions, ensuring they are not directly accessible from outside the module. This example demonstrates a simple counter module.

```c
// counter.h
#ifndef COUNTER_H
#define COUNTER_H

// Public interface
typedef struct Counter Counter;
Counter* counter_create();
void counter_increment(Counter* counter);
int counter_get_value(const Counter* counter);
void counter_destroy(Counter* counter);

#endif // COUNTER_H

// counter.c
#include "counter.h"
#include <stdlib.h>

struct Counter {
    int value;
    // Private data - not exposed in the header
};

Counter* counter_create() {
    Counter* counter = (Counter*)malloc(sizeof(Counter));
    if (counter != NULL) {
        counter->value = 0;
    }
    return counter;
}

void counter_increment(Counter* counter) {
    if (counter != NULL) {
        counter->value++;
    }
}

int counter_get_value(const Counter* counter) {
    if (counter != NULL) {
        return counter->value;
    }
    return -1; // Or some other error indicator
}

void counter_destroy(Counter* counter) {
    if (counter != NULL) {
        free(counter);
    }
}

// main.c (Example Usage)
#include <stdio.h>
#include "counter.h"

int main() {
    Counter* my_counter = counter_create();
    if (my_counter == NULL) {
        fprintf(stderr, "Failed to create counter\n");
        return 1;
    }

    counter_increment(my_counter);
    counter_increment(my_counter);

    printf("Counter value: %d\n", counter_get_value(my_counter));

    counter_destroy(my_counter);
    return 0;
}
```