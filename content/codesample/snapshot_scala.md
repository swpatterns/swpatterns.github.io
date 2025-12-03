---
title: "Snapshot - Scala"
date: 2025-12-03T14:02:41.150-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Scala"]
---
The Snapshot pattern captures the state of an object or data structure at a specific point in time without affecting the original. This allows for consistent reads, especially in concurrent environments, or for implementing undo/redo functionality. This Scala example uses immutable data structures (case classes) to achieve the snapshot.  A `takeSnapshot` method creates a copy of the object's state, and subsequent operations work on the snapshot, leaving the original untouched. Scala's emphasis on immutability makes this pattern a natural fit, promoting thread safety and simplifying reasoning about state changes.

```scala
case class Data(value: Int)

object Snapshot {

  def takeSnapshot(data: Data): Data = {
    data.copy() // Creates a new Data instance with the same value
  }

  def main(args: Array[String]): Unit = {
    var originalData = Data(10)
    println(s"Original Data: $originalData")

    val snapshot = takeSnapshot(originalData)
    println(s"Snapshot: $snapshot")

    originalData = originalData.copy(value = 20) // Modify the original
    println(s"Modified Original Data: $originalData")

    println(s"Snapshot (unchanged): $snapshot") // Snapshot remains at original state
  }
}
```