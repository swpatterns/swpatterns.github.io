---
title: "Message Broker - Swift"
date: 2025-12-03T15:09:30.303-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Swift"]
---
The Message Broker pattern decouples application components by allowing them to communicate through intermediary message channels. Components don't need to know about each other directly; they simply publish messages to the broker, and other components subscribe to the messages they're interested in. This promotes scalability, maintainability, and flexibility.

This Swift implementation uses a simple `NotificationCenter` as the message broker.  `Publisher` structs define message types. Components `publish` messages using the `post` function of `NotificationCenter`, and `subscribe` by observing notifications for specific message types. This approach leverages Swift’s built-in event handling mechanism, making it concise and idiomatic.  The use of structs for messages aligns with Swift’s value-type philosophy, and the `NotificationCenter` handles the decoupling efficiently.

```swift
// Define message types as structs
struct UserCreated {
    let userId: Int
    let username: String
}

struct ProductPurchased {
    let productId: Int
    let userId: Int
}

// Message Broker (using NotificationCenter)
import Foundation

class MessageBroker {
    static let shared = MessageBroker()

    private init() {}

    func publish<T: Hashable>(message: T, userInfo: [AnyHashable : Any]? = nil) {
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: String(describing: message)), object: nil, userInfo: userInfo)
    }

    func subscribe<T: Hashable>(observer: Any, selector: Selector, messageType: T.Type) {
        NotificationCenter.default.addObserver(observer, selector: selector, name: NSNotification.Name(rawValue: String(describing: messageType)), object: nil)
    }
}

// Example Component 1: User Service
class UserService {
    func createUser(userId: Int, username: String) {
        print("Creating user \(username) with ID \(userId)")
        let message = UserCreated(userId: userId, username: username)
        MessageBroker.shared.publish(message: message)
    }
}

// Example Component 2: Email Service
class EmailService {
    @objc func handleUserCreated(notification: Notification) {
        guard let userInfo = notification.userInfo, let userId = userInfo["userId"] as? Int, let username = userInfo["username"] as? String else {
            return
        }
        print("Sending welcome email to \(username) (ID: \(userId))")
    }

    func setupSubscription() {
        MessageBroker.shared.subscribe(observer: self, selector: #selector(handleUserCreated), messageType: UserCreated.self)
    }
}

// Example Usage
let userService = UserService()
let emailService = EmailService()
emailService.setupSubscription()

userService.createUser(userId: 123, username: "Alice")
```