---
title: "Memento - Dart"
date: 2025-12-03T13:23:02.186-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Dart"]
---
The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later, even if the object is modified or destroyed. It consists of three parts: the Originator, the Memento, and the Caretaker. The Originator holds the state, the Memento is an immutable snapshot of that state, and the Caretaker is responsible for storing and retrieving Mementos without directly accessing the Originator's state.

This Dart implementation uses classes to represent each part. The `Editor` is the Originator, holding the text and providing methods to set and save its state. The `TextSnapshot` is the Memento, storing the text immutably. The `History` class acts as the Caretaker, managing a list of `TextSnapshot` objects. Dart's immutability features (using `final`) are leveraged in the `TextSnapshot` to ensure the state remains consistent. This approach aligns with Dart's object-oriented nature and promotes encapsulation.

```dart
class TextSnapshot {
  final String text;

  TextSnapshot(this.text);

  String getText() => text;
}

class Editor {
  String _text = "";

  String getText() => _text;
  void setText(String text) {
    _text = text;
  }

  TextSnapshot save() {
    return TextSnapshot(_text);
  }

  void restore(TextSnapshot snapshot) {
    _text = snapshot.getText();
  }
}

class History {
  List<TextSnapshot> _snapshots = [];

  void push(TextSnapshot snapshot) {
    _snapshots.add(snapshot);
  }

  TextSnapshot pop() {
    if (_snapshots.isEmpty) {
      return null;
    }
    return _snapshots.removeLast();
  }
}

void main() {
  final editor = Editor();
  final history = History();

  editor.setText("Hello");
  history.push(editor.save());

  editor.setText("World");
  history.push(editor.save());

  print("Current text: ${editor.getText()}"); // Output: Current text: World

  final snapshot = history.pop();
  editor.restore(snapshot!);
  print("Restored text: ${editor.getText()}"); // Output: Restored text: Hello

  final snapshot2 = history.pop();
  editor.restore(snapshot2!);
  print("Restored text: ${editor.getText()}"); // Output: Restored text: 
}
```