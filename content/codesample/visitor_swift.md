---
title: "Visitor - Swift"
date: 2025-12-03T13:44:02.219-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Swift"]
---
The Visitor pattern allows you to define a new operation without modifying the classes of the objects on which it operates. It's achieved by moving the operation to a separate "visitor" class that accepts different object types as arguments. This is useful when you have a complex object structure and want to add operations that depend on the specific types within that structure.

This Swift implementation defines a `Vehicle` protocol with concrete types `Car` and `Bike`. The `VehicleVisitor` protocol declares `visit` methods for each vehicle type. `CarVisitor` and `BikeVisitor` are concrete visitors implementing specific actions (e.g., calculating cost). The `client` code accepts a visitor and each vehicle, calling the appropriate `visit` method on the visitor. This adheres to Swift's protocol-oriented programming style, leveraging protocols for defining the interface and concrete types for implementation.

```swift
// Vehicle Protocol
protocol Vehicle {
    func accept(visitor: VehicleVisitor)
}

// Concrete Vehicles
class Car: Vehicle {
    let model: String
    init(model: String) {
        self.model = model
    }
    func accept(visitor: VehicleVisitor) {
        visitor.visit(car: self)
    }
}

class Bike: Vehicle {
    let style: String
    init(style: String) {
        self.style = style
    }
    func accept(visitor: VehicleVisitor) {
        visitor.visit(bike: self)
    }
}

// Visitor Protocol
protocol VehicleVisitor {
    func visit(car: Car)
    func visit(bike: Bike)
}

// Concrete Visitors
class CarCostVisitor: VehicleVisitor {
    var cost: Int = 0
    func visit(car: Car) {
        cost += 100 + (car.model.count * 10)
    }
    func visit(bike: Bike) {
        // Do nothing for bikes in this visitor
    }
}

class BikeCostVisitor: VehicleVisitor {
    var cost: Int = 0
    func visit(car: Car) {
        // Do nothing for cars in this visitor
    }
    func visit(bike: Bike) {
        cost += 50 + (bike.style.count * 5)
    }
}

// Client Code
let car = Car(model: "Tesla Model S")
let bike = Bike(style: "Mountain Bike")

let carCostVisitor = CarCostVisitor()
car.accept(visitor: carCostVisitor)
print("Car cost: \(carCostVisitor.cost)")

let bikeCostVisitor = BikeCostVisitor()
bike.accept(visitor: bikeCostVisitor)
print("Bike cost: \(bikeCostVisitor.cost)")
```