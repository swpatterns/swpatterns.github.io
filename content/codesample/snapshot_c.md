---
title: "Snapshot - C"
date: 2025-12-03T14:01:04.285-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["C"]
---
The Snapshot pattern captures and stores the internal state of an object at a specific point in time, allowing for restoration to that state later. This is useful for implementing undo/redo functionality, checkpoints, or transaction rollback. The C implementation uses a struct to hold the object's state and functions to take and apply snapshots.  It's idiomatic C because it relies on explicit memory management and struct-based data representation, common practices in the language, avoiding complex object hierarchies or dynamic dispatch where unnecessary.  The `take_snapshot` function copies the relevant data into a new snapshot struct, and `restore_snapshot` copies the data back from the snapshot to the original object.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Original object
typedef struct {
  int value;
  char *data;
} MyObject;

// Snapshot struct
typedef struct {
  int value;
  char *data;
} MyObjectSnapshot;

// Function to create a new MyObject
MyObject *create_my_object(int initial_value, const char *initial_data) {
  MyObject *obj = (MyObject *)malloc(sizeof(MyObject));
  if (obj == NULL) {
    perror("Failed to allocate memory for MyObject");
    exit(EXIT_FAILURE);
  }
  obj->value = initial_value;
  obj->data = (char *)strdup(initial_data); // Duplicate the string
  if (obj->data == NULL) {
    perror("Failed to duplicate data string");
    free(obj);
    exit(EXIT_FAILURE);
  }
  return obj;
}

// Function to take a snapshot of the object
MyObjectSnapshot *take_snapshot(const MyObject *obj) {
  MyObjectSnapshot *snapshot = (MyObjectSnapshot *)malloc(sizeof(MyObjectSnapshot));
  if (snapshot == NULL) {
    perror("Failed to allocate memory for MyObjectSnapshot");
    exit(EXIT_FAILURE);
  }
  snapshot->value = obj->value;
  snapshot->data = (char *)strdup(obj->data); // Duplicate the string
  if (snapshot->data == NULL) {
    perror("Failed to duplicate data string");
    free(snapshot);
    exit(EXIT_FAILURE);
  }
  return snapshot;
}

// Function to restore the object from a snapshot
void restore_snapshot(MyObject *obj, const MyObjectSnapshot *snapshot) {
  obj->value = snapshot->value;
  free(obj->data); // Free existing data
  obj->data = (char *)strdup(snapshot->data); // Duplicate snapshot data
  if (obj->data == NULL) {
    perror("Failed to duplicate data string");
    exit(EXIT_FAILURE);
  }
}

// Function to free the object and its snapshot
void free_my_object(MyObject *obj) {
  free(obj->data);
  free(obj);
}

void free_my_object_snapshot(MyObjectSnapshot *snapshot) {
  free(snapshot->data);
  free(snapshot);
}

int main() {
  MyObject *obj = create_my_object(10, "Initial Data");
  printf("Original Object: value = %d, data = %s\n", obj->value, obj->data);

  MyObjectSnapshot *snapshot = take_snapshot(obj);

  obj->value = 20;
  obj->data = "Modified Data";
  printf("Modified Object: value = %d, data = %s\n", obj->value, obj->data);

  restore_snapshot(obj, snapshot);
  printf("Restored Object: value = %d, data = %s\n", obj->value, obj->data);

  free_my_object_snapshot(snapshot);
  free_my_object(obj);

  return 0;
}
```