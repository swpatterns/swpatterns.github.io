---
title: "Flyweight - Swift"
date: 2025-12-03T12:43:52.030-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Swift"]
---
The Flyweight pattern aims to minimize memory usage by sharing as much data as possible between similar objects. It separates the object's state into intrinsic (shared) and extrinsic (unique) components.  Intrinsic state is stored in the flyweight object, while extrinsic state is passed to the flyweight as needed. This example models trees in a forest.  The `TreeType` is the flyweight, storing shared properties like the tree's image.  Each `Tree` instance (representing a tree in the forest) holds only the unique extrinsic state – its position (x, y coordinates). This avoids storing redundant image data for every tree. The Swift implementation leverages structs for immutability and value semantics, fitting the pattern's intent to share data efficiently.

```swift
// Flyweight
struct TreeType {
    let name: String
    let image: String // Shared resource

    func draw(x: Int, y: Int) {
        print("Drawing \(name) at (\(x), \(y)) with image: \(image)")
    }
}

// Client / Context
class Tree {
    let type: TreeType
    let x: Int
    let y: Int

    init(type: TreeType, x: Int, y: Int) {
        self.type = type
        self.x = x
        self.y = y
    }

    func draw() {
        type.draw(x: x, y: y)
    }
}

// Flyweight Factory
class Forest {
    private var treeTypes: [String: TreeType] = [:]

    func getTreeType(name: String, image: String) -> TreeType {
        if let treeType = treeTypes[name] {
            return treeType
        } else {
            let newTreeType = TreeType(name: name, image: image)
            treeTypes[name] = newTreeType
            return newTreeType
        }
    }

    func plantTree(name: String, image: String, x: Int, y: Int) -> Tree {
        let treeType = getTreeType(name: name, image: image)
        return Tree(type: treeType, x: x, y: y)
    }
}

// Usage
let forest = Forest()

let tree1 = forest.plantTree(name: "Oak", image: "oak.png", x: 10, y: 20)
let tree2 = forest.plantTree(name: "Pine", image: "pine.png", x: 30, y: 40)
let tree3 = forest.plantTree(name: "Oak", image: "oak.png", x: 50, y: 60) // Reuses Oak type

tree1.draw()
tree2.draw()
tree3.draw()
```