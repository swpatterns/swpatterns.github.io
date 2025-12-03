---
title: "Multiton - C"
date: 2025-12-03T11:09:29.218-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["C"]
---
The Multiton pattern ensures a limited number of instances of a class are created, and provides a global access point to each of those instances. It's a relaxed version of the Singleton pattern, allowing for more concurrency or logical separation. This C implementation uses a static array to hold the instances, indexed by an enum.  A check within the instance creation function prevents exceeding the defined number of multiton instances. It’s a relatively straightforward approach in C, relying on static storage and a simple instantiation control mechanism. Using an enum for the instances is a common C practice for creating named constants.

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Define the maximum number of instances
#define MAX_INSTANCES 3

// Enum to represent the different instances
typedef enum {
  INSTANCE_ONE,
  INSTANCE_TWO,
  INSTANCE_THREE
} InstanceType;

// Structure for the Multiton class
typedef struct {
  int data;
  bool is_initialized;
} Multiton;

// Static array to hold the instances
static Multiton instances[MAX_INSTANCES];

// Function to get an instance of the Multiton
Multiton* get_instance(InstanceType type) {
  if (type >= MAX_INSTANCES) {
    fprintf(stderr, "Invalid instance type!\n");
    return NULL;
  }

  if (!instances[type].is_initialized) {
    instances[type].data = type + 1; // Initialize with some data
    instances[type].is_initialized = true;
  }

  return &instances[type];
}

int main() {
  Multiton* instance1 = get_instance(INSTANCE_ONE);
  Multiton* instance2 = get_instance(INSTANCE_TWO);
  Multiton* instance3 = get_instance(INSTANCE_THREE);

  if (instance1) {
    printf("Instance 1 data: %d\n", instance1->data);
  }
  if (instance2) {
    printf("Instance 2 data: %d\n", instance2->data);
  }
  if (instance3) {
    printf("Instance 3 data: %d\n", instance3->data);
  }

    //Demonstrate that subsequent calls return the same instance
  Multiton* instance1_again = get_instance(INSTANCE_ONE);
  if (instance1_again == instance1) {
    printf("Instance 1 re-obtained.  Pointers are equal.\n");
  }

  return 0;
}
```