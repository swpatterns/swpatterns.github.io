---
title: "Flyweight - Scala"
date: 2025-12-03T12:44:42.612-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Scala"]
---
The Flyweight pattern aims to minimize memory usage by sharing objects that are identical or similar. It separates an object's state into intrinsic (shared) and extrinsic (unique) parts.  Intrinsic state is stored in the flyweight object, while extrinsic state is passed to the flyweight when needed. This example models trees in a forest, where many trees might share the same type and color (intrinsic), but have unique positions (extrinsic).  The `TreeType` is the flyweight, and `Forest` manages the extrinsic state for each tree instance. Scala's immutability and case classes make it well-suited for this pattern, as flyweights can be safely shared.

```scala
// Define the intrinsic state (Flyweight)
case class TreeType(species: String, color: String)

// Define the context (Forest) - manages extrinsic state
case class Tree(treeType: TreeType, x: Int, y: Int)

object Forest {
  private var treeTypes: Map[String, TreeType] = Map.empty

  def getTreeType(species: String, color: String): TreeType = {
    treeTypes.getOrElse(
      (species, color).toString,
      TreeType(species, color)
    )
  }

  def createTree(species: String, color: String, x: Int, y: Int): Tree = {
    val treeType = getTreeType(species, color)
    Tree(treeType, x, y)
  }

  def main(args: Array[String]): Unit = {
    val tree1 = Forest.createTree("Oak", "Green", 10, 20)
    val tree2 = Forest.createTree("Oak", "Green", 30, 40) // Shares the same TreeType as tree1
    val tree3 = Forest.createTree("Pine", "Dark Green", 50, 60)
    val tree4 = Forest.createTree("Pine", "Dark Green", 70, 80) // Shares the same TreeType as tree3

    println(s"Tree 1: ${tree1}")
    println(s"Tree 2: ${tree2}")
    println(s"Tree 3: ${tree3}")
    println(s"Tree 4: ${tree4}")

    //Demonstrate that tree1 and tree2 share the same TreeType instance
    println(s"Tree 1 and Tree 2 have the same TreeType instance: ${tree1.treeType == tree2.treeType}")
    println(s"Tree 3 and Tree 4 have the same TreeType instance: ${tree3.treeType == tree4.treeType}")
  }
}
```