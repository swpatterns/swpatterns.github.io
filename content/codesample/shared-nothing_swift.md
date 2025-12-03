---
title: "Shared-Nothing - Swift"
date: 2025-12-03T15:13:58.959-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Swift"]
---
The Shared-Nothing pattern aims for scalability and fault tolerance by distributing data and computation across multiple independent nodes, each with its own dedicated resources (CPU, memory, disk). There is *no* shared memory or storage between these nodes. Communication happens via message passing. This example simulates a simple distributed counter using Swift's `Actor` concurrency model, which naturally lends itself to this pattern. Each actor represents a node, holding its own count and responding to increment/get requests.  Actors provide isolated state and message-based communication, mirroring the independent nodes and message passing of Shared-Nothing.

```swift
import Foundation
import Dispatch

actor CounterNode {
    private var count: Int = 0

    func increment() {
        count += 1
    }

    func getCount() -> Int {
        return count
    }
}

class DistributedCounter {
    private let nodes: [Actor<CounterNode>]
    private let nodeCount: Int

    init(nodeCount: Int) {
        self.nodeCount = nodeCount
        self.nodes = (0..<nodeCount).map { _ in Actor.create(CounterNode()) }
    }

    func increment(nodeId: Int) {
        nodes[nodeId].send(increment)
    }

    func getTotalCount() async -> Int {
        var totalCount = 0
        for node in nodes {
            totalCount += await node.send(getCount)
        }
        return totalCount
    }
}

// Example Usage:
let counter = DistributedCounter(nodeCount: 5)

// Increment nodes concurrently
let increments = (0..<5).map { nodeId in
    Task {
        for _ in 0..<100 {
            counter.increment(nodeId: nodeId)
        }
    }
}

await all(increments, on: .main).completed // Wait for all increments to finish

let total = await counter.getTotalCount()
print("Total count: \(total)")
```