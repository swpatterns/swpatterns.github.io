---
title: "Bridge - PHP"
date: 2025-12-03T11:33:17.002-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["PHP"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different implementations. This is useful when you want to avoid a tight coupling between abstract and concrete classes, allowing you to change implementations independently without affecting the abstraction.

The code demonstrates a `Shape` abstraction and concrete abstractions like `Circle` and `Rectangle`.  These rely on an `Color` interface implemented by `RedColor` and `BlueColor`.  A shape's color isn't tied to its type; you can have a red circle or a blue rectangle. This decoupling is achieved by the `Shape` classes holding an instance of the `Color` interface. This approach is idiomatic PHP as it leverages interfaces for loose coupling and allows for flexible composition over inheritance.

```php
<?php

// Color Interface (Implementation)
interface Color
{
    public function applyColor(): string;
}

// Concrete Implementations of Color
class RedColor implements Color
{
    public function applyColor(): string
    {
        return "Applying Red Color.";
    }
}

class BlueColor implements Color
{
    public function applyColor(): string
    {
        return "Applying Blue Color.";
    }
}

// Shape Abstraction
interface Shape
{
    public function draw(): string;
}

// Concrete Implementations of Shape
class Circle implements Shape
{
    protected Color $color;

    public function __construct(Color $color)
    {
        $this->color = $color;
    }

    public function draw(): string
    {
        return "Drawing a Circle " . $this->color->applyColor();
    }
}

class Rectangle implements Shape
{
    protected Color $color;

    public function __construct(Color $color)
    {
        $this->color = $color;
    }

    public function draw(): string
    {
        return "Drawing a Rectangle " . $this->color->applyColor();
    }
}

// Client Code
$redCircle = new Circle(new RedColor());
$blueRectangle = new Rectangle(new BlueColor());

echo $redCircle->draw() . PHP_EOL;
echo $blueRectangle->draw() . PHP_EOL;

?>
```