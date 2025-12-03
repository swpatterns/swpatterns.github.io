---
title: "Event-Driven Architecture - PHP"
date: 2025-12-03T14:55:02.058-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["PHP"]
---
The Event-Driven Architecture (EDA) decouples software components by allowing them to react to events without knowing who created them. Components (event producers) emit events, and other components (event consumers) subscribe to specific events they're interested in. This promotes flexibility and scalability.

This PHP example uses a simple event emitter class and a registry of event listeners.  The `EventEmitter` class allows attaching listeners to events via `on()` and triggering events via `emit()`.  Listeners are simple callable functions (closures or methods). This approach is idiomatic PHP as it leverages closures and the dynamic nature of the language for flexible event handling without requiring complex interfaces or inheritance.  It's a lightweight implementation suitable for smaller applications or as a building block for more robust event systems.

```php
<?php

class EventEmitter
{
    private $listeners = [];

    public function on(string $event, callable $listener): void
    {
        if (!isset($this->listeners[$event])) {
            $this->listeners[$event] = [];
        }
        $this->listeners[$event][] = $listener;
    }

    public function emit(string $event, ...$args): void
    {
        if (isset($this->listeners[$event])) {
            foreach ($this->listeners[$event] as $listener) {
                call_user_func($listener, ...$args);
            }
        }
    }
}

// Example Usage
$emitter = new EventEmitter();

$emitter->on('user.created', function ($user) {
    echo "User created: " . $user['name'] . "\n";
    // Perform actions like sending a welcome email
});

$emitter->on('user.created', function ($user) {
    echo "Logging user creation for: " . $user['name'] . "\n";
    // Log the event to a database or file
});

$emitter->emit('user.created', ['name' => 'Alice', 'id' => 123]);
$emitter->emit('user.updated', ['name' => 'Bob', 'id' => 456]); // No listeners for this event
?>
```