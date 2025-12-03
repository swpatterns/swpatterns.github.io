---
title: "Lazy Initialization - C"
date: 2025-12-03T11:17:13.486-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["C"]
---
The Lazy Initialization pattern delays the creation of an expensive object until it's actually needed. This improves performance if the object is not always used. The implementation uses a pointer initialized to NULL. The first time the object is requested, the pointer is checked for NULL. If it is, the object is created and the pointer is updated. Subsequent calls return the already created object. This C implementation avoids unnecessary initialization at program start and fits the typical C style of manual memory management and pointer usage for resource efficiency.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int data;
    // More complex data/functionality could go here
} ExpensiveObject;

ExpensiveObject *create_expensive_object() {
    ExpensiveObject *obj = (ExpensiveObject *)malloc(sizeof(ExpensiveObject));
    if (obj != NULL) {
        obj->data = 42; // Simulate some initialization work
        printf("Expensive object created!\n");
    }
    return obj;
}

ExpensiveObject *get_expensive_object() {
    static ExpensiveObject *obj = NULL;
    if (obj == NULL) {
        obj = create_expensive_object();
    }
    return obj;
}

int main() {
    // Object is not created yet
    printf("First call to get_expensive_object()\n");
    ExpensiveObject *instance1 = get_expensive_object();
    printf("Data in instance1: %d\n", instance1->data);

    printf("Second call to get_expensive_object()\n");
    ExpensiveObject *instance2 = get_expensive_object();
    printf("Data in instance2: %d\n", instance2->data);

    // Both pointers will point to the same object,
    // after the first instantiation.

    return 0;
}
```