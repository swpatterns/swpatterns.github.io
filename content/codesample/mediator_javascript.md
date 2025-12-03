---
title: "Mediator - JavaScript"
date: 2025-12-03T13:14:20.207-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["JavaScript"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by preventing objects from referring to each other explicitly, and lets the mediation logic vary independently of the interacting classes. My code demonstrates this with a chatroom where users communicate through a `Chatroom` mediator. Users (concrete colleagues) don’t directly send messages to each other; they send messages *to* the chatroom, which then broadcasts them to all other users. This adheres to JavaScript's flexible object composition and event handling capabilities, using a simple object to manage communication instead of tightly coupled class dependencies.

```javascript
// Mediator Interface
class Chatroom {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    sendMessage(message, user) {
        this.broadcastMessage(message, user);
    }

    broadcastMessage(message, originUser) {
        this.users.forEach(user => {
            if (user !== originUser) {
                user.receive(message, originUser);
            }
        });
    }
}

// Colleague Interface
class User {
    constructor(name, chatroom) {
        this.name = name;
        this.chatroom = chatroom;
        this.chatroom.addUser(this);
    }

    sendMessage(message) {
        this.chatroom.sendMessage(message, this);
    }

    receive(message, originUser) {
        console.log(`${this.name} received from ${originUser.name}: ${message}`);
    }
}

// Example Usage
const chatroom = new Chatroom();
const alice = new User("Alice", chatroom);
const bob = new User("Bob", chatroom);
const charlie = new User("Charlie", chatroom);

alice.sendMessage("Hello, everyone!");
bob.sendMessage("Hi Alice, good to see you!");
charlie.sendMessage("Hey guys!");
```