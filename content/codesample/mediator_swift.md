---
title: "Mediator - Swift"
date: 2025-12-03T13:16:55.080-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Swift"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by having objects communicate through the mediator, rather than directly with each other. This makes it easier to change the objects' interactions without modifying those objects themselves.

In this Swift example, `ChatMediator` acts as the mediator, managing communication between `User` instances.  Users don't know about each other directly; they only interact via the `send` method of the mediator.  This implementation uses a protocol (`ChatMediatorProtocol`) for dependency injection and testability. Swift’s use of protocols and a centralized mediator aligns with its emphasis on clear interfaces and controlled dependencies.  Structs are used for `User` as they appropriately represent value types.

```swift
// Define the Mediator Protocol
protocol ChatMediatorProtocol {
    func sendMessage(message: String, user: User)
}

// Concrete Mediator
class ChatMediator: ChatMediatorProtocol {
    private var users: [User] = []

    func addUser(user: User) {
        users.append(user)
    }

    func sendMessage(message: String, user: User) {
        for otherUser in users {
            if otherUser != user {
                otherUser.receive(message: message)
            }
        }
    }
}

// Colleague: User
struct User {
    let name: String
    private weak var mediator: ChatMediatorProtocol?

    init(name: String, mediator: ChatMediatorProtocol) {
        self.name = name
        self.mediator = mediator
    }

    func send(message: String) {
        mediator?.sendMessage(message: message, user: self)
    }

    func receive(message: String) {
        print("\(name) received: \(message)")
    }
}

// Usage
let mediator = ChatMediator()

let alice = User(name: "Alice", mediator: mediator)
let bob = User(name: "Bob", mediator: mediator)
let charlie = User(name: "Charlie", mediator: mediator)

mediator.addUser(user: alice)
mediator.addUser(user: bob)
mediator.addUser(user: charlie)

alice.send(message: "Hello, everyone!")
bob.send(message: "Hi Alice!")
```