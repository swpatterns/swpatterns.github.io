---
title: "Master-Slave - C"
date: 2025-12-03T15:32:36.262-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["C"]
---
The Master-Slave pattern involves one thread (the master) delegating tasks to multiple other threads (slaves) and then combining the results. This example uses POSIX threads (pthreads) in C to implement this. The `master_thread` function creates a pool of worker threads (`slave_threads`). Each worker thread executes the `slave_function`, processing a portion of a data array. The master waits for all slaves to complete and then aggregates their partial results into a final result. This implementation is idiomatic C as it leverages low-level threading primitives for explicit control and efficiency, common in systems programming contexts where C excels.

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define NUM_SLAVES 4
#define DATA_SIZE 100

typedef struct {
    int thread_id;
    int *data;
    int start;
    int end;
    int *partial_sum;
} SlaveArgs;

void *slave_function(void *arg) {
    SlaveArgs *args = (SlaveArgs *)arg;
    int sum = 0;
    for (int i = args->start; i < args->end; i++) {
        sum += args->data[i];
    }
    *(args->partial_sum) = sum;
    pthread_exit(NULL);
}

int main() {
    int data[DATA_SIZE];
    for (int i = 0; i < DATA_SIZE; i++) {
        data[i] = i + 1;
    }

    pthread_t slave_threads[NUM_SLAVES];
    int partial_sums[NUM_SLAVES];
    SlaveArgs args[NUM_SLAVES];
    int chunk_size = DATA_SIZE / NUM_SLAVES;

    for (int i = 0; i < NUM_SLAVES; i++) {
        args[i].thread_id = i;
        args[i].data = data;
        args[i].start = i * chunk_size;
        args[i].end = (i == NUM_SLAVES - 1) ? DATA_SIZE : (i + 1) * chunk_size;
        args[i].partial_sum = &partial_sums[i];
        pthread_create(&slave_threads[i], NULL, slave_function, (void *)&args[i]);
    }

    int total_sum = 0;
    for (int i = 0; i < NUM_SLAVES; i++) {
        pthread_join(slave_threads[i], NULL);
        total_sum += partial_sums[i];
    }

    printf("Total sum: %d\n", total_sum);

    return 0;
}
```