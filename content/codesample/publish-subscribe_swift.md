---
title: "Publish-Subscribe - Swift"
date: 2025-12-03T15:29:51.968-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Swift"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) and message receivers (subscribers). Publishers don't know who their subscribers are, and subscribers only know *of* the publishers, not how to access their data directly. A central message broker (often called a topic or event bus) manages message distribution.

This Swift implementation utilizes a `NotificationCenter`—a built-in Pub/Sub mechanism—which is the idiomatic way to handle events in Apple ecosystems. Publishers use `post(name:object:)` to send notifications, and subscribers register observers using `addObserver(forName:object:block:)`.  The use of `Notification.Name` provides strong typing for notification names, enhancing safety and readability.  This avoids stringly-typed notifications common in other languages and leverages Swift's type system.

```swift
// Publisher
class DataProvider {
    let dataDidChangeNotification = Notification.Name("DataDidChange")
    private var _data: String = "Initial Data"
    var data: String {
        get { return _data }
        set {
            _data = newValue
            NotificationCenter.default.post(name: dataDidChangeNotification, object: _data)
        }
    }
}

// Subscriber
class DataConsumer {
    init(dataProvider: DataProvider) {
        NotificationCenter.default.addObserver(
            forName: dataProvider.dataDidChangeNotification,
            object: nil,
            block: { notification in
                guard let newData = notification.object as? String else {
                    print("Received data notification with invalid object.")
                    return
                }
                self.updateData(newData)
            }
        )
    }

    func updateData(_ data: String) {
        print("Data updated: \(data)")
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}

// Usage
let dataProvider = DataProvider()
let dataConsumer1 = DataConsumer(dataProvider: dataProvider)
let dataConsumer2 = DataConsumer(dataProvider: dataProvider)

dataProvider.data = "First Update"
dataProvider.data = "Second Update"
```