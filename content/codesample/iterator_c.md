---
title: "Iterator - C"
date: 2025-12-03T13:11:29.514-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["C"]
---
The Iterator pattern provides a way to access the elements of an aggregate object (like an array or list) sequentially without exposing its underlying representation. It defines a standard interface for creating iterators, allowing clients to traverse different aggregate structures using the same iteration protocol. This code implements a simple integer array iterator using structures and function pointers. It's idiomatic C as it relies on explicit memory management, structs to bundle data/methods, and function pointers to achieve polymorphism without traditional object orientation. This approach keeps the code lightweight and performs well in C environments.

```c
#include <stdio.h>
#include <stdlib.h>

// Define the Iterator interface
typedef struct {
    int (*next)();
    int (*hasNext)();
} Iterator;

// Define the Aggregate (Integer Array)
typedef struct {
    int *data;
    int size;
    Iterator *iterator;
} IntegerArray;

// Create a new IntegerArray
IntegerArray* createIntegerArray(int *data, int size) {
    IntegerArray *arr = (IntegerArray*)malloc(sizeof(IntegerArray));
    if (arr == NULL) {
        return NULL;
    }
    arr->data = data;
    arr->size = size;
    arr->iterator = (Iterator*)malloc(sizeof(Iterator));
    if (arr->iterator == NULL) {
        free(arr);
        return NULL;
    }
    arr->iterator->next = integerArrayNext;
    arr->iterator->hasNext = integerArrayHasNext;
    return arr;
}

// Iterator specific functions
int integerArrayNext(IntegerArray *arr) {
    static int index = 0;
    if (index < arr->size) {
        return arr->data[index++];
    } else {
        return -1; // Or any other appropriate out-of-bounds indicator.
    }
}

int integerArrayHasNext(IntegerArray *arr) {
    static int index = 0;
    return index < arr->size;
}

// Example Usage
int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    IntegerArray *array = createIntegerArray(numbers, size);
    if (array == NULL) {
        printf("Failed to create IntegerArray.\n");
        return 1;
    }

    printf("Iterating over the array:\n");
    while (array->iterator->hasNext(array)) {
        printf("%d ", array->iterator->next(array));
    }
    printf("\n");

    free(array->iterator);
    free(array);

    return 0;
}
```