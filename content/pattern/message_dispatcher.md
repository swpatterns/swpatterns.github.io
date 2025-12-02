
---
title: Message Dispatcher
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "event-driven"]
wikipedia: "https://en.wikipedia.org/wiki/Dispatcher_(programming)"
diagramtype: "class"
diagram: "[Client] --|> [Dispatcher]
[Dispatcher] --|> [EventHandler1]: handles EventTypeA
[Dispatcher] --|> [EventHandler2]: handles EventTypeB
[Dispatcher] --|> [EventHandler3]: handles EventTypeC
[EventHandler1] ..> [Event]
[EventHandler2] ..> [Event]
[EventHandler3] ..> [Event]"
code: true
---

The Message Dispatcher pattern decouples the sender of a message (or event) from its receiver(s). A central dispatcher component receives messages and routes them to the appropriate handler(s) based on message type or content. This promotes loose coupling, allowing new handlers to be added without modifying the existing dispatcher or clients.

This pattern is particularly useful in event-driven architectures, GUI frameworks, and systems where different components need to react to specific occurrences without direct knowledge of each other. It centralizes event handling logic and simplifies the management of complex interactions.

## Usage

*   **Event Handling in GUI Frameworks:** Modern GUI frameworks like React, Angular, and Vue.js heavily rely on event dispatchers to handle user interactions (clicks, key presses, etc.). Components emit events, and the framework's dispatcher routes them to the relevant event listeners.
*   **Messaging Systems:** Message queues (like RabbitMQ, Kafka, or AWS SQS) function as message dispatchers, routing messages between producers and consumers based on exchange names and routing keys.
*   **Microservices Communication:** In a microservices architecture, a message dispatcher can act as a message broker, coordinating communication between services by routing events or commands.
*   **Decoupling Business Logic:**  When you want to separate triggering an action from the execution of that action, a message dispatcher allows you to define 'commands' (messages) that are then handled by specific components.

## Examples

*   **Node.js `EventEmitter`:**  Node.js's built-in `EventEmitter` class is a classic example of a message dispatcher.  Components can `emit` events, and other components can `on` (subscribe to) specific event types.  The `EventEmitter` handles the routing and ensures event listeners are notified.

    javascript
    const EventEmitter = require('events');

    class MyEmitter extends EventEmitter {}

    const myEmitter = new MyEmitter();

    myEmitter.on('eventA', (arg1, arg2) => {
      console.log('Event A received with arguments:', arg1, arg2);
    });

    myEmitter.emit('eventA', 'hello', 123);
    

*   **Spring's ApplicationEventPublisher:** In the Spring Framework (Java), the `ApplicationEventPublisher` interface allows components to publish application events.  These events are then dispatched to any registered `ApplicationEventListener` beans that are interested in them.

    java
    @Component
    public class MyEventPublisher {

        @Autowired
        private ApplicationEventPublisher eventPublisher;

        public void publishEvent(String message) {
            eventPublisher.publishEvent(new MyEvent(message));
        }
    }

    @Component
    public class MyEventListener implements ApplicationListener<MyEvent> {

        @Override
        public void onApplicationEvent(MyEvent event) {
            System.out.println("Received event: " + event.getMessage());
        }
    }
    



