---
title: "Message Broker - Java"
date: 2025-12-03T15:06:18.018-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Java"]
---
The Message Broker pattern decouples application components by enabling asynchronous communication through a central message store. Components don't directly interact; instead, they publish messages to the broker, and other components subscribe to receive messages of interest. This promotes scalability, resilience, and flexibility.

This Java implementation uses a simple in-memory `MessageBroker` class to store and deliver messages.  `Publisher` components publish messages with a topic, and `Subscriber` components register for specific topics. When a message is published, the broker iterates through its subscribers and delivers the message to those interested in the topic.  Using interfaces (`Publisher`, `Subscriber`) allows for loose coupling and easy extension.  The use of `java.util.HashMap` and `java.util.ArrayList` are standard Java collections for this purpose, making the code idiomatic.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

interface Publisher {
    void publish(String topic, String message);
}

interface Subscriber {
    void receive(String topic, String message);
}

class MessageBroker {
    private final Map<String, List<Subscriber>> subscribers = new HashMap<>();

    public void subscribe(String topic, Subscriber subscriber) {
        subscribers.computeIfAbsent(topic, k -> new ArrayList<>()).add(subscriber);
    }

    public void unsubscribe(String topic, Subscriber subscriber) {
        subscribers.getOrDefault(topic, new ArrayList<>()).remove(subscriber);
    }

    public void publish(String topic, String message) {
        subscribers.getOrDefault(topic, new ArrayList<>())
                .forEach(subscriber -> subscriber.receive(topic, message));
    }
}

class ConcreteSubscriber implements Subscriber {
    private final String name;

    public ConcreteSubscriber(String name) {
        this.name = name;
    }

    @Override
    public void receive(String topic, String message) {
        System.out.println(name + " received on topic " + topic + ": " + message);
    }
}

public class MessageBrokerExample {
    public static void main(String[] args) {
        MessageBroker broker = new MessageBroker();

        ConcreteSubscriber sub1 = new ConcreteSubscriber("Subscriber 1");
        ConcreteSubscriber sub2 = new ConcreteSubscriber("Subscriber 2");

        broker.subscribe("news", sub1);
        broker.subscribe("news", sub2);
        broker.subscribe("sports", sub1);

        Publisher publisher = broker::publish;
        publisher.publish("news", "Breaking news: Java is awesome!");
        publisher.publish("sports", "Local team wins championship!");
    }
}
```