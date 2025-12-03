---
title: "Adapter - PHP"
date: 2025-12-03T11:29:18.009-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["PHP"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. This allows classes with incompatible interfaces to collaborate. Here, we adapt a legacy `LegacyRectangle` class (providing area calculation in a specific, older format) to the `Shape` interface (a more modern, consistent interface). The `RectangleAdapter` implements the `Shape` interface but internally uses the `LegacyRectangle` to provide the functionality. This implementation uses PHP's interface system for clear contracts and dependency injection, which aligns with common PHP practices for loose coupling and testability.

```php
<?php

// The target interface - what the client expects
interface Shape
{
    public function getArea(): float;
}

// The legacy class with an incompatible interface
class LegacyRectangle
{
    public function __construct(private float $width, private float $height) {}

    public function calculateArea(): float
    {
        return $this->width * $this->height;
    }
}

// The adapter
class RectangleAdapter implements Shape
{
    public function __construct(private LegacyRectangle $legacyRectangle) {}

    public function getArea(): float
    {
        return $this->legacyRectangle->calculateArea();
    }
}

// Client code
class AreaCalculator
{
    public function __construct(Shape $shape) {
        $this->shape = $shape;
    }

    public function calculate(): float {
        return $this->shape->getArea();
    }
}

// Usage
$legacyRectangle = new LegacyRectangle(5, 10);
$adapter = new RectangleAdapter($legacyRectangle);

$calculator = new AreaCalculator($adapter);
echo "Area: " . $calculator->calculate() . PHP_EOL;
```