---
title: "Extension Object - C"
date: 2025-12-03T12:53:25.756-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["C"]
---
The Extension Object pattern allows adding new functionality to an existing object without modifying its core code. This is achieved by creating a separate "extension" object that holds the new functionality and operates on the original object. The original object typically exposes a minimal interface for the extension to interact with. In C, this is often implemented using function pointers or a structure containing function pointers, allowing the extension to override or augment the original object's behavior. This approach promotes modularity and avoids the fragility of directly modifying existing code.

```c
#include <stdio.h>
#include <stdlib.h>

// Original Object
typedef struct {
  int value;
  void (*operation)(struct OriginalObject *, int);
} OriginalObject;

void defaultOperation(OriginalObject *self, int operand) {
  printf("Default Operation: Value = %d, Operand = %d\n", self->value, operand);
  self->value += operand;
}

// Extension Interface
typedef struct {
  void (*extendedOperation)(OriginalObject *self, int);
} Extension;

// Concrete Extension
void customOperation(OriginalObject *self, int operand) {
  printf("Custom Operation: Value = %d, Operand = %d\n", self->value, operand);
  self->value *= operand;
}

// Function to apply the extension
void applyExtension(OriginalObject *obj, Extension *ext) {
  if (ext && ext->extendedOperation) {
    obj->operation = ext->extendedOperation;
  }
}

int main() {
  OriginalObject obj = {10, defaultOperation};
  Extension ext = {customOperation};

  printf("Initial Value: %d\n", obj.value);

  // Use default operation
  obj.operation(&obj, 5);
  printf("Value after default operation: %d\n", obj.value);

  // Apply the extension
  applyExtension(&obj, &ext);

  // Use extended operation
  obj.operation(&obj, 3);
  printf("Value after custom operation: %d\n", obj.value);

  return 0;
}
```