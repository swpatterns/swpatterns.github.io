---
title: "Mediator - Java"
date: 2025-12-03T13:13:46.033-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Java"]
---
The Mediator pattern defines a centralized object that encapsulates the interaction between multiple objects. Instead of objects interacting directly, they communicate through the mediator. This promotes loose coupling, allowing changes in one object to have minimal impact on others.

The Java implementation uses an abstract `Mediator` interface defining a `send` method for communication. Concrete `Mediator` classes manage the interactions. `Colleague` classes (like `ChatRoom` in this example) know their mediator but not other colleagues.  Communication happens by colleagues sending messages to the mediator, which then directs them appropriately. This approach leverages Java’s interfaces and class structure for clear separation of concerns and fits well with OOP principles, making the code maintainable and extensible.

```java
// Mediator Pattern in Java

import java.util.ArrayList;
import java.util.List;

// Abstract Mediator
interface ChatMediator {
    void sendMessage(String msg, User user);
    void addUser(User user);
}

// Concrete Mediator
class ConcreteChatMediator implements ChatMediator {
    private List<User> users;

    public ConcreteChatMediator() {
        this.users = new ArrayList<>();
    }

    @Override
    public void sendMessage(String msg, User user) {
        for (User u : users) {
            if (u != user) {
                u.receive(msg);
            }
        }
    }

    @Override
    public void addUser(User user) {
        users.add(user);
    }
}

// Abstract Colleague
interface User {
    void send(String msg);
    void receive(String msg);
}

// Concrete Colleague
class ConcreteUser implements User {
    private ChatMediator mediator;
    private String name;

    public ConcreteUser(ChatMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }

    @Override
    public void send(String msg) {
        System.out.println(name + ": Sending " + msg);
        mediator.sendMessage(msg, this);
    }

    @Override
    public void receive(String msg) {
        System.out.println(name + ": Received " + msg);
    }
}

// Example Usage
public class MediatorExample {
    public static void main(String[] args) {
        ChatMediator mediator = new ConcreteChatMediator();

        User user1 = new ConcreteUser(mediator, "Alice");
        User user2 = new ConcreteUser(mediator, "Bob");
        User user3 = new ConcreteUser(mediator, "Charlie");

        mediator.addUser(user1);
        mediator.addUser(user2);
        mediator.addUser(user3);

        user1.send("Hello, everyone!");
        user2.send("Hi Alice!");
    }
}
```