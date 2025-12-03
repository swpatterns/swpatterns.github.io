---
title: "Observer - PHP"
date: 2025-12-03T13:26:59.608-05:00
draft: false
pattern_usage: ["Observer"]
language: ["PHP"]
---
The Observer pattern defines a one-to-many dependency between objects. When the state of an object (the subject) changes, all its dependent objects (the observers) are notified and updated automatically. This promotes loose coupling, allowing subjects and observers to change independently. 

The code implements this with a `Subject` class managing a list of `Observer` interfaces. When the subject's data changes (using `setState`), it iterates through the observers and calls their `update` method, passing the new state.  The observer interface ensures all observers have a consistent update method. This is idiomatic PHP due to its reliance on interfaces for defining contracts and the use of splitted array iteration for notifying observers.




```php
<?php

/**
 * Observer Interface
 */
interface Observer
{
    public function update(string $data): void;
}

/**
 * Subject Class - Maintains the state of data and notifies observers
 */
class Subject
{
    private string $data;
    private array $observers = [];

    public function __construct(string $initialData = "")
    {
        $this->data = $initialData;
    }

    public function attach(Observer $observer): void
    {
        $this->observers[] = $observer;
    }

    public function detach(Observer $observer): void
    {
        $key = array_search($observer, $this->observers, true);
        if ($key !== false) {
            unset($this->observers[$key]);
            $this->observers = array_values($this->observers); // Re-index array
        }
    }

    public function setState(string $data): void
    {
        $this->data = $data;
        $this->notify();
    }

    public function getState(): string
    {
        return $this->data;
    }

    private function notify(): void
    {
        foreach ($this->observers as $observer) {
            $observer->update($this->data);
        }
    }
}

/**
 * Concrete Observer 1
 */
class ConcreteObserver1 implements Observer
{
    public function update(string $data): void
    {
        echo "ConcreteObserver1: Reacted to the state change: " . $data . PHP_EOL;
    }
}

/**
 * Concrete Observer 2
 */
class ConcreteObserver2 implements Observer
{
    public function update(string $data): void
    {
        echo "ConcreteObserver2: Received update: " . $data . PHP_EOL;
    }
}


// Usage
$subject = new Subject('Initial State');

$observer1 = new ConcreteObserver1();
$subject->attach($observer1);

$observer2 = new ConcreteObserver2();
$subject->attach($observer2);

$subject->setState('New State');
$subject->setState('Another State');

$subject->detach($observer2);

$subject->setState('Final State');

?>
```