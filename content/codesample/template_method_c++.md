---
title: "Template Method - C++"
date: 2025-12-03T13:38:01.165-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["C++"]
---
The Template Method pattern defines the skeleton of an algorithm in an abstract class, but lets subclasses redefine certain steps of the algorithm without changing its structure. It’s a behavioral pattern used for code reuse and to avoid redundant code.

The C++ code below implements the Template Method pattern for building a house. The `HouseBuilder` abstract class defines the overall process of building a house (`buildHouse()`) as a template method.  Concrete builders like `WoodenHouseBuilder` and `ConcreteHouseBuilder` override the specific steps (`buildWalls()`, `buildRoof()`, etc.) to create different types of houses, while the core sequence defined in `buildHouse()` remains consistent. This aligns with C++’s OOP principles, utilizing abstract classes and polymorphism.

```cpp
#include <iostream>
#include <string>

// Abstract class
class HouseBuilder {
public:
  virtual ~HouseBuilder() {}

  void buildHouse() {
    buildWalls();
    buildRoof();
    installWindows();
    installDoors();
    paintHouse();
  }

protected:
  virtual void buildWalls() = 0;
  virtual void buildRoof() = 0;
  virtual void installWindows() = 0;
  virtual void installDoors() = 0;
  virtual void paintHouse() = 0;
};

// Concrete class 1
class WoodenHouseBuilder : public HouseBuilder {
protected:
  void buildWalls() override {
    std::cout << "Building wooden walls" << std::endl;
  }

  void buildRoof() override {
    std::cout << "Building a wooden roof" << std::endl;
  }

  void installWindows() override {
    std::cout << "Installing wooden windows" << std::endl;
  }

  void installDoors() override {
    std::cout << "Installing wooden doors" << std::endl;
  }

  void paintHouse() override {
    std::cout << "Painting the wooden house" << std::endl;
  }
};

// Concrete class 2
class ConcreteHouseBuilder : public HouseBuilder {
protected:
  void buildWalls() override {
    std::cout << "Building concrete walls" << std::endl;
  }

  void buildRoof() override {
    std::cout << "Building a concrete roof" << std::endl;
  }

  void installWindows() override {
    std::cout << "Installing concrete windows" << std::endl;
  }

  void installDoors() override {
    std::cout << "Installing concrete doors" << std::endl;
  }

  void paintHouse() override {
    std::cout << "Painting the concrete house" << std::endl;
  }
};

int main() {
  WoodenHouseBuilder woodenBuilder;
  ConcreteHouseBuilder concreteBuilder;

  woodenBuilder.buildHouse();
  std::cout << std::endl;
  concreteBuilder.buildHouse();

  return 0;
}
```