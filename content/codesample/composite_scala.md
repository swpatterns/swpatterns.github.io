---
title: "Composite - Scala"
date: 2025-12-03T11:37:46.126-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Scala"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It defines class hierarchies where you can form tree structures of components. In this case, we represent a file system where files and directories can both be treated as "File System Entities".  The `FileSystemEntity` is the common interface. `File` represents a leaf node, while `Directory` represents a composite node holding other entities. This Scala implementation leverages inheritance and a common trait (`FileSystemEntity`) for a clean and flexible structure, fitting Scala's functional-object oriented style by using traits for defining the interface and classes for concrete implementations.

```scala
trait FileSystemEntity {
  def name: String
  def size: Long
  def printDetails(indent: String = ""): Unit
}

class File(val name: String, val size: Long) extends FileSystemEntity {
  def printDetails(indent: String = ""): Unit = {
    println(s"${indent}File: $name, Size: $size bytes")
  }
}

class Directory(val name: String, val children: List[FileSystemEntity] = Nil) extends FileSystemEntity {
  def size: Long = children.map(_.size).sum
  def add(entity: FileSystemEntity): Directory = new Directory(name, children :+ entity)

  def printDetails(indent: String = ""): Unit = {
    println(s"${indent}Directory: $name, Total Size: $size bytes")
    children.foreach(child => child.printDetails(indent + "  "))
  }
}

object FileSystemExample {
  def main(args: Array[String]): Unit = {
    val root = new Directory("Root")
    val documents = root.add(new Directory("Documents"))
    val photos = root.add(new Directory("Photos"))

    documents.add(new File("report.docx", 1024))
    documents.add(new File("presentation.pptx", 2048))
    photos.add(new File("vacation.jpg", 5120))
    photos.add(new File("family.png", 2560))

    root.printDetails()
  }
}
```