---
title: "Prototype - C++"
date: 2025-12-03T11:02:01.609-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["C++"]
---
The Prototype pattern creates new objects by cloning an existing object (the prototype). This avoids the expense of creating new objects from scratch, particularly when object creation is complex.  It’s useful when the specific types of objects to create are determined at runtime.

The code demonstrates a simple Prototype pattern using a base class `Shape` with a virtual `clone()` method. Concrete shapes (`Circle`, `Rectangle`) inherit from `Shape` and override `clone()` to return a new instance of themselves. A `ShapeFactory` manages prototypes of different shapes, allowing clients to request clones without knowing the concrete classes. This leverages C++’s polymorphism and dynamic memory allocation for flexible object creation, aligning with its OOP capabilities. The use of virtual destructors in the base class prevents memory leaks when dealing with polymorphic object deletion.

```cpp
#include <iostream>
#include <string>
#include <map>

class Shape {
public:
  virtual ~Shape() = default;
  virtual Shape* clone() = 0;
  virtual void draw() = 0;
  virtual std::string type() const = 0;
};

class Circle : public Shape {
public:
  Circle(int radius) : radius_(radius) {}
  Shape* clone() override { return new Circle(radius_); }
  void draw() override { std::cout << "Drawing a Circle" << std::endl; }
  std::string type() const override { return "Circle"; }
private:
  int radius_;
};

class Rectangle : public Shape {
public:
  Rectangle(int width, int height) : width_(width), height_(height) {}
  Shape* clone() override { return new Rectangle(width_, height_); }
  void draw() override { std::cout << "Drawing a Rectangle" << std::endl; }
  std::string type() const override { return "Rectangle"; }
private:
  int width_;
  int height_;
};

class ShapeFactory {
public:
  void registerPrototype(const std::string& type, Shape* prototype) {
    prototypes_[type] = prototype;
  }

  Shape* createShape(const std::string& type) {
    auto it = prototypes_.find(type);
    if (it != prototypes_.end()) {
      return it->second->clone();
    }
    return nullptr;
  }

private:
  std::map<std::string, Shape*> prototypes_;
};

int main() {
  ShapeFactory factory;
  factory.registerPrototype("Circle", new Circle(5));
  factory.registerPrototype("Rectangle", new Rectangle(10, 20));

  Shape* circle = factory.createShape("Circle");
  Shape* rectangle = factory.createShape("Rectangle");

  circle->draw();
  rectangle->draw();

  delete circle;
  delete rectangle;
  
  // Clean up prototypes to avoid memory leaks, important for longer-lived factories
  for(auto const& [key, val] : factory.prototypes_) {
    delete val;
  }

  return 0;
}
```