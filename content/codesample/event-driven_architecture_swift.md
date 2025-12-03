---
title: "Event-Driven Architecture - Swift"
date: 2025-12-03T14:54:28.392-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Swift"]
---
The Event-Driven Architecture (EDA) decouples software components by allowing them to communicate through events. Components (event producers) emit events when something significant happens, and other components (event consumers) react to those events without needing to know who produced them. This promotes flexibility and scalability.

This Swift implementation uses a simple `NotificationCenter` as the event bus.  `Observable` objects post notifications with specific names (event types) and payloads. `Observer` objects register for these notifications and execute closures when events occur. This approach is idiomatic Swift because `NotificationCenter` is a built-in, type-safe mechanism for event handling, aligning with Swift's emphasis on safety and clarity.  Using closures for event handling is also a standard Swift practice.

```swift
// Observable.swift
protocol Observable {
    var notificationCenter: NotificationCenter { get }
    func postEvent(name: String, object: Any?)
}

extension Observable {
    var notificationCenter: NotificationCenter {
        return .default
    }

    func postEvent(name: String, object: Any?) {
        notificationCenter.post(name: NSNotification.Name(name), object: object)
    }
}

// Observer.swift
protocol Observer {
    func observeEvent(name: String, handler: @escaping (Notification) -> Void)
}

extension Observer {
    func observeEvent(name: String, handler: @escaping (Notification) -> Void) {
        notificationCenter.addObserver(self, selector: #selector(eventHandler(_:)), name: NSNotification.Name(name), object: nil)
        
        // Swift's selector mechanism requires a method to be defined.
        // We use a helper method to call the closure.
        @objc private func eventHandler(_ notification: Notification) {
            handler(notification)
        }
    }
}

// Example Usage
class DataProvider: Observable {
    var data: String = "Initial Data"

    func updateData(newData: String) {
        data = newData
        postEvent(name: "DataUpdated", object: data)
    }
}

class DataConsumer: Observer {
    func observeEvent(name: String, handler: @escaping (Notification) -> Void) {
        super.observeEvent(name: name, handler: handler)
    }
}

let dataProvider = DataProvider()
let dataConsumer = DataConsumer()

dataConsumer.observeEvent(name: "DataUpdated") { notification in
    if let updatedData = notification.object as? String {
        print("Data updated: \(updatedData)")
    }
}

dataProvider.updateData(newData: "New Data from Source")
dataProvider.updateData(newData: "Even Newer Data")
```