---
title: "Memento - Swift"
date: 2025-12-03T13:21:47.781-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Swift"]
---
The Memento pattern is a behavioral design pattern that allows capturing and externalizing the internal state of an object without violating encapsulation. This is useful for implementing undo/redo functionality or saving/restoring object states. The pattern defines three roles: the Originator holds the state, the Memento stores the state, and the Caretaker manages Memento objects. The Originator creates a Memento representing its current state, and the Caretaker stores this Memento. The Originator can then restore its state from the Memento.

In this Swift implementation, `Editor` is the Originator, `Snapshot` is the Memento, and `History` is the Caretaker. `Snapshot` is a struct to ensure immutability of saved states, a common practice in Swift. The `History` stores `Snapshot`s to allow the editor's state to be restored at different points in time. Using structs for `Snapshot` leverages Swift's value semantics for safe state storage.

```swift
// MARK: - Memento Pattern in Swift

// 1. Memento
struct Snapshot {
    let state: String
}

// 2. Originator
class Editor {
    private var state: String = ""

    func type(input: String) {
        state = state + input
        print("Typed: \(input), Current State: \(state)")
    }

    func getState() -> String {
        return state
    }

    func restore(from snapshot: Snapshot) {
        state = snapshot.state
        print("Restored to state: \(state)")
    }

    func createSnapshot() -> Snapshot {
        return Snapshot(state: state)
    }
}

// 3. Caretaker
class History {
    private var snapshots: [Snapshot] = []

    func push(snapshot: Snapshot) {
        snapshots.append(snapshot)
    }

    func pop() -> Snapshot? {
        return snapshots.popLast()
    }
}

// Example Usage:
let editor = Editor()
let history = History()

editor.type(input: "Hello, ")
history.push(snapshot: editor.createSnapshot())
editor.type(input: "World!")
history.push(snapshot: editor.createSnapshot())

print("\nUndoing...")
if let snapshot = history.pop() {
    editor.restore(from: snapshot)
}

print("\nUndoing...")
if let snapshot = history.pop() {
    editor.restore(from: snapshot)
}
```