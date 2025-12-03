---
title: "Factory Method - JavaScript"
date: 2025-12-03T10:57:09.044-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["JavaScript"]
---
The Factory Method is a creational design pattern that provides an interface for creating objects but lets subclasses decide which class to instantiate. This promotes loose coupling between the creator and the concrete objects created.  Here, we define a `VehicleFactory` with a `createVehicle` method.  Subclasses like `CarFactory` and `MotorcycleFactory` override this method to return specific vehicle types.  This allows adding new vehicle types without modifying the core `VehicleFactory` class. The implementation uses JavaScript's prototypal inheritance and class syntax (ES6+) for a clean and maintainable structure, aligning with modern JavaScript best practices.

```javascript
// Vehicle interface
class Vehicle {
  constructor(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }
}

// Concrete Vehicle classes
class Car extends Vehicle {
  constructor() {
    super("Car");
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super("Motorcycle");
  }
}

// Creator class (VehicleFactory)
class VehicleFactory {
  createVehicle(type) {
    if (type === "car") {
      return new Car();
    } else if (type === "motorcycle") {
      return new Motorcycle();
    } else {
      throw new Error("Invalid vehicle type");
    }
  }
}

// Concrete Creator classes (CarFactory, MotorcycleFactory) - demonstrating extension
class CarFactory extends VehicleFactory {
  createVehicle() {
    return new Car();
  }
}

class MotorcycleFactory extends VehicleFactory {
  createVehicle() {
    return new Motorcycle();
  }
}


// Usage
const factory = new VehicleFactory();
const car = factory.createVehicle("car");
const motorcycle = factory.createVehicle("motorcycle");

console.log(car.getType()); // Output: Car
console.log(motorcycle.getType()); // Output: Motorcycle

const carFactory = new CarFactory();
const anotherCar = carFactory.createVehicle();
console.log(anotherCar.getType()); // Output: Car
```