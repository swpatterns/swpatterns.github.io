---
title: "Space-Based Architecture - C"
date: 2025-12-03T14:58:06.433-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["C"]
---
The Space-Based Architecture (SBA) pattern decouples application logic from the execution environment by defining a set of independent "spaces" that contain the necessary resources (data, configuration, etc.) for a specific task.  A "space handler" manages these spaces, providing access to the required resources. This promotes modularity, testability, and allows for easy swapping of implementations.

The C implementation uses opaque pointers to represent spaces and a function pointer table (the `space_handler`) to encapsulate space-specific operations.  This avoids exposing the underlying space data structure directly.  The `create_space`, `get_space_data`, and `destroy_space` functions demonstrate the core SBA principles.  Using function pointers is a common C idiom for achieving polymorphism and decoupling.  The structure-based approach to defining the space handler aligns with C's preference for explicit memory management and data organization.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Opaque space pointer
typedef struct space_t *space_ptr;

// Space data (example)
typedef struct {
  int value;
  char *message;
} space_data_t;

// Function pointer type for space handler
typedef struct {
  space_ptr (*create)(int initial_value, const char *initial_message);
  space_data_t* (*get_data)(space_ptr space);
  void (*destroy)(space_ptr space);
} space_handler_t;

// Concrete Space Implementation
struct space_t {
  space_data_t data;
};

// Space Handler Functions
space_ptr create_space(int initial_value, const char *initial_message) {
  space_ptr space = (space_ptr)malloc(sizeof(struct space_t));
  if (space == NULL) {
    perror("Failed to allocate space");
    return NULL;
  }
  space->data.value = initial_value;
  space->data.message = strdup(initial_message); // Duplicate the string
  if (space->data.message == NULL) {
    perror("Failed to duplicate message");
    free(space);
    return NULL;
  }
  return space;
}

space_data_t* get_space_data(space_ptr space) {
  if (space == NULL) {
    return NULL;
  }
  return &(space->data);
}

void destroy_space(space_ptr space) {
  if (space != NULL) {
    free(space->data.message);
    free(space);
  }
}

// Example Usage
int main() {
  space_handler_t handler = {
    .create = create_space,
    .get_data = get_space_data,
    .destroy = destroy_space
  };

  space_ptr my_space = handler.create(42, "Hello, Space!");
  space_data_t* data = handler.get_data(my_space);

  if (data != NULL) {
    printf("Value: %d\n", data->value);
    printf("Message: %s\n", data->message);
  }

  handler.destroy(my_space);

  return 0;
}
```