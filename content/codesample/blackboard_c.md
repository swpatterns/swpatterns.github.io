---
title: "Blackboard - C"
date: 2025-12-03T15:24:33.082-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["C"]
---
The Blackboard pattern is a computational architecture for solving complex problems by providing a shared data structure (the "blackboard") that multiple independent knowledge sources (KS) can access and modify. KSs react to changes on the blackboard, contributing to the solution without direct control over each other. This promotes flexibility and concurrency.

This C implementation demonstrates a basic Blackboard with an integer blackboard, a generator KS adding data, and a processor KS subtracting from it. Synchronization is handled with a mutex to prevent race conditions. The `blackboard_t` structure represents the blackboard and the KSs operate on it through defined function pointers. This structure and function pointer usage aligns well with C’s low-level control and callback mechanisms.

```c
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

// Define the Blackboard data
typedef struct {
    int data;
    pthread_mutex_t mutex;
} blackboard_t;

// Knowledge Source function pointer type
typedef void (*ks_func_t)(blackboard_t* blackboard);

// Knowledge Source: Generator - adds to the blackboard
void generator_ks(blackboard_t* blackboard) {
    pthread_mutex_lock(&blackboard->mutex);
    blackboard->data += 10;
    printf("Generator: Added 10, Blackboard data = %d\n", blackboard->data);
    pthread_mutex_unlock(&blackboard->mutex);
}

// Knowledge Source: Processor - subtracts from the blackboard
void processor_ks(blackboard_t* blackboard) {
    pthread_mutex_lock(&blackboard->mutex);
    blackboard->data -= 5;
    printf("Processor: Subtracted 5, Blackboard data = %d\n", blackboard->data);
    pthread_mutex_unlock(&blackboard->mutex);
}

int main() {
    blackboard_t blackboard = {0, PTHREAD_MUTEX_INITIALIZER};
    pthread_t gen_thread, proc_thread;

    // Create and start Knowledge Source threads
    pthread_create(&gen_thread, NULL, (void *(*)(void *))generator_ks, &blackboard);
    pthread_create(&proc_thread, NULL, (void *(*)(void *))processor_ks, &blackboard);

    // Let the threads run for a bit
    sleep(2);

    // Clean up
    pthread_join(gen_thread, NULL);
    pthread_join(proc_thread, NULL);
    pthread_mutex_destroy(&blackboard.mutex);

    return 0;
}
```