---
title: "Null Object - C++"
date: 2025-12-03T13:46:59.363-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["C++"]
---
The Null Object pattern provides a substitute for an object that would otherwise be null or undefined. Instead of checking for null, you can call methods on the null object, which will gracefully do nothing or return a default value, avoiding NullPointerExceptions or similar errors. This improves code readability and reduces conditional logic.

The C++ example defines a `Shape` base class with a virtual `draw()` method.  `Circle` and `Square` inherit from `Shape` and provide concrete implementations. `NullShape` also inherits from `Shape` but its `draw()` method is empty, effectively doing nothing.  The client code can then request a `Shape` without needing to check if it's null; it will always receive a valid object, even if it's a `NullShape`. This leverages polymorphism and avoids null checks, fitting C++'s object-oriented style.

```cpp
#include <iostream>

class Shape {
public:
  virtual void draw() = 0;
  virtual ~Shape() = default;
};

class Circle : public Shape {
public:
  void draw() override {
    std::cout << "Drawing a circle" << std::endl;
  }
};

class Square : public Shape {
public:
  void draw() override {
    std::cout << "Drawing a square" << std::endl;
  }
};

class NullShape : public Shape {
public:
  void draw() override {} // Do nothing
};

// Client code
int main() {
  Shape* shape1 = new Circle();
  Shape* shape2 = nullptr;
  Shape* shape3 = new NullShape();

  shape1->draw(); // Drawing a circle

  // Instead of: if (shape2 != nullptr) { shape2->draw(); }
  shape2 = shape3; // Assign the null object
  shape2->draw(); // Does nothing

  delete shape1;
  // No need to delete shape2 (it's a NullShape or nullptr, either is fine)
  // No need to delete shape3 (it's a NullShape, and its destructor is default)

  return 0;
}
```