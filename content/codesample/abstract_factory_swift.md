---
title: "Abstract Factory - Swift"
date: 2025-12-03T10:50:40.259-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Swift"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It’s a creational pattern that promotes loose coupling and allows for easy switching between different "look and feels" or object sets.

The Swift code defines a `VehicleFactory` protocol with a method to create a `Vehicle`.  Concrete factories, `FordFactory` and `ToyotaFactory`, implement this protocol, each producing specific vehicle types (e.g., `FordFocus`, `ToyotaCorolla`).  A `Vehicle` protocol defines common behavior, and concrete vehicles implement it.  The client code requests vehicles through the factory interface, decoupling it from the concrete vehicle classes. This implementation leverages Swift's protocols for defining interfaces and utilizes concrete types for the factory and product implementations, aligning with Swift's emphasis on type safety and clarity.

```swift
// Vehicle Protocol
protocol Vehicle {
    func drive()
}

// Concrete Vehicles
struct FordFocus: Vehicle {
    func drive() {
        print("Driving a Ford Focus")
    }
}

struct ToyotaCorolla: Vehicle {
    func drive() {
        print("Driving a Toyota Corolla")
    }
}

// Abstract Factory Protocol
protocol VehicleFactory {
    func createVehicle() -> Vehicle
}

// Concrete Factories
struct FordFactory: VehicleFactory {
    func createVehicle() -> Vehicle {
        return FordFocus()
    }
}

struct ToyotaFactory: VehicleFactory {
    func createVehicle() -> Vehicle {
        return ToyotaCorolla()
    }
}

// Client Code
func clientCode(factory: VehicleFactory) {
    let vehicle = factory.createVehicle()
    vehicle.drive()
}

// Usage
let fordFactory = FordFactory()
clientCode(factory: fordFactory)

let toyotaFactory = ToyotaFactory()
clientCode(factory: toyotaFactory)
```