---
title: "Prototype - PHP"
date: 2025-12-03T11:04:10.692-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["PHP"]
---
The Prototype pattern is a creational design pattern that specifies the kinds of objects to create using an instance of a prototype and creates new objects by copying this prototype. This avoids expensive object creation when object complexity is high. It’s especially useful when the exact configuration of objects being created is unknown until runtime.

This PHP example implements the Prototype pattern by defining an interface (`Prototype`) that all prototype objects must adhere to. Concrete prototypes (`ConcretePrototypeA`, `ConcretePrototypeB`) implement this interface and define a `clone()` method that creates a new object with the same state as the original. A `Client` can then create new objects based on these prototypes without creating them from scratch, enhancing efficiency.  This implements PHP's magic method `__clone()` to perform a shallow copy of the object’s properties, adhering to the language's conventions for object duplication.

```php
<?php

interface Prototype {
  public function clone(): self;
}

class ConcretePrototypeA implements Prototype {
  public string $name;
  public string $description;

  public function __construct(string $name, string $description) {
    $this->name = $name;
    $this->description = $description;
  }

  public function clone(): self {
    // Use the magic method __clone() for a shallow copy
    $clone = new self($this->name, $this->description);
    return $clone;
  }

  public function __clone() {
    // Ensure ID is unique for each clone.
    $this->name = $this->name . " (clone)";
  }
}

class ConcretePrototypeB implements Prototype {
  public int $id;
  public string $type;

  public function __construct(int $id, string $type) {
    $this->id = $id;
    $this->type = $type;
  }

  public function clone(): self {
    // Use the magic method __clone() for a shallow copy
    $clone = new self($this->id, $this->type);
    return $clone;
  }

  public function __clone() {
    // Ensure ID is unique for each clone
    $this->id = $this->id + 1000;
  }
}

class Client {
  public Prototype $prototypeA;
  public Prototype $prototypeB;

  public function __construct(Prototype $prototypeA, Prototype $prototypeB) {
    $this->prototypeA = $prototypeA;
    $this->prototypeB = $prototypeB;
  }

  public function createPrototypeA(): ConcretePrototypeA {
    return clone $this->prototypeA;
  }

  public function createPrototypeB(): ConcretePrototypeB {
    return clone $this->prototypeB;
  }
}

// Usage
$prototypeA = new ConcretePrototypeA("Original A", "This is a prototype A.");
$prototypeB = new ConcretePrototypeB(1, "Prototype B");

$client = new Client($prototypeA, $prototypeB);

$cloneA1 = $client->createPrototypeA();
$cloneA2 = $client->createPrototypeA();
$cloneB1 = $client->createPrototypeB();

print_r($cloneA1);
print_r($cloneA2);
print_r($cloneB1);

?>
```