---
title: "Blackboard - Swift"
date: 2025-12-03T15:25:39.823-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Swift"]
---
The Blackboard pattern is a computational architecture for solving problems that involve multiple, independent knowledge sources. A central "blackboard" data structure holds the problem state, and "knowledge sources" observe the blackboard, triggering actions when their conditions are met. This allows for flexible and reactive problem-solving without tight coupling between components.

This Swift implementation uses a `Blackboard` class to hold the problem data (a `String` in this example) and a protocol `KnowledgeSource` with a `conditionMet(on: Blackboard)` method. Concrete `KnowledgeSource`s register with the blackboard and are notified when the data changes. They then decide if their expertise applies and modify the blackboard accordingly. This approach leverages Swift's protocol-oriented programming and closures for event handling, fitting the language's functional and flexible nature.

```swift
// Define the Blackboard data structure
class Blackboard {
    var data: String = ""
    var knowledgeSources: [KnowledgeSource] = []
    
    func addKnowledgeSource(_ source: KnowledgeSource) {
        knowledgeSources.append(source)
    }
    
    func setData(_ newData: String) {
        data = newData
        notifyKnowledgeSources()
    }
    
    private func notifyKnowledgeSources() {
        knowledgeSources.forEach { $0.conditionMet(on: self) }
    }
}

// Define the KnowledgeSource protocol
protocol KnowledgeSource {
    func conditionMet(on blackboard: Blackboard)
}

// Example Knowledge Sources
class CapitalizeKnowledgeSource: KnowledgeSource {
    func conditionMet(on blackboard: Blackboard) {
        if !blackboard.data.isEmpty {
            blackboard.data = blackboard.data.capitalized
        }
    }
}

class AddExclamationKnowledgeSource: KnowledgeSource {
    func conditionMet(on blackboard: Blackboard) {
        if !blackboard.data.isEmpty && !blackboard.data.last!.isExclamationPoint {
            blackboard.data += "!"
        }
    }
}

// Usage
let blackboard = Blackboard()

let capitalizeSource = CapitalizeKnowledgeSource()
let exclamationSource = AddExclamationKnowledgeSource()

blackboard.addKnowledgeSource(capitalizeSource)
blackboard.addKnowledgeSource(exclamationSource)

blackboard.setData("hello world")
print(blackboard.data) // Output: Hello world!

blackboard.setData("swift is fun")
print(blackboard.data) // Output: Swift is fun!
```