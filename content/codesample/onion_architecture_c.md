---
title: "Onion Architecture - C"
date: 2025-12-03T14:13:41.737-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["C"]
---
The Onion Architecture aims for loose coupling and testability by organizing code into concentric layers. The innermost layer represents the core business logic (Entities), independent of any external concerns. Surrounding layers define Use Cases (application-specific business rules), Interface Adapters (translators like controllers and gateways), and finally, the infrastructure details (databases, UI). Dependencies point inwards; the core doesn’t know about the UI, but the UI knows about the core.  This example simplifies this with a focus on separation and dependency inversion, as a full onion architecture is complex to represent concisely in C without frameworks.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// --- Core: Entities ---
typedef struct {
  int id;
  char name[50];
} Entity;

int create_entity(const char *name, Entity **new_entity) {
  *new_entity = (Entity *)malloc(sizeof(Entity));
  if (*new_entity == NULL) return 0;
  (*new_entity)->id = rand(); // Simulate ID generation
  strncpy((*new_entity)->name, name, sizeof((*new_entity)->name) - 1);
  (*new_entity)->name[sizeof((*new_entity)->name) - 1] = '\0'; // Ensure null termination
  return 1;
}

void free_entity(Entity *entity) {
  free(entity);
}


// --- Use Cases ---
typedef struct {
  void (*process_entity)(Entity *); // Function pointer for the use case
} UseCase;

void print_entity_details(Entity *entity) {
  printf("Entity ID: %d, Name: %s\n", entity->id, entity->name);
}

UseCase entity_printer_use_case = { .process_entity = print_entity_details };

void execute_use_case(UseCase use_case, Entity *entity) {
  use_case.process_entity(entity);
}


// --- Interface Adapters (Controller) ---
typedef struct {
  UseCase use_case;
} Controller;

void handle_entity_request(Controller *controller, const char *entity_name) {
  Entity *entity;
  if (create_entity(entity_name, &entity)) {
    execute_use_case(controller->use_case, entity);
    free_entity(entity);
  } else {
    printf("Failed to create entity.\n");
  }
}

// --- Infrastructure (Main) ---
int main() {
  srand(12345); // Seed for random ID

  Controller printer_controller = { .use_case = entity_printer_use_case };

  handle_entity_request(&printer_controller, "Example Entity");

  return 0;
}
```