---
title: "Memento - C++"
date: 2025-12-03T13:20:04.753-05:00
draft: false
pattern_usage: ["Memento"]
language: ["C++"]
---
The Memento pattern is a behavioral design pattern that allows you to capture and externalize the internal state of an object without violating encapsulation. It’s useful for implementing undo/redo functionality, or for saving points in a game.  The `Originator` holds the state, the `Memento` is an immutable snapshot of that state, and the `Caretaker` is responsible for storing and retrieving Mementos.

This C++ implementation utilizes private inner classes for `Memento` to strictly enforce encapsulation.  The `Editor` acts as the originator, holding the text and providing methods to set and get it, alongside creating and restoring from mementos.  The `History` class represents the caretaker, managing a list of `EditorMemento` objects.  Using `std::unique_ptr` for managing the mementos ensures proper memory management. This conforms to modern C++ practices, emphasizing encapsulation, resource management, and clear separation of concerns.

```cpp
#include <iostream>
#include <vector>
#include <memory>

class Editor; // Forward declaration

class EditorMemento {
private:
  std::string state;
public:
  EditorMemento(const std::string& state_) : state(state_) {}
  std::string getState() const { return state; }
};

class Editor {
private:
  std::string text;
public:
  Editor() : text("") {}

  void setText(const std::string& text_) {
    text = text_;
  }

  std::string getText() const {
    return text;
  }

  std::unique_ptr<EditorMemento> save() {
    return std::make_unique<EditorMemento>(text);
  }

  void restore(const std::unique_ptr<EditorMemento>& memento) {
    text = memento->getState();
  }
};

class History {
private:
  std::vector<std::unique_ptr<EditorMemento>> mementos;
public:
  void push(std::unique_ptr<EditorMemento> memento) {
    mementos.push_back(std::move(memento));
  }

  std::unique_ptr<EditorMemento> pop() {
    if (!mementos.empty()) {
      auto memento = std::move(mementos.back());
      mementos.pop_back();
      return memento;
    }
    return nullptr;
  }
};

int main() {
  Editor editor;
  History history;

  editor.setText("Initial text.");
  history.push(editor.save());

  editor.setText("Text after some changes.");
  history.push(editor.save());

  editor.setText("Another set of changes!");
  history.push(editor.save());

  std::cout << "Current state: " << editor.getText() << std::endl;

  auto memento = history.pop();
  if (memento) {
    editor.restore(memento);
    std::cout << "Restored to: " << editor.getText() << std::endl;
  }

  memento = history.pop();
   if (memento) {
    editor.restore(memento);
    std::cout << "Restored to: " << editor.getText() << std::endl;
  }
  
  return 0;
}
```