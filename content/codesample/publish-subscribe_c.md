---
title: "Publish-Subscribe - C"
date: 2025-12-03T15:28:49.914-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["C"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) from message receivers (subscribers). Publishers announce events without knowing who or how many subscribers exist. Subscribers express interest in one or more events, and only receive notifications for those they've subscribed to. This implementation uses a simple linked list to store subscribers for each event type (represented as strings). A central `EventManager` manages subscriptions and dispatches events to the appropriate subscribers. C’s function pointers are used to represent subscriber callbacks, allowing for generic event handling. This approach avoids tight coupling and promotes extensibility.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Define a subscriber callback function type
typedef void (*event_callback)(void *data);

// Define a structure for a subscriber
typedef struct subscriber {
  event_callback callback;
  void *data;
  struct subscriber *next;
} subscriber_t;

// Define the event manager
typedef struct event_manager {
  subscriber_t *subscribers[1024]; // Array to hold subscribers for each event
} event_manager_t;

// Create a new event manager
event_manager_t *event_manager_create() {
  event_manager_t *manager = (event_manager_t *)malloc(sizeof(event_manager_t));
  if (manager) {
    for (int i = 0; i < 1024; i++) {
      manager->subscribers[i] = NULL;
    }
  }
  return manager;
}

// Subscribe to an event
void event_manager_subscribe(event_manager_t *manager, const char *event, event_callback callback, void *data) {
  int hash = (int)strlen(event) % 1024;
  subscriber_t *new_subscriber = (subscriber_t *)malloc(sizeof(subscriber_t));
  if (new_subscriber) {
    new_subscriber->callback = callback;
    new_subscriber->data = data;
    new_subscriber->next = manager->subscribers[hash];
    manager->subscribers[hash] = new_subscriber;
  }
}

// Unsubscribe from an event
void event_manager_unsubscribe(event_manager_t *manager, const char *event, event_callback callback) {
    int hash = (int)strlen(event) % 1024;
    subscriber_t *current = manager->subscribers[hash];
    subscriber_t *prev = NULL;

    while (current) {
        if (current->callback == callback) {
            if (prev) {
                prev->next = current->next;
            } else {
                manager->subscribers[hash] = current->next;
            }
            free(current);
            return;
        }
        prev = current;
        current = current->next;
    }
}

// Publish an event
void event_manager_publish(event_manager_t *manager, const char *event, void *data) {
  int hash = (int)strlen(event) % 1024;
  subscriber_t *current = manager->subscribers[hash];
  while (current) {
    current->callback(data);
    current = current->next;
  }
}

// Free the event manager and all its subscribers
void event_manager_free(event_manager_t *manager) {
  for (int i = 0; i < 1024; i++) {
    subscriber_t *current = manager->subscribers[i];
    while (current) {
      subscriber_t *next = current->next;
      free(current);
      current = next;
    }
  }
  free(manager);
}

// Example usage
void log_event(void *data) {
  printf("Event received: %s, Data: %s\n", (char *)data, (char *)data);
}

int main() {
  event_manager_t *manager = event_manager_create();

  event_manager_subscribe(manager, "user.created", log_event, "User created event");
  event_manager_subscribe(manager, "user.created", log_event, "Another user created event");
  event_manager_subscribe(manager, "order.placed", log_event, "Order placed event");

  event_manager_publish(manager, "user.created", "User data");
  event_manager_publish(manager, "order.placed", "Order details");

  event_manager_free(manager);

  return 0;
}
```