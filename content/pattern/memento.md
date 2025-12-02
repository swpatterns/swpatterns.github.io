
---
title: Memento
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral"]
wikipedia: "https://en.wikipedia.org/wiki/Memento_pattern"
diagramtype: "class"
diagram: "[Originator] -- Memento : creates\nMemento --|> State\n[Caretaker] -- Memento : holds\n[note: Originator manages internal state {bg:lightblue}]\n[note: Caretaker requests saving/restoring state {bg:lightgreen}]"
code: true
---

The Memento pattern allows saving and restoring an object's internal state without violating encapsulation. It achieves this by creating a separate "memento" object that holds the state, which the originator can create and hand to a caretaker for storage. The caretaker is responsible for holding mementos but cannot inspect or alter their contents.

This pattern is particularly useful in scenarios requiring undo/redo functionality, transaction management, or the ability to revert to previous states without exposing the object’s internal details. It supports the principle of information hiding by ensuring the object's internal representation remains private.

## Usage

The Memento pattern finds widespread use in applications where maintaining historical states is crucial. Common scenarios include:

*   **Undo/Redo Systems:** Text editors, image manipulation software, and game engines all utilize mementos to implement undo and redo features.
*   **Transaction Management:** Database systems and financial applications use mementos to save the state before a transaction and roll back to that state if the transaction fails.
*   **Checkpoints:**  Game saving mechanisms often employ mementos to store the game's state at specific points, allowing players to resume from those checkpoints.
*   **Version Control:** While more complex, the underlying principle of storing previous states is similar to version control systems.

## Examples

*   **Git (Version Control):** Git utilizes a more advanced version of the Memento pattern in its commits. Each commit essentially acts as a memento, storing a snapshot of the entire project's state at a specific point in time. The caretaker is Git itself, managed by the user. While not a direct one-to-one Memento implementation because of merging and branching, the core idea of saving and restoring states remains.

*   **Java Serialized Object Stream:** Java's `Serializable` interface and `ObjectOutputStream`/`ObjectInputStream` classes provide a built-in mechanism for serializing and deserializing objects.  Serializing an object can be viewed as creating a memento (a byte stream representing the object’s state), and deserializing restores the object to that prior state. The `ObjectOutputStream` plays the role of the caretaker, storing the serialized data. This is a simple automatic implementation of the pattern.
