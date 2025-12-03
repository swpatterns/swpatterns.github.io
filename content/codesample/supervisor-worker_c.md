---
title: "Supervisor-Worker - C"
date: 2025-12-03T15:36:29.754-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["C"]
---
The Supervisor-Worker pattern distributes tasks to multiple worker threads managed by a supervisor thread. The supervisor creates and manages a pool of worker threads, assigns them tasks via a queue, and handles results or errors. This improves responsiveness and utilizes multi-core processors.

The C implementation uses POSIX threads (pthreads) for concurrency. A shared queue (implemented using a simple linked list and mutex/condition variable for synchronization) holds tasks. The supervisor thread adds tasks to the queue, and worker threads continuously attempt to dequeue and execute them.  The task structure contains a function pointer and its arguments, allowing for flexible task execution.  This approach is common in C for managing threads and shared resources, prioritizing explicit synchronization for safety and performance.

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

// Task structure
typedef struct {
    void (*function)(void*);
    void* argument;
} Task;

// Queue node
typedef struct QueueNode {
    Task task;
    struct QueueNode* next;
} QueueNode;

// Queue structure
typedef struct {
    QueueNode* head;
    QueueNode* tail;
    pthread_mutex_t mutex;
    pthread_cond_t cond;
} Queue;

// Initialize the queue
void queueInit(Queue* queue) {
    queue->head = NULL;
    queue->tail = NULL;
    pthread_mutex_init(&queue->mutex, NULL);
    pthread_cond_init(&queue->cond, NULL);
}

// Add a task to the queue
void queueAdd(Queue* queue, Task task) {
    pthread_mutex_lock(&queue->mutex);
    QueueNode* newNode = (QueueNode*)malloc(sizeof(QueueNode));
    if (newNode) {
        newNode->task = task;
        newNode->next = NULL;
        if (queue->tail) {
            queue->tail->next = newNode;
        } else {
            queue->head = newNode;
        }
        queue->tail = newNode;
        pthread_cond_signal(&queue->cond); // Signal a waiting worker
    }
    pthread_mutex_unlock(&queue->mutex);
}

// Remove a task from the queue
Task queueRemove(Queue* queue) {
    pthread_mutex_lock(&queue->mutex);
    while (!queue->head) {
        pthread_cond_wait(&queue->cond, &queue->mutex); // Wait for a task
    }
    QueueNode* temp = queue->head;
    Task task = temp->task;
    queue->head = queue->head->next;
    if (!queue->head) {
        queue->tail = NULL;
    }
    free(temp);
    pthread_mutex_unlock(&queue->mutex);
    return task;
}

// Worker thread function
void* workerThread(void* arg) {
    Queue* queue = (Queue*)arg;
    while (1) {
        Task task = queueRemove(queue);
        task.function(task.argument);
    }
    return NULL;
}

// Example task function
void printMessage(void* message) {
    printf("Worker: %s\n", (char*)message);
    sleep(1); // Simulate work
}

int main() {
    Queue queue;
    queueInit(&queue);

    const int numWorkers = 3;
    pthread_t workers[numWorkers];

    // Create worker threads
    for (int i = 0; i < numWorkers; i++) {
        pthread_create(&workers[i], NULL, workerThread, &queue);
    }

    // Add tasks from the supervisor
    for (int i = 0; i < 5; i++) {
        char message[20];
        snprintf(message, sizeof(message), "Message %d", i);
        Task task = {printMessage, (void*)message};
        queueAdd(&queue, task);
    }

    // Wait for worker threads to finish (in this example, they run indefinitely)
    for (int i = 0; i < numWorkers; i++) {
        pthread_join(workers[i], NULL);
    }

    return 0;
}
```