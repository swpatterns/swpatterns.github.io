---
title: "Observer - C"
date: 2025-12-03T13:25:16.098-05:00
draft: false
pattern_usage: ["Observer"]
language: ["C"]
---
The Observer pattern defines a one-to-many dependency between objects. When one object (the subject) changes state, all its dependents (observers) are notified and updated automatically. This promotes loose coupling as subjects are unaware of specific observers.  The code uses function pointers to represent observers, and a vector to store them. The `notify_observers` function iterates through this vector, calling each observer function with the updated data. This approach is common in C to achieve event handling or callback mechanisms without complex object hierarchies, aligning with its procedural nature.

```c
#include <stdio.h>
#include <stdlib.h>
#include <vector.h>

// Define Observer function pointer type
typedef void (*observer_func)(int);

// Structure for the Subject
typedef struct {
    int state;
    vector_t *observers;
} Subject;

// Function to create a new subject
Subject* subject_create() {
    Subject *sub = (Subject*)malloc(sizeof(Subject));
    sub->state = 0;
    sub->observers = vector_create(sizeof(observer_func));
    return sub;
}

// Function to attach an observer
void subject_attach(Subject *sub, observer_func observer) {
    vector_push_back(sub->observers, &observer);
}

// Function to detach an observer
void subject_detach(Subject *sub, observer_func observer) {
    for (size_t i = 0; i < vector_size(sub->observers); ++i) {
        if (*(observer_func*)vector_at(sub->observers, i) == observer) {
            vector_erase(sub->observers, i);
            return;
        }
    }
}

// Function to set the subject's state and notify observers.
void subject_set_state(Subject *sub, int new_state) {
    sub->state = new_state;
    
    for (size_t i = 0; i < vector_size(sub->observers); ++i) {
        observer_func observer = *(observer_func*)vector_at(sub->observers, i);
        observer(new_state);
    }
}

// Example observer functions
void observer1(int state) {
    printf("Observer 1: State changed to %d\n", state);
}

void observer2(int state) {
    printf("Observer 2: State changed to %d\n", state);
}

// Main function (example usage)
int main() {
    Subject *subject = subject_create();

    subject_attach(subject, observer1);
    subject_attach(subject, observer2);

    subject_set_state(subject, 10);
    subject_set_state(subject, 20);

    subject_detach(subject, observer1);
    subject_set_state(subject, 30);

    vector_destroy(subject->observers);
    free(subject);

    return 0;
}
```