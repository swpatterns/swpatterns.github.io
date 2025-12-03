---
title: "Snapshot - Java"
date: 2025-12-03T13:59:05.769-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Java"]
---
The Snapshot pattern captures the internal state of an object at a certain point in time, allowing it to be restored later. This is useful for implementing features like undo/redo, transaction rollback, or saving game states.  The code defines a `Snapshot` class holding the object's state and an `Originator` class that creates snapshots and restores from them.  The `Caretaker` simply stores snapshots without knowing the Originator's internals. This implementation uses simple getters and setters for state, making it straightforward and readable, fitting Java's object-oriented style. Immutability of the `Snapshot` class is also a good practice.

```java
import java.util.ArrayList;
import java.util.List;

// Originator
class TextEditor {
    private String text;

    public TextEditor(String initialText) {
        this.text = initialText;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Snapshot createSnapshot() {
        return new Snapshot(this.text);
    }

    public void restore(Snapshot snapshot) {
        this.text = snapshot.getText();
    }
}

// Snapshot
class Snapshot {
    private final String text;

    public Snapshot(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}

// Caretaker
class History {
    private List<Snapshot> snapshots = new ArrayList<>();

    public void addSnapshot(Snapshot snapshot) {
        snapshots.add(snapshot);
    }

    public Snapshot getSnapshot(int index) {
        if (index >= 0 && index < snapshots.size()) {
            return snapshots.get(index);
        }
        return null; // Or throw an exception
    }
}

// Example Usage
public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor("Initial text.");
        History history = new History();

        history.addSnapshot(editor.createSnapshot()); // Save initial state

        editor.setText("More text added.");
        history.addSnapshot(editor.createSnapshot()); // Save after addition

        System.out.println("Current text: " + editor.getText());

        Snapshot snapshot = history.getSnapshot(0);
        if (snapshot != null) {
            editor.restore(snapshot);
            System.out.println("Restored text: " + editor.getText());
        }
    }
}
```