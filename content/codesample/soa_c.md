---
title: "SOA - C"
date: 2025-12-03T14:48:13.712-05:00
draft: false
pattern_usage: ["SOA"]
language: ["C"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a specific business function and exposes it through a well-defined interface. This promotes modularity, reusability, and independent deployment.  The C implementation demonstrates this by defining separate source files for each service (e.g., data access, business logic), with header files defining the public interfaces. A central 'orchestrator' function coordinates calls to these services.  This approach, while not inherently object-oriented, leverages C's modularity through separate compilation and header-based interfaces, aligning with its procedural nature and emphasizing clear separation of concerns.

```c
// data_service.h
#ifndef DATA_SERVICE_H
#define DATA_SERVICE_H

#include <stdio.h>

// Define a data structure (example)
typedef struct {
    int id;
    char name[50];
} DataItem;

// Service interface: Data Access
DataItem* getData(int id);
int saveData(DataItem* item);

#endif

// data_service.c
#include "data_service.h"
#include <stdlib.h>
#include <string.h>

// In-memory data store (for simplicity)
static DataItem data[10];
static int dataCount = 0;

DataItem* getData(int id) {
    for (int i = 0; i < dataCount; i++) {
        if (data[i].id == id) {
            return &data[i];
        }
    }
    return NULL; // Not found
}

int saveData(DataItem* item) {
    if (dataCount < 10) {
        data[dataCount] = *item;
        dataCount++;
        return 0; // Success
    }
    return -1; // Failure: Data store full
}

// business_service.h
#ifndef BUSINESS_SERVICE_H
#define BUSINESS_SERVICE_H

#include "data_service.h"

// Service interface: Business Logic
int processData(int id);

#endif

// business_service.c
#include "business_service.h"
#include <stdio.h>

int processData(int id) {
    DataItem* item = getData(id);
    if (item != NULL) {
        printf("Processing data for ID: %d, Name: %s\n", item->id, item->name);
        return 0; // Success
    }
    return -1; // Failure: Data not found
}

// orchestrator.c
#include <stdio.h>
#include "business_service.h"

int main() {
    // Simulate data creation/setup
    DataItem newItem;
    newItem.id = 1;
    strcpy(newItem.name, "Example Data");
    saveData(&newItem);

    // Orchestrate a service call
    int result = processData(1);

    if (result == 0) {
        printf("Data processed successfully.\n");
    } else {
        printf("Data processing failed.\n");
    }

    return 0;
}
```