---
title: "Composite - C++"
date: 2025-12-03T11:35:33.390-05:00
draft: false
pattern_usage: ["Composite"]
language: ["C++"]
---
The Composite pattern treats individual objects and compositions of objects uniformly. It defines hierarchical elements (components) to represent whole-part relationships.  The client can interact with these components consistently without knowing whether it's dealing with a simple element or a complex composition. This example represents a graphical shapes hierarchy where shapes can be composed of other shapes. We define an abstract `Shape` class, concrete `Circle` and `Square` classes implementing the leaf nodes, and a `ShapeGroup` class representing a composite node. The `operation()` method (here, `area()`) is defined in the abstract class and implemented in all concrete classes, enabling uniform interaction with both primitive shapes and groups. This leverages C++’s polymorphism and class hierarchy for a natural and efficient composite structure.

```cpp
#include <iostream>
#include <vector>
#include <cmath>

// Component
class Shape {
public:
  virtual double area() = 0;
  virtual ~Shape() = default;
};

// Leaf
class Circle : public Shape {
private:
  double radius_;
public:
  Circle(double radius) : radius_(radius) {}
  double area() override { return M_PI * radius_ * radius_; }
};

// Leaf
class Square : public Shape {
private:
  double side_;
public:
  Square(double side) : side_(side) {}

  double area() override { return side_ * side_; }
};

// Composite
class ShapeGroup : public Shape {
private:
  std::vector<Shape*> shapes_;
public:
  void add(Shape* shape) { shapes_.push_back(shape); }
  void remove(Shape* shape) {
    for (size_t i = 0; i < shapes_.size(); ++i) {
      if (shapes_[i] == shape) {
        shapes_.erase(shapes_.begin() + i);
        return;
      }
    }
  }

  double area() override {
    double total_area = 0.0;
    for (Shape* shape : shapes_) {
      total_area += shape->area();
    }
    return total_area;
  }

  ~ShapeGroup() {
    for (Shape* shape : shapes_) {
      delete shape;
    }
  }
};

int main() {
  Shape* circle = new Circle(5.0);
  Shape* square = new Square(4.0);

  ShapeGroup* group = new ShapeGroup();
  group->add(circle);
  group->add(square);

  Shape* another_circle = new Circle(2.0);
  group->add(another_circle);

  std::cout << "Total area: " << group->area() << std::endl;

  delete group; // ShapeGroup destructor deletes contained shapes

  return 0;
}
```