---
title: "Memento - JavaScript"
date: 2025-12-03T13:19:00.131-05:00
draft: false
pattern_usage: ["Memento"]
language: ["JavaScript"]
---
The Memento pattern is a behavioral pattern that allows you to capture and externalize the internal state of an object without violating encapsulation. This enables restoring the object to its previous state later, providing a way to implement undo/redo functionality or checkpointing.

The code defines a `TextEditor` class representing the object whose state needs to be saved.  A `History` class acts as the `Memento` holder (caretaker). `TextEditor` creates `TextEditorState` objects (Mementos) representing its state. The `History` stores these states, and the `TextEditor` can retrieve them to restore previous versions.  This uses simple JavaScript objects and class syntax which is a common modern approach, avoiding unnecessary complexity for such a focused pattern.

```javascript
// Memento (TextEditorState)
class TextEditorState {
  constructor(text) {
    this.text = text;
    this.timestamp = Date.now();
  }
}

// Originator (TextEditor)
class TextEditor {
  constructor() {
    this.text = "";
  }

  setText(text) {
    this.text = text;
  }

  getState() {
    return new TextEditorState(this.text);
  }

  restore(state) {
    this.text = state.text;
  }

  getText() {
    return this.text;
  }
}

// Caretaker (History)
class History {
  constructor() {
    this.states = [];
  }

  push(state) {
    this.states.push(state);
  }

  pop() {
    if (this.states.length > 0) {
      return this.states.pop();
    }
    return null;
  }
}

// Example Usage
const editor = new TextEditor();
const history = new History();

editor.setText("Hello");
history.push(editor.getState());

editor.setText("World");
history.push(editor.getState());

editor.setText("!");
console.log(editor.getText()); // Outputs: !

const lastState = history.pop();
editor.restore(lastState);
console.log(editor.getText()); // Outputs: World

const firstState = history.pop();
editor.restore(firstState);
console.log(editor.getText()); // Outputs: Hello 
```