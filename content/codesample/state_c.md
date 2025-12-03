---
title: "State - C"
date: 2025-12-03T13:29:29.639-05:00
draft: false
pattern_usage: ["State"]
language: ["C"]
---
The State pattern is a behavioral design pattern that allows an object to alter its behavior when its internal state changes. It encapsulates each state as a separate class, making it easier to add new states and manage complex conditional logic. This implementation uses function pointers to represent the state of a traffic light. Each state (Red, Yellow, Green) has a corresponding function pointer that defines its behavior – what action to take when the 'tick' method is called.  This approach is common in C due to its limited support for OOP features like inheritance. The structure and use of function pointers align with C's procedural style and efficient memory management.

```c
#include <stdio.h>

// Define the Traffic Light States
typedef enum {
  RED,
  YELLOW,
  GREEN
} TrafficLightState;

// Define the actions for each state
typedef void (*TrafficLightAction)(void);

// Declare the functions (forward declaration)
void redAction(void);
void yellowAction(void);
void greenAction(void);

// Traffic Light Structure
typedef struct {
  TrafficLightState state;
  TrafficLightAction action;
} TrafficLight;

// Initialize the Traffic Light
void trafficLightInit(TrafficLight *light, TrafficLightState initialState) {
  light->state = initialState;
  switch (initialState) {
    case RED:
      light->action = redAction;
      break;
    case YELLOW:
      light->action = yellowAction;
      break;
    case GREEN:
      light->action = greenAction;
      break;
  }
}

// 'Tick' the Traffic Light - transitions to next state.
void trafficLightTick(TrafficLight *light) {
  light->action(); // Perform action for the current state

  switch (light->state) {
    case RED:
      light->state = GREEN;
      light->action = greenAction;
      break;
    case GREEN:
      light->state = YELLOW;
      light->action = yellowAction;
      break;
    case YELLOW:
      light->state = RED;
      light->action = redAction;
      break;
  }
}

// State Actions
void redAction(void) {
  printf("Red Light: Stop!\n");
}

void yellowAction(void) {
  printf("Yellow Light: Caution!\n");
}

void greenAction(void) {
  printf("Green Light: Go!\n");
}

int main() {
  TrafficLight light;
  trafficLightInit(&light, RED);

  for (int i = 0; i < 5; i++) {
    trafficLightTick(&light);
    printf("Current State: %d\n", light.state);
  }

  return 0;
}
```