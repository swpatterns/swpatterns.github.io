---
title: "Message Broker - C"
date: 2025-12-03T15:08:19.484-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["C"]
---
The Message Broker pattern decouples application components by enabling them to communicate via asynchronous messages. A central message broker receives messages from publishers and routes them to appropriate subscribers. This promotes scalability, fault tolerance, and flexibility.

The C implementation uses a simple circular buffer as the message queue and function pointers to represent publishers and subscribers.  A `message_broker_t` struct manages the queue and registration of callbacks.  `publish()` adds a message to the queue, and a separate thread (or polling loop) calls registered subscriber functions when messages are available. This approach avoids busy-waiting and allows components to operate independently.  Using function pointers is a common C technique for achieving callback-based event handling, fitting the language's procedural nature.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>

#define QUEUE_SIZE 10

typedef void (*subscriber_callback_t)(const char *message);

typedef struct {
    subscriber_callback_t subscribers[10];
    int subscriber_count;
    char queue[QUEUE_SIZE][256];
    int head;
    int tail;
    pthread_mutex_t mutex;
} message_broker_t;

message_broker_t *message_broker_create() {
    message_broker_t *broker = (message_broker_t *)malloc(sizeof(message_broker_t));
    if (broker) {
        broker->subscriber_count = 0;
        broker->head = 0;
        broker->tail = 0;
        pthread_mutex_init(&broker->mutex, NULL);
    }
    return broker;
}

void message_broker_subscribe(message_broker_t *broker, subscriber_callback_t callback) {
    if (broker && callback && broker->subscriber_count < 10) {
        pthread_mutex_lock(&broker->mutex);
        broker->subscribers[broker->subscriber_count++] = callback;
        pthread_mutex_unlock(&broker->mutex);
    }
}

void message_broker_publish(message_broker_t *broker, const char *message) {
    if (broker && message) {
        pthread_mutex_lock(&broker->mutex);
        strcpy(broker->queue[broker->tail], message);
        broker->tail = (broker->tail + 1) % QUEUE_SIZE;
        pthread_mutex_unlock(&broker->mutex);
    }
}

void *message_broker_worker(void *arg) {
    message_broker_t *broker = (message_broker_t *)arg;
    while (1) {
        pthread_mutex_lock(&broker->mutex);
        if (broker->head != broker->tail) {
            char message[256];
            strcpy(message, broker->queue[broker->head]);
            broker->head = (broker->head + 1) % QUEUE_SIZE;
            pthread_mutex_unlock(&broker->mutex);

            for (int i = 0; i < broker->subscriber_count; i++) {
                broker->subscribers[i](message);
            }
        } else {
            pthread_mutex_unlock(&broker->mutex);
            usleep(100000); // Sleep for 100ms to avoid busy-waiting
        }
    }
    return NULL;
}

void message_broker_destroy(message_broker_t *broker) {
    if (broker) {
        pthread_mutex_destroy(&broker->mutex);
        free(broker);
    }
}

// Example Subscribers
void subscriber1(const char *message) {
    printf("Subscriber 1 received: %s\n", message);
}

void subscriber2(const char *message) {
    printf("Subscriber 2 received: %s\n", message);
}

int main() {
    message_broker_t *broker = message_broker_create();

    message_broker_subscribe(broker, subscriber1);
    message_broker_subscribe(broker, subscriber2);

    pthread_t worker_thread;
    pthread_create(&worker_thread, NULL, message_broker_worker, broker);

    // Publish some messages
    message_broker_publish(broker, "Hello, world!");
    message_broker_publish(broker, "This is a test message.");
    message_broker_publish(broker, "Another message for subscribers.");

    sleep(2); // Let the messages be processed

    message_broker_destroy(broker);
    pthread_join(worker_thread, NULL);

    return 0;
}
```