---
title: "Factory Method - Rust"
date: 2025-12-03T10:58:43.031-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Rust"]
---
The Factory Method is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate. It promotes loose coupling by allowing the client to work with an abstract type, deferring the concrete class selection to factory subclasses.

This Rust implementation uses a trait `Vehicle` to define the common interface for different vehicle types. The `VehicleFactory` trait declares the `create_vehicle` method, which is the factory method. Concrete factories, like `CarFactory` and `MotorcycleFactory`, implement this trait to return specific vehicle types. The client code interacts with the factory interface, not the concrete vehicle classes, achieving decoupling.  Rust's traits and the `Box<dyn Trait>` type are used to achieve polymorphism and abstract the concrete types, fitting the language's ownership and borrowing principles.

```rust
// Define the product interface
trait Vehicle {
    fn drive(&self);
}

// Concrete products
struct Car {
    model: String,
}

impl Car {
    fn new(model: String) -> Self {
        Car { model }
    }
}

impl Vehicle for Car {
    fn drive(&self) {
        println!("Driving a {}!", self.model);
    }
}

struct Motorcycle {
    engine_size: u32,
}

impl Motorcycle {
    fn new(engine_size: u32) -> Self {
        Motorcycle { engine_size }
    }
}

impl Vehicle for Motorcycle {
    fn drive(&self) {
        println!("Riding a motorcycle with {}cc engine!", self.engine_size);
    }
}

// The Creator (abstract factory)
trait VehicleFactory {
    fn create_vehicle(&self) -> Box<dyn Vehicle>;
}

// Concrete Creators
struct CarFactory {
    model: String,
}

impl CarFactory {
    fn new(model: String) -> Self {
        CarFactory { model }
    }
}

impl VehicleFactory for CarFactory {
    fn create_vehicle(&self) -> Box<dyn Vehicle> {
        Box::new(Car::new(self.model.clone()))
    }
}

struct MotorcycleFactory {
    engine_size: u32,
}

impl MotorcycleFactory {
    fn new(engine_size: u32) -> Self {
        MotorcycleFactory { engine_size }
    }
}

impl VehicleFactory for MotorcycleFactory {
    fn create_vehicle(&self) -> Box<dyn Vehicle> {
        Box::new(Motorcycle::new(self.engine_size))
    }
}

fn main() {
    let car_factory = CarFactory::new("Sedan".to_string());
    let motorcycle_factory = MotorcycleFactory::new(1000);

    let car = car_factory.create_vehicle();
    let motorcycle = motorcycle_factory.create_vehicle();

    car.drive();
    motorcycle.drive();
}
```