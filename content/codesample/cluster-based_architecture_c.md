---
title: "Cluster-based Architecture - C"
date: 2025-12-03T15:17:05.621-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["C"]
---
The Cluster-based Architecture pattern involves grouping similar components (clusters) to handle tasks, enhancing modularity and potential for parallelism. This example simulates a worker pool using a cluster of worker threads. A central task queue holds work items, and worker threads pull from the queue and process them. It provides a degree of concurrency without requiring complex thread management at the caller level. This structure mirrors a distributed system where clusters of servers handle related requests. C’s efficient memory management and direct thread control make it suitable for implementing such a low-level architecture. The use of a shared queue and mutex ensures thread-safe access to tasks.

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <string.h>

#define NUM_WORKERS 4
#define QUEUE_SIZE 10

typedef struct {
  int id;
  char* data;
} WorkItem;

WorkItem work_queue[QUEUE_SIZE];
int queue_head = 0;
int queue_tail = 0;
pthread_mutex_t queue_mutex;

void* worker_thread(void* arg) {
  int worker_id = *(int*)arg;
  WorkItem* item;

  while (1) {
    pthread_mutex_lock(&queue_mutex);
    if (queue_head != queue_tail) {
      item = &work_queue[queue_head++];
      pthread_mutex_unlock(&queue_mutex);

      printf("Worker %d processing item %d: %s\n", worker_id, item->id, item->data);
      free(item->data); // Free allocated data
      item->data = NULL;
    } else {
      pthread_mutex_unlock(&queue_mutex);
      // Queue is empty.  Sleep to avoid busy-waiting.  Better would be a condition variable.
      usleep(10000); // 10ms
    }
  }

  return NULL;
}


int main() {
  pthread_t workers[NUM_WORKERS];
  int worker_ids[NUM_WORKERS];

  pthread_mutex_init(&queue_mutex, NULL);

  // Create worker threads
  for (int i = 0; i < NUM_WORKERS; i++) {
    worker_ids[i] = i;
    if (pthread_create(&workers[i], NULL, worker_thread, &worker_ids[i]) != 0) {
      perror("Thread creation failed");
      return 1;
    }
  }

  // Add work to the queue
  for (int i = 0; i < 20; i++) {
    char* data = (char*)malloc(50);
    snprintf(data, 50, "Task %d data", i);

    pthread_mutex_lock(&queue_mutex);
    if ((queue_tail + 1) % QUEUE_SIZE == queue_head) {
      pthread_mutex_unlock(&queue_mutex);
      printf("Queue is full, dropping task %d\n", i);
      free(data);
      continue;
    }
    work_queue[queue_tail].id = i;
    work_queue[queue_tail].data = data;
    queue_tail = (queue_tail + 1) % QUEUE_SIZE;
    pthread_mutex_unlock(&queue_mutex);
    usleep(50000); // Add a small delay to simulate work creation rate
  }

  // Allow workers to finish (in a real system, you'd have a proper shutdown mechanism)
  sleep(5);


  pthread_mutex_destroy(&queue_mutex);
  return 0;
}
```