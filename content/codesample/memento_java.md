---
title: "Memento - Java"
date: 2025-12-03T13:18:23.088-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Java"]
---
The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later, even if the object is modified or moved to another place. It's useful for implementing undo/redo functionality or for saving game states.

This Java implementation defines a `Memento` class to hold the state. The `Originator` encapsulates the state and creates mementos. The `Caretaker` is responsible for holding mementos but doesn't operate on the originator’s state; it only provides storage. This separation maintains encapsulation. The inner class `Memento` provides limited access to its state (only the Originator can access it directly), adhering to encapsulation principles.  This design is common in Java, leveraging the power of classes to represent both the state and the logic.

```java
// Memento pattern in Java

// Memento class
class Originator {
    private String state;

    public Originator(String initialState) {
        this.state = initialState;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    // Create a memento to store the current state
    public Memento save() {
        return new Memento(this.state);
    }

    // Restore the state from a memento
    public void restore(Memento memento) {
        this.state = memento.getState();
    }

    // Inner class Memento
    class Memento {
        private final String state;

        public Memento(String state) {
            this.state = state;
        }

        public String getState() {
            return state;
        }
    }
}

// Caretaker class
class Caretaker {
    private Originator.Memento memento;

    public void saveMemento(Originator originator) {
        this.memento = originator.save();
    }

    public void restoreMemento(Originator originator) {
        originator.restore(this.memento);
    }
}

// Example Usage
public class Main {
    public static void main(String[] args) {
        Originator originator = new Originator("Initial State");
        Caretaker caretaker = new Caretaker();

        System.out.println("Initial State: " + originator.getState());

        caretaker.saveMemento(originator);

        originator.setState("New State");
        System.out.println("New State: " + originator.getState());

        caretaker.restoreMemento(originator);
        System.out.println("Restored State: " + originator.getState());
    }
}
```