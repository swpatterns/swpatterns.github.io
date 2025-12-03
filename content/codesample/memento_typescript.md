---
title: "Memento - TypeScript"
date: 2025-12-03T13:19:20.120-05:00
draft: false
pattern_usage: ["Memento"]
language: ["TypeScript"]
---
The Memento pattern is a behavioral pattern that allows you to capture and externalize the internal state of an object without violating encapsulation. This is useful for implementing undo/redo functionality, or for restoring an object to a previous state. The pattern consists of three parts: the Originator, which holds the state; the Memento, which is an immutable snapshot of the state; and the Caretaker, which stores and retrieves Mementos.

This TypeScript implementation demonstrates the pattern with a simple `TextEditor` as the Originator.  The `TextEditor`'s state (the `text`) is encapsulated within its `save()` method, which creates a `TextEditorMemento` holding the current text.  The Caretaker, represented by a `History`, simply stores and retrieves these Mementos.  TypeScript's immutability features (using `readonly`) and class structures naturally align with the Memento pattern's principles of encapsulation and state preservation.

```typescript
// Memento Pattern in TypeScript

// Memento - holds a snapshot of the Originator's state
class TextEditorMemento {
    readonly text: string;

    constructor(text: string) {
        this.text = text;
    }
}

// Originator - object whose state is to be saved
class TextEditor {
    private text: string;

    constructor() {
        this.text = "";
    }

    setText(text: string): void {
        this.text = text;
    }

    getText(): string {
        return this.text;
    }

    // Create a memento to save the current state
    save(): TextEditorMemento {
        return new TextEditorMemento(this.text);
    }

    // Restore the state from a memento
    restore(memento: TextEditorMemento): void {
        this.text = memento.text;
    }
}

// Caretaker - stores and retrieves Mementos
class History {
    private mementos: TextEditorMemento[] = [];

    push(memento: TextEditorMemento): void {
        this.mementos.push(memento);
    }

    pop(): TextEditorMemento | undefined {
        return this.mementos.pop();
    }
}

// Example Usage
const editor = new TextEditor();
const history = new History();

editor.setText("Initial text.");
history.push(editor.save());

editor.setText("Added more text.");
history.push(editor.save());

editor.setText("Something else...");
console.log("Current Text:", editor.getText());

const lastMemento = history.pop();
if (lastMemento) {
    editor.restore(lastMemento);
    console.log("Restored Text:", editor.getText());
}
```