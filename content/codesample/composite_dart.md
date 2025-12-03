---
title: "Composite - Dart"
date: 2025-12-03T11:37:59.620-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Dart"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It defines a tree-like structure where each node can be either a leaf (individual object) or a composite (group of objects). This enables you to perform operations on entire structures and their components in a consistent manner.

This Dart implementation defines an `Entry` interface with a `getCost()` method. `File` implements `Entry` as a leaf node. `Folder` also implements `Entry`, but contains a list of other `Entry` objects, allowing it to be a composite. The `main()` function demonstrates creating a file system structure, adding files and folders, and calculating the total cost.  The use of interfaces and list-based composition is idiomatic to Dart and facilitates flexibility and scalability. Using abstract classes for both File and Folder provides a clean boundary for defining common behavior.

```dart
abstract class Entry {
  double getCost();
}

class File implements Entry {
  final String name;
  final double size;

  File(this.name, this.size);

  @override
  double getCost() {
    return size;
  }
}

class Folder implements Entry {
  final String name;
  final List<Entry> entries = [];
  
  Folder(this.name);

  void add(Entry entry) {
    entries.add(entry);
  }

  @override
  double getCost() {
    return entries.fold(0.0, (sum, entry) => sum + entry.getCost());
  }
}


void main() {
  Folder root = Folder('Root');
  Folder documents = Folder('Documents');
  Folder pictures = Folder('Pictures');

  File file1 = File('Report.txt', 100.0);
  File file2 = File('Photo.jpg', 50.0);
  File file3 = File('Presentation.pptx', 150.0);

  documents.add(file1);
  pictures.add(file2);
  pictures.add(file3);

  root.add(documents);
  root.add(pictures);

  print('Total cost: ${root.getCost()}');
}
```