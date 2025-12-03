---
title: "Specification - PHP"
date: 2025-12-03T13:53:41.392-05:00
draft: false
pattern_usage: ["Specification"]
language: ["PHP"]
---
The Specification pattern is a behavioral design pattern that defines a way to represent complex conditions using boolean expressions. It allows you to decouple the logic that determines *if* something is valid from the object it's being applied to. This promotes reusability and composability of validation rules.

The code defines an `Item` class and a `Specification` interface with a `isSatisfiedBy()` method. Concrete specifications like `PriceSpecification` and `NameSpecification` implement this interface to check specific item properties. These specifications can be combined using logical operators (`and`, `or`, `not`) to create more complex rules. The example demonstrates checking if an item is both expensive and has a valid name. This approach is idiomatic PHP due to its flexible type system and support for interfaces and object composition.

```php
<?php

interface Specification
{
    public function isSatisfiedBy(Item $item): bool;
}

class Item
{
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

class PriceSpecification implements Specification
{
    public function __construct(public float $minPrice) {}

    public function isSatisfiedBy(Item $item): bool
    {
        return $item->price >= $this->minPrice;
    }
}

class NameSpecification implements Specification
{
    public function isSatisfiedBy(Item $item): bool
    {
        return !empty($item->name);
    }
}

class AndSpecification implements Specification
{
    public function __construct(
        private Specification $specification1,
        private Specification $specification2
    ) {}

    public function isSatisfiedBy(Item $item): bool
    {
        return $this->specification1->isSatisfiedBy($item) && $this->specification2->isSatisfiedBy($item);
    }
}

// Usage
$item1 = new Item("Laptop", 1200.00);
$item2 = new Item("", 500.00);

$expensive = new PriceSpecification(1000.00);
$validName = new NameSpecification();

$combinedSpec = new AndSpecification($expensive, $validName);

if ($combinedSpec->isSatisfiedBy($item1)) {
    echo "Item 1 is expensive and has a valid name.\n";
} else {
    echo "Item 1 does not meet the criteria.\n";
}

if ($combinedSpec->isSatisfiedBy($item2)) {
    echo "Item 2 is expensive and has a valid name.\n";
} else {
    echo "Item 2 does not meet the criteria.\n";
}

?>
```