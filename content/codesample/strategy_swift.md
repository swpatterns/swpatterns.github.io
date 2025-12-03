---
title: "Strategy - Swift"
date: 2025-12-03T13:35:03.953-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Swift"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. In this Swift implementation, we define a protocol `SortingStrategy` with a single method `sort`. Different concrete strategies like `BubbleSortStrategy` and `QuickSortStrategy` conform to this protocol, each implementing a distinct sorting algorithm. A `Sorter` class uses a `SortingStrategy` instance to perform the sorting, delegating the actual sorting logic. This is idiomatic Swift due to its strong use of protocols for defining behavior and dependency injection for achieving flexibility.

```swift
// Define the Strategy interface (Protocol)
protocol SortingStrategy {
    func sort(list: [Int]) -> [Int]
}

// Concrete Strategies
struct BubbleSortStrategy: SortingStrategy {
    func sort(list: [Int]) -> [Int] {
        var sortedList = list
        let n = sortedList.count
        for i in 0..<n {
            for j in 0..<n-i-1 {
                if sortedList[j] > sortedList[j+1] {
                    sortedList.swapAt(j, j+1)
                }
            }
        }
        return sortedList
    }
}

struct QuickSortStrategy: SortingStrategy {
    func sort(list: [Int]) -> [Int] {
        guard list.count > 1 else { return list }
        let pivot = list[0]
        let less = list.filter { $0 < pivot }
        let equal = list.filter { $0 == pivot }
        let greater = list.filter { $0 > pivot }
        return QuickSortStrategy().sort(list: less) + equal + QuickSortStrategy().sort(list: greater)
    }
}

// Context
class Sorter {
    private var strategy: SortingStrategy

    init(strategy: SortingStrategy) {
        self.strategy = strategy
    }

    func setStrategy(strategy: SortingStrategy) {
        self.strategy = strategy
    }

    func sortList(list: [Int]) -> [Int] {
        return strategy.sort(list: list)
    }
}

// Usage
let myList = [5, 1, 4, 2, 8]

// Use Bubble Sort
var bubbleSorter = Sorter(strategy: BubbleSortStrategy())
let sortedBubble = bubbleSorter.sortList(list: myList)
print("Bubble Sort: \(sortedBubble)")

// Switch to Quick Sort
bubbleSorter.setStrategy(strategy: QuickSortStrategy())
let sortedQuick = bubbleSorter.sortList(list: myList)
print("Quick Sort: \(sortedQuick)")
```