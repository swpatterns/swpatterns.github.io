---
title: "Singleton - C"
date: 2025-12-03T11:06:05.443-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["C"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources like configuration settings, logging, or database connections where multiple instances would be detrimental. The C implementation utilizes a static pointer to the single instance, initialized lazily upon the first call to a static access method. Thread safety isn’t explicitly addressed here for simplicity, but would require a mutex for production use. This approach is idiomatic C, leveraging static variables and function pointers for controlled instance creation and access.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int data;
} Singleton;

static Singleton *instance = NULL;

Singleton *getInstance() {
    if (instance == NULL) {
        instance = (Singleton *)malloc(sizeof(Singleton));
        if (instance == NULL) {
            perror("Failed to allocate memory for Singleton instance");
            exit(EXIT_FAILURE);
        }
        instance->data = 42; // Initialize the instance's data
        printf("Singleton instance created.\n");
    }
    return instance;
}

void cleanupSingleton() {
    if (instance != NULL) {
        free(instance);
        instance = NULL;
        printf("Singleton instance destroyed.\n");
    }
}

int main() {
    Singleton *s1 = getInstance();
    Singleton *s2 = getInstance();

    printf("s1->data: %d\n", s1->data);
    printf("s2->data: %d\n", s2->data);

    if (s1 == s2) {
        printf("Both pointers point to the same instance.\n");
    }

    cleanupSingleton();
    return 0;
}
```