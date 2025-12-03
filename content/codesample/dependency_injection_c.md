---
title: "Dependency Injection - C"
date: 2025-12-03T11:20:21.834-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["C"]
---
The Dependency Injection (DI) pattern aims to reduce coupling between software components by providing dependencies from the outside rather than having a component create them itself. This promotes modularity, testability, and maintainability.  Our C implementation uses function pointers to achieve this. A 'service' (e.g., a logging function) is represented by a function pointer, which is then injected into the component that needs it. This avoids hardcoding dependencies within the component. The use of function pointers is a common and efficient way to manage callbacks and dependencies in C, aligning with its procedural nature and direct memory manipulation capabilities.

```c
#include <stdio.h>

// Service interface (logging)
typedef void (*LogService)(const char *message);

// Component that depends on the logging service
typedef struct {
  LogService log;
} MyComponent;

// Initialize the component with a logging service
MyComponent *createComponent(LogService log) {
  MyComponent *component = (MyComponent *)malloc(sizeof(MyComponent));
  if (component) {
    component->log = log;
  }
  return component;
}

// Component's method that uses the injected dependency
void doSomething(MyComponent *component, const char *data) {
  if (component && component->log) {
    component->log("Processing data: %s", data);
  }
}

// Concrete logging service 1: Console logger
void consoleLogger(const char *message) {
  printf("[Console] %s\n", message);
}

// Concrete logging service 2: File logger (example placeholder)
void fileLogger(const char *message) {
  fprintf(stderr, "[File] %s\n", message); // Replace with actual file logging
}

int main() {
  // Inject console logger
  MyComponent *component1 = createComponent(consoleLogger);
  doSomething(component1, "Important data");
  free(component1);

  // Inject file logger
  MyComponent *component2 = createComponent(fileLogger);
  doSomething(component2, "Error message");
  free(component2);
  
  return 0;
}
```