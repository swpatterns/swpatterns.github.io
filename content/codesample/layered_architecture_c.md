---
title: "Layered Architecture - C"
date: 2025-12-03T14:04:57.538-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["C"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the system easier to maintain, test, and evolve.  Typically, layers include a presentation layer (UI), a business logic layer, and a data access layer.  Our C example demonstrates this with `main.c` handling presentation (input/output), `business_logic.c` containing core functionality, and `data_access.c` interacting with a simple in-memory "database."  Headers define the interfaces between layers, hiding implementation details. This fits C’s modularity through header files and separate compilation.

```c
// data_access.h
#ifndef DATA_ACCESS_H
#define DATA_ACCESS_H

#include <stdio.h>

int get_data(int id, int *value);
int save_data(int id, int value);

#endif

// data_access.c
#include "data_access.h"
#include <stdlib.h>

#define MAX_DATA 10

static int data[MAX_DATA];
static int data_initialized = 0;

int get_data(int id, int *value) {
    if (!data_initialized) {
        // Initialize some dummy data
        for (int i = 0; i < MAX_DATA; i++) {
            data[i] = i * 2;
        }
        data_initialized = 1;
    }

    if (id >= 0 && id < MAX_DATA) {
        *value = data[id];
        return 0; // Success
    } else {
        return -1; // Failure
    }
}

int save_data(int id, int value) {
    if (id >= 0 && id < MAX_DATA) {
        data[id] = value;
        return 0; // Success
    } else {
        return -1; // Failure
    }
}

// business_logic.h
#ifndef BUSINESS_LOGIC_H
#define BUSINESS_LOGIC_H

int process_data(int id, int *result);

#endif

// business_logic.c
#include "business_logic.h"
#include "data_access.h"

int process_data(int id, int *result) {
    int value;
    if (get_data(id, &value) == 0) {
        *result = value * 2;
        return 0;
    } else {
        return -1;
    }
}

// main.c
#include <stdio.h>
#include "business_logic.h"

int main() {
    int id;
    int processed_value;

    printf("Enter an ID: ");
    scanf("%d", &id);

    if (process_data(id, &processed_value) == 0) {
        printf("Processed value for ID %d: %d\n", id, processed_value);
    } else {
        printf("Error processing data for ID %d\n", id);
    }

    return 0;
}
```