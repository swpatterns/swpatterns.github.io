---
title: "N-tier - C"
date: 2025-12-03T14:38:07.485-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["C"]
---
The N-tier pattern organizes an application into logical layers, each responsible for a specific aspect of the application. This improves maintainability, scalability, and reusability. A common breakdown is Presentation Tier (UI), Business Logic Tier, and Data Access Tier. This example simulates a simple address book using this pattern. The tiers are represented by separate functions which calls each other in a specific order (no actual files since C isn't inherently file-oriented for simple examples). The presentation tier handles input/output, the business tier processes requests, and the data tier (in this case, in-memory storage) manages data persistence. This structure, while basic in this C implementation, embodies the principle of separation of concerns.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Data Tier: In-memory address book
typedef struct {
  char name[50];
  char address[100];
} Address;

Address address_book[100];
int address_count = 0;

int data_tier_add_address(const char *name, const char *address) {
  if (address_count < 100) {
    strcpy(address_book[address_count].name, name);
    strcpy(address_book[address_count].address, address);
    address_count++;
    return 0; // Success
  }
  return -1; // Failure - address book full
}

char* data_tier_get_address(const char *name) {
  for (int i = 0; i < address_count; i++) {
    if (strcmp(address_book[i].name, name) == 0) {
      return address_book[i].address;
    }
  }
  return NULL; // Not found
}

// Business Logic Tier: Handles address book operations
int business_tier_add_address(const char *name, const char *address) {
  return data_tier_add_address(name, address);
}

char* business_tier_get_address(const char *name) {
  return data_tier_get_address(name);
}

// Presentation Tier: User interface
int main() {
  char name[50];
  char address[100];
  char *found_address;

  // Add an address
  printf("Enter name: ");
  scanf("%49s", name);
  printf("Enter address: ");
  scanf(" %99s", address);

  if (business_tier_add_address(name, address) == 0) {
    printf("Address added successfully.\n");
  } else {
    printf("Failed to add address. Address book full.\n");
  }

  // Retrieve an address
  printf("Enter name to search: ");
  scanf("%49s", name);

  found_address = business_tier_get_address(name);

  if (found_address != NULL) {
    printf("Address for %s: %s\n", name, found_address);
  } else {
    printf("Address not found for %s.\n", name);
  }

  return 0;
}
```