---
title: "Service Locator - C"
date: 2025-12-03T11:24:02.440-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["C"]
---
The Service Locator pattern provides a central point of access to dependencies, decoupling the client code from concrete implementations. Instead of directly creating or looking up dependencies, clients request them from a “locator” which handles the instantiation and management. This enhances modularity and testability, as dependencies can be easily swapped. 

The following C implementation uses a simple global structure acting as the locator. Functions `get_service()` retrieve services based on a string key.  A service registration function `register_service()` allows dependencies to be added.  This approach, while basic, aligns with C’s typical use of global state for configuration and dependency management, making it immediately understandable for C developers. It leans heavily on function pointers for flexibility.

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Define a service interface (function pointer)
typedef int (*MyServiceFunc)(int);

// Structure to hold service registration information
typedef struct {
  char* name;
  MyServiceFunc function;
} ServiceRegistration;


// Global Service Locator
static ServiceRegistration services[10]; // Limited to 10 services for simplicity
static int service_count = 0;

// Function to register a service
void register_service(const char* name, MyServiceFunc func) {
  if (service_count < 10) {
    services[service_count].name = strdup(name);
    services[service_count].function = func;
    service_count++;
  } else {
    fprintf(stderr, "Service Locator is full!\n");
  }
}

// Function to retrieve a service
MyServiceFunc get_service(const char* name) {
  for (int i = 0; i < service_count; ++i) {
    if (strcmp(services[i].name, name) == 0) {
      return services[i].function;
    }
  }
  return NULL; // Service not found
}

// Example Services
int service_one(int input) {
  return input * 2;
}

int service_two(int input) {
  return input + 5;
}

int main() {
  // Register the services
  register_service("one", service_one);
  register_service("two", service_two);
  
  // Retrieve the services
  MyServiceFunc svc1 = get_service("one");
  MyServiceFunc svc2 = get_service("two");

  if (svc1 && svc2) {
    printf("Service one(10) = %d\n", svc1(10));
    printf("Service two(10) = %d\n", svc2(10));
  } else {
    printf("Service not found!\n");
  }

  //cleanup (important when using strdup)
  for (int i = 0; i < service_count; ++i) {
    free(services[i].name);
  }
  
  return 0;
}
```