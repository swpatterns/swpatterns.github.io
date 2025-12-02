
---
title: Mediator
date: 2024-02-29T16:52:37-00:00
draft: false
pattern_types: ["behavioral", "communication"]
wikipedia: https://en.wikipedia.org/wiki/Mediator_pattern
diagramtype: "class"
diagram: "[Mediator] -- [Colleague A] : communicates\n[Mediator] -- [Colleague B] : communicates\n[Colleague A] -- [Colleague B] : knows not\n[ConcreteMediator] --|> [Mediator]\n[Colleague A] --|> [Colleague]\n[Colleague B] --|> [Colleague]"
code: true
---

The Mediator pattern defines an object that encapsulates how a set of objects interact. This mediator promotes loose coupling by preventing objects from referring to each other explicitly and lets the mediation logic vary independently of the interacting objects.  Instead of components communicating directly, they communicate through the mediator, which handles the interactions.

## Usage

The Mediator pattern is particularly useful when you have a complex set of objects that interact in many different ways. It helps to centralize the control logic, making the system easier to understand, maintain, and extend. Common scenarios include:

*   **Chat applications:** A chat room acts as a mediator between multiple users, handling message distribution.
*   **Air traffic control:** The control tower mediates communication between airplanes to prevent collisions.
*   **Graphical User Interfaces (GUIs):** A window manager can act as a mediator between different UI elements, handling events and updates.
*   **Complex workflows:** When a system needs to orchestrate a series of dependent operations, a mediator can manage the flow of control.

## Examples

1.  **Node.js Event Emitter:**  The Node.js `EventEmitter` class can be seen as a simple mediator. Components subscribe to events (through `on()`) and the emitter handles dispatching those events to the appropriate listeners (through `emit()`). Components don’t need to know about each other; they just interact with the `EventEmitter`.

    javascript
    const EventEmitter = require('events');

    class Mediator extends EventEmitter {
      notify(event, data) {
        this.emit(event, data);
      }
    }

    class ComponentA {
      constructor(mediator) {
        this.mediator = mediator;
        mediator.on('eventB', (data) => {
          console.log('Component A received eventB:', data);
        });
      }

      doSomething() {
        this.mediator.notify('eventA', 'Data from A');
      }
    }

    class ComponentB {
      constructor(mediator) {
        this.mediator = mediator;
        mediator.on('eventA', (data) => {
          console.log('Component B received eventA:', data);
        });
      }

      doSomethingElse() {
        this.mediator.notify('eventB', 'Data from B');
      }
    }

    const mediator = new Mediator();
    const componentA = new ComponentA(mediator);
    const componentB = new ComponentB(mediator);

    componentA.doSomething();
    componentB.doSomethingElse();
    

2.  **Android Message Queues (Handler):** In Android development, the `Handler` class and its associated message queues function as a mediator between different threads (especially the UI thread and background threads). A background thread can send messages to the UI thread via a `Handler`, without the background thread needing direct access to UI elements or knowing their implementation details.

    java
    // Simplified example - In a real Android app, Handlers are more complex
    public class Mediator {
        private final Handler uiHandler;

        public Mediator(Handler uiHandler) {
            this.uiHandler = uiHandler;
        }

        public void sendMessage(String message) {
            uiHandler.post(() -> {
                // Update UI with the message
                System.out.println("UI Thread received: " + message);
            });
        }
    }

    public class BackgroundTask {
        private final Mediator mediator;

        public BackgroundTask(Mediator mediator) {
            this.mediator = mediator;
        }

        public void doWork() {
            // Simulate some work
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            mediator.sendMessage("Work completed!");
        }
    }
    