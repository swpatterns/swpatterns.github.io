---
title: "Publish-Subscribe - Java"
date: 2025-12-03T15:27:05.697-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Java"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) from message receivers (subscribers). Publishers emit messages to a topic without knowing who, if anyone, is listening. Subscribers express interest in specific topics and receive messages published to those topics. This promotes loose coupling and scalability.

This Java implementation uses the `java.util.Observable` and `java.util.Observer` classes. `Observable` acts as the message broker (subject), and `Observer` represents the subscribers.  Publishers call `notifyObservers()` with the message, and Observers' `update()` method is invoked if they've registered interest via `subscribe()`. This approach is idiomatic Java for simple Pub/Sub scenarios, leveraging built-in classes for event management.  More complex implementations might use libraries like Guava EventBus or reactive frameworks.

```java
import java.util.Observable;
import java.util.Observer;
import java.util.ArrayList;
import java.util.List;

// Observable (Subject/Message Broker)
class EventManager extends Observable {
    private List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        if (!observers.contains(observer)) {
            addObserver(observer);
            observers.add(observer);
        }
    }

    public void unsubscribe(Observer observer) {
        observers.remove(observer);
        deleteObserver(observer);
    }

    public void publish(String message) {
        setChanged(); // Indicate a change of state
        notifyObservers(message); // Notify all observers
    }
}

// Observer (Subscriber)
interface EventListener extends Observer {
    void onEvent(String message);
}

class ConcreteListener implements EventListener {
    private String listenerName;

    public ConcreteListener(String name) {
        this.listenerName = name;
    }

    @Override
    public void update(Observable o, Object arg) {
        onEvent((String) arg);
    }

    @Override
    public void onEvent(String message) {
        System.out.println(listenerName + " received: " + message);
    }
}

// Publisher
public class PubSubExample {
    public static void main(String[] args) {
        EventManager eventManager = new EventManager();

        ConcreteListener listener1 = new ConcreteListener("Listener 1");
        ConcreteListener listener2 = new ConcreteListener("Listener 2");

        eventManager.subscribe(listener1);
        eventManager.subscribe(listener2);

        eventManager.publish("Hello, Pub/Sub!");
        eventManager.publish("Another event!");

        eventManager.unsubscribe(listener2);

        eventManager.publish("Event after unsubscribe.");
    }
}
```