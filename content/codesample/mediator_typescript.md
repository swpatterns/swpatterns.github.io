---
title: "Mediator - TypeScript"
date: 2025-12-03T13:14:38.999-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["TypeScript"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by preventing objects from referring to each other explicitly, and instead, they communicate through the mediator.  Our code represents a simple chatroom where users can send and receive messages. The `Chatroom` class is the mediator, managing communication between `User` objects. Users only know the mediator, not other users.  This implementation uses TypeScript's type system and class-based structure to maintain clear interfaces and relationships, fitting an object-oriented approach appropriate for the language and the pattern's intent of managing object interactions.

```typescript
// Mediator interface
interface ChatMediator {
  sendMessage(message: string, user: User): void;
  addUser(user: User): void;
}

// Concrete Mediator
class Chatroom implements ChatMediator {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(message: string, user: User): void {
    for (const u of this.users) {
      if (u !== user) {
        u.receive(message);
      }
    }
  }
}

// Colleague interface
interface ChatUser {
  sendMessage(message: string): void;
  receive(message: string): void;
}

// Concrete Colleague
class User implements ChatUser {
  private mediator: ChatMediator;
  private name: string;

  constructor(mediator: ChatMediator, name: string) {
    this.mediator = mediator;
    this.name = name;
    mediator.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(`${this.name}: ${message}`);
    this.mediator.sendMessage(message, this);
  }

  receive(message: string): void {
    console.log(`${this.name} received: ${message}`);
  }
}

// Usage
const chatroom = new Chatroom();
const alice = new User(chatroom, "Alice");
const bob = new User(chatroom, "Bob");
const charlie = new User(chatroom, "Charlie");

alice.sendMessage("Hello everyone!");
bob.sendMessage("Hi Alice!");
charlie.sendMessage("Hey guys, what's up?");
```