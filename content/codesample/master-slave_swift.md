---
title: "Master-Slave - Swift"
date: 2025-12-03T15:33:30.242-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Swift"]
---
The Master-Slave pattern (also known as Leader-Follower) involves one object (the Master) holding the primary data and logic, while other objects (the Slaves) maintain copies of that data and react to changes propagated from the Master. This ensures consistency across multiple views or components.  Here, the `Master` manages a list of items and notifies `Slaves` (in this case, `SlaveView` instances) whenever the list is updated.  Swift's Combine framework is used for reactive updates, fitting the language's modern, declarative style.  The `Published` property wrapper automatically broadcasts changes to subscribers, and the `sink` operator allows `SlaveView` to react to those changes.

```swift
import Combine

class Item: Identifiable {
    let id = UUID()
    var name: String
    
    init(name: String) {
        self.name = name
    }
}

class Master: ObservableObject {
    @Published var items: [Item] = []

    func addItem(name: String) {
        items.append(Item(name: name))
    }
}

struct SlaveView: View {
    @ObservedObject var master: Master
    var index: Int

    var body: some View {
        Text("Item \(index + 1): \(master.items[index].name)")
    }
}

struct ContentView: View {
    @StateObject var master = Master()

    var body: some View {
        VStack {
            Button("Add Item") {
                master.addItem(name: "New Item \(master.items.count + 1)")
            }
            
            if !master.items.isEmpty {
                ForEach(0..<master.items.count, id: \.self) { i in
                    SlaveView(master: master, index: i)
                }
            } else {
                Text("No items yet.")
            }
        }
    }
}
```