---
title: "Event-Driven Architecture - C"
date: 2025-12-03T14:53:01.131-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["C"]
---
The Event-Driven Architecture (EDA) decouples software components by allowing them to communicate through events. Components (event producers) emit events without knowing who will handle them, and other components (event consumers) subscribe to specific events and react accordingly. This promotes flexibility and scalability.

This C implementation uses function pointers as event handlers.  An `Event` struct holds event data, and a `Dispatcher` manages a list of handlers for each event type.  Producers call `dispatch_event`, and the dispatcher iterates through registered handlers, calling them with the event data. This approach avoids direct dependencies between components.  Using function pointers is a common and efficient way to achieve callback mechanisms in C, fitting its procedural nature.  Structs are used for data organization, also idiomatic.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Event Data
typedef struct {
  int event_type;
  void *data;
} Event;

// Event Handler Type
typedef void (*EventHandler)(Event *event);

// Dispatcher Structure
typedef struct {
  EventHandler handlers[10]; // Assuming a maximum of 10 handlers per type
  int num_handlers[10];
} Dispatcher;

// Function to register an event handler
void register_handler(Dispatcher *dispatcher, int event_type, EventHandler handler) {
  if (event_type >= 0 && event_type < 10) {
    dispatcher->handlers[event_type] = handler;
    dispatcher->num_handlers[event_type] = 1;
  }
}

// Function to dispatch an event
void dispatch_event(Dispatcher *dispatcher, Event *event) {
  if (event->event_type >= 0 && event->event_type < 10 && dispatcher->num_handlers[event->event_type] > 0) {
    dispatcher->handlers[event->event_type](event);
  }
}

// Example Event Handlers
void handle_sensor_data(Event *event) {
  int *sensor_value = (int *)event->data;
  printf("Sensor Data Received: %d\n", *sensor_value);
}

void handle_button_press(Event *event) {
  int *button_id = (int *)event->data;
  printf("Button Pressed: %d\n", *button_id);
}

int main() {
  Dispatcher dispatcher;
  for (int i = 0; i < 10; i++) {
    dispatcher.num_handlers[i] = 0;
  }

  // Register Handlers
  register_handler(&dispatcher, 0, handle_sensor_data); // Event type 0: Sensor Data
  register_handler(&dispatcher, 1, handle_button_press); // Event type 1: Button Press

  // Create and Dispatch Events
  Event sensor_event;
  sensor_event.event_type = 0;
  int sensor_value = 42;
  sensor_event.data = &sensor_value;
  dispatch_event(&dispatcher, &sensor_event);

  Event button_event;
  button_event.event_type = 1;
  int button_id = 5;
  button_event.data = &button_id;
  dispatch_event(&dispatcher, &button_event);

  return 0;
}
```