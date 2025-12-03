---
title: "Iterator - Swift"
date: 2025-12-03T13:12:29.296-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Swift"]
---
The Iterator pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. It defines an interface for traversing a collection, allowing you to add new iterators without modifying the collection itself. This example utilizes Swift's built-in `Sequence` and `Iterator` protocols to create a custom iterator for a simple `NumericSequence`. This is very idiomatic Swift as protocols and protocol extensions are actively used for creating reusable and type-safe components. We implement `makeIterator()` to generate the iterator, and the iterator itself conforms to the `IteratorProtocol` providing a `next()` method.

```swift
// NumericSequence.swift

struct NumericSequence {
    private let start: Int
    private let end: Int

    init(start: Int, end: Int) {
        self.start = start
        self.end = end
    }
}

extension NumericSequence: Sequence {
    func makeIterator() -> NumericIterator {
        return NumericIterator(start: start, end: end)
    }
}

struct NumericIterator: IteratorProtocol {
    private var current: Int
    private let end: Int

    init(start: Int, end: Int) {
        self.current = start
        self.end = end
    }

    mutating func next() -> Int? {
        guard current <= end else { return nil }
        let value = current
        current += 1
        return value
    }
}

// Example Usage:
let sequence = NumericSequence(start: 1, end: 5)
for number in sequence {
    print(number)
}
```