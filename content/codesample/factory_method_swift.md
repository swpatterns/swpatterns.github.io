---
title: "Factory Method - Swift"
date: 2025-12-03T10:59:12.694-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Swift"]
---
The Factory Method is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate. It promotes loose coupling by decoupling concrete classes from their creation logic.  This example implements a `VehicleFactory` that defines a method `createVehicle()`. `CarFactory` and `MotorbikeFactory` subclass `VehicleFactory` to return `Car` or `Motorbike` instances respectively.  This is idiomatic Swift by utilizing inheritance and protocol-oriented programming to achieve polymorphism and encapsulation.  The `createVehicle()` method is a concrete implementation within each factory, adhering to the pattern's principle of deferred instantiation.

```swift
// Vehicle Protocol
protocol Vehicle {
    var name: String { get }
    func startEngine()
}

// Concrete Vehicle Classes
class Car: Vehicle {
    let name = "Car"
    func startEngine() {
        print("Car engine started.")
    }
}

class Motorbike: Vehicle {
    let name = "Motorbike"
    func startEngine() {
        print("Motorbike engine started.")
    }
}

// Factory Protocol
protocol VehicleFactory {
    func createVehicle() -> Vehicle
}

// Concrete Factories
class CarFactory: VehicleFactory {
    func createVehicle() -> Vehicle {
        return Car()
    }
}

class MotorbikeFactory: VehicleFactory {
    func createVehicle() -> Vehicle {
        return Motorbike()
    }
}

// Client Code
func driveVehicle(factory: VehicleFactory) {
    let vehicle = factory.createVehicle()
    print("Driving a: \(vehicle.name)")
    vehicle.startEngine()
}

// Usage Example
let carFactory = CarFactory()
driveVehicle(factory: carFactory)

let motorbikeFactory = MotorbikeFactory()
driveVehicle(factory: motorbikeFactory)
```