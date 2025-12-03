---
title: "Adapter - C++"
date: 2025-12-03T11:27:38.434-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["C++"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. This is achieved by creating a wrapper class (the Adapter) that translates calls from the client to the adaptee.

The C++ example demonstrates adapting a `LegacyRectangle` class (with a different interface for calculating area) to the `Shape` interface.  The `RectangleAdapter` class implements `Shape` and internally uses a `LegacyRectangle` object.  The `calculate_area()` method of the adapter translates the client's request into a call to the `LegacyRectangle`'s `area()` method. This implementation uses inheritance, a common approach in C++ for adapting interfaces, and follows standard C++ naming and class structure conventions.

```cpp
#include <iostream>

// The Target interface (Shape)
class Shape {
public:
  virtual double calculate_area() = 0;
};

// The Adaptee class (LegacyRectangle)
class LegacyRectangle {
public:
  LegacyRectangle(double w, double h) : width_(w), height_(h) {}

  double area() {
    return width_ * height_;
  }

private:
  double width_;
  double height_;
};

// The Adapter class (RectangleAdapter)
class RectangleAdapter : public Shape {
public:
  RectangleAdapter(LegacyRectangle* legacyRect) : legacy_rect_(legacyRect) {}

  double calculate_area() override {
    return legacy_rect_->area();
  }

private:
  LegacyRectangle* legacy_rect_;
};

int main() {
  LegacyRectangle* legacyRect = new LegacyRectangle(5.0, 4.0);
  RectangleAdapter adapter(legacyRect);

  std::cout << "Area of the rectangle: " << adapter.calculate_area() << std::endl;

  delete legacyRect;
  return 0;
}
```