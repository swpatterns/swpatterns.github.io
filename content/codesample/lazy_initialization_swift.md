---
title: "Lazy Initialization - Swift"
date: 2025-12-03T11:18:00.962-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Swift"]
---
The Lazy Initialization pattern delays the initialization of a property until it is first accessed. This improves performance, particularly when initialization is expensive, as it avoids unnecessary computation if the property remains unused. In Swift, this is achieved using the `lazy` keyword. The property is declared without an initial value, and the closure provided to `lazy` is executed only when the property is accessed for the first time. This implementation aligns with Swift's focus on performance and optional initialization, leading to concise and efficient code.

```swift
// Lazy Initialization in Swift

class DataProvider {
    lazy var expensiveData: [String: Int] = {
        print("Initializing expensiveData...")
        // Simulate a time-consuming data loading process
        Thread.sleep(forTimeInterval: 2)
        var data: [String: Int] = [:]
        for i in 1...1000 {
            data["key\(i)"] = i * i
        }
        return data
    }()

    func useDataProvider() {
        print("Using DataProvider...")
        //expensiveData will only be initialized when accessed here
        print("Data count: \(expensiveData.count)")
    }
}

let provider = DataProvider() // expensiveData is NOT initialized here!
print("Provider created.")
provider.useDataProvider() // expensiveData IS initialized here by the first access
```