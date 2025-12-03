---
title: "Prototype - JavaScript"
date: 2025-12-03T11:01:08.465-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["JavaScript"]
---
The Prototype pattern creates objects based on an initial, pre-existing object—the prototype—rather than a class. New objects inherit properties and methods from this prototype through the prototype chain. This avoids using class-based inheritance, providing a more flexible and dynamic approach to object creation. The code demonstrates this by defining a `Shape` prototype with a `draw` method. Specific shapes like `Circle` and `Square` are created by cloning the `Shape` prototype and customizing properties. This is idiomatic JavaScript as it leverages the language’s inherent prototypal inheritance, avoiding the need for `class` and `extends` keywords and embracing delegation.

```javascript
// Shape Prototype
function Shape(color) {
  this.color = color;
}

Shape.prototype.draw = function() {
  console.log(`Drawing a ${this.color} shape.`);
};

// Circle Prototype (inherits from Shape)
function Circle(color, radius) {
  // Clone the Shape prototype
  Shape.call(this, color);
  this.radius = radius;
}

// Set up prototype chain
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle; // Reset constructor

Circle.prototype.draw = function() {
  Shape.prototype.draw.call(this); // Call Shape's draw first
  console.log(`Radius: ${this.radius}`);
};

// Square Prototype (inherits from Shape)
function Square(color, side) {
  Shape.call(this, color);
  this.side = side;
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.draw = function() {
  Shape.prototype.draw.call(this);
  console.log(`Side: ${this.side}`);
};

// Usage
const myCircle = new Circle('red', 5);
myCircle.draw();

const mySquare = new Square('blue', 4);
mySquare.draw();
```