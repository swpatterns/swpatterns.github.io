---
title: "Memento - PHP"
date: 2025-12-03T13:22:25.992-05:00
draft: false
pattern_usage: ["Memento"]
language: ["PHP"]
---
The Memento pattern is a behavioral pattern that captures and externalizes the internal state of an object without violating encapsulation. It allows restoring an object to its previous state (saving and loading states).  This implementation uses a `Memento` class to hold the state, an `Originator` class whose state is saved, and a `Caretaker` to manage the history of Mementos.  PHP's object-oriented nature makes this design readily expressible. We leverage properties for state storage and methods for state manipulation and retrieval, keeping the internal state protected and manageable.

```php
<?php

/**
 * Memento: Holds a snapshot of the Originator's state.
 */
class Memento
{
    private $state;

    public function __construct(string $state)
    {
        $this->state = $state;
    }

    public function getState(): string
    {
        return $this->state;
    }
}

/**
 * Originator: The object whose state is to be saved and restored.
 */
class Originator
{
    private $state;

    public function __construct(string $initialState)
    {
        $this->state = $initialState;
    }

    public function setState(string $state): void
    {
        $this->state = $state;
    }

    public function getState(): string
    {
        return $this->state;
    }

    public function createMemento(): Memento
    {
        return new Memento($this->state);
    }

    public function restoreMemento(Memento $memento): void
    {
        $this->state = $memento->getState();
    }
}

/**
 * Caretaker: Manages the Mementos, but doesn't access the state within them.
 */
class Caretaker
{
    private $mementos = [];

    public function addMemento(Memento $memento): void
    {
        $this->mementos[] = $memento;
    }

    public function getMemento(int $index): ?Memento
    {
        return $this->mementos[$index] ?? null;
    }
}


// Example Usage
$originator = new Originator("Initial State");
$caretaker = new Caretaker();

$caretaker->addMemento($originator->createMemento()); // Save State 1

$originator->setState("State 2");
$caretaker->addMemento($originator->createMemento()); // Save State 2

$originator->setState("State 3");
$caretaker->addMemento($originator->createMemento()); // Save State 3

echo "Current State: " . $originator->getState() . "\n"; // Output: State 3

// Restore to State 2
$originator->restoreMemento($caretaker->getMemento(1));
echo "Restored State: " . $originator->getState() . "\n"; // Output: State 2

?>
```