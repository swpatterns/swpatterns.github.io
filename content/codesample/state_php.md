---
title: "State - PHP"
date: 2025-12-03T13:31:06.855-05:00
draft: false
pattern_usage: ["State"]
language: ["PHP"]
---
The State pattern allows an object to alter its behavior when its internal state changes. It encapsulates each state as a separate class, making it easy to add new states without modifying the context object. This promotes the Open/Closed Principle.

The code defines a `TrafficLight` context and states (`Red`, `Yellow`, `Green`). Each state implements the `LightState` interface, providing a `handle()` method to define the behavior for that state. The `TrafficLight` holds a reference to the current `LightState` and delegates the task of handling the light to it.  State transitions are managed within each state's `handle()` method. This aligns with PHP's object-oriented principles and demonstrates a clean separation of concerns, using interfaces and classes for a structured approach.

```php
<?php

interface LightState {
  public function handle(TrafficLight $trafficLight);
}

class Red implements LightState {
  public function handle(TrafficLight $trafficLight) {
    echo "Red Light: Stop!\n";
    $trafficLight->setState(new Yellow());
  }
}

class Yellow implements LightState {
  public function handle(TrafficLight $trafficLight) {
    echo "Yellow Light: Caution!\n";
    $trafficLight->setState(new Green());
  }
}

class Green implements LightState {
  public function handle(TrafficLight $trafficLight) {
    echo "Green Light: Go!\n";
    $trafficLight->setState(new Red());
  }
}

class TrafficLight {
  private LightState $state;

  public function __construct() {
    $this->setState(new Red());
  }

  public function setState(LightState $state): void {
    $this->state = $state;
  }

  public function handle(): void {
    $this->state->handle($this);
  }
}

// Usage
$trafficLight = new TrafficLight();
for ($i = 0; $i < 5; $i++) {
  $trafficLight->handle();
}

?>
```