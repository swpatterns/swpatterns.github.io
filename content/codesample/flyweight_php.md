---
title: "Flyweight - PHP"
date: 2025-12-03T12:44:23.288-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["PHP"]
---
The Flyweight pattern aims to minimize memory usage by sharing objects that are similar. It achieves this by separating an object's state into intrinsic (shared) and extrinsic (unique) parts.  Intrinsic state is stored within the flyweight object, while extrinsic state is passed to the flyweight when needed. This example demonstrates flyweights for representing simple geometric shapes (circles). The `Circle` class is the flyweight, storing the color (intrinsic). The x and y coordinates are extrinsic and passed to the `draw` method. This is idiomatic PHP as it leverages classes and methods for organization, and avoids unnecessary object creation by reusing the `Circle` object with different coordinates.

```php
<?php

/**
 * Flyweight Interface
 */
interface CircleInterface {
    public function draw(float $x, float $y): void;
}

/**
 * Concrete Flyweight: Circle
 */
class Circle implements CircleInterface {
    private string $color;

    public function __construct(string $color) {
        $this->color = $color;
    }

    public function draw(float $x, float $y): void {
        echo "Drawing a {$this->color} circle at ({$x}, {$y}).\n";
    }

    public function getColor(): string {
        return $this->color;
    }
}

/**
 * Flyweight Factory
 */
class CircleFactory {
    private array $circles = [];

    public function getCircle(string $color): CircleInterface {
        $colorKey = $color;
        if (!isset($this->circles[$colorKey])) {
            $this->circles[$colorKey] = new Circle($color);
        }
        return $this->circles[$colorKey];
    }
}

// Usage
$factory = new CircleFactory();

$circle1 = $factory->getCircle('red');
$circle1->draw(10, 10);

$circle2 = $factory->getCircle('blue');
$circle2->draw(20, 20);

$circle3 = $factory->getCircle('red'); // Reuse existing red circle
$circle3->draw(30, 30);

?>
```