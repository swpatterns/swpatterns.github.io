---
title: "Specification - Swift"
date: 2025-12-03T13:53:08.810-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Swift"]
---
The Specification pattern decouples the construction of a complex object from its representation. It defines a class that represents the desired properties of an object, and separate "builder" classes that implement these specifications to create the object. This promotes flexibility and allows for creating different variations of an object based on different specifications without modifying the object's core construction logic.

The Swift code defines a `Specification` protocol outlining the properties a valid object must have. A `Person` struct represents the object being built. Concrete specifications like `YoungAdultSpecification` and `EmployedSpecification` check for specific criteria. A `PersonBuilder` constructs the `Person` incrementally, and the `SpecificationValidator` ensures the built object meets the given specifications before finalizing it. This approach leverages Swift's protocols and structs for a clean, type-safe implementation.

```swift
// Specification.swift

protocol Specification {
    func isSatisfiedBy(_ candidate: Person) -> Bool
}

struct Person {
    let name: String
    let age: Int
    let isEmployed: Bool
}

struct YoungAdultSpecification: Specification {
    func isSatisfiedBy(_ candidate: Person) -> Bool {
        return candidate.age >= 18 && candidate.age <= 30
    }
}

struct EmployedSpecification: Specification {
    func isSatisfiedBy(_ candidate: Person) -> Bool {
        return candidate.isEmployed
    }
}

class PersonBuilder {
    private var name: String = ""
    private var age: Int = 0
    private var isEmployed: Bool = false

    func withName(_ name: String) -> Self {
        self.name = name
        return self
    }

    func withAge(_ age: Int) -> Self {
        self.age = age
        return self
    }

    func withEmployment(_ isEmployed: Bool) -> Self {
        self.isEmployed = isEmployed
        return self
    }

    func build() -> Person {
        return Person(name: name, age: age, isEmployed: isEmployed)
    }
}

class SpecificationValidator {
    static func validate(_ person: Person, against specifications: [Specification]) -> Bool {
        return specifications.allSatisfy { spec in
            spec.isSatisfiedBy(person)
        }
    }
}

// Example Usage
let builder = PersonBuilder()
    .withName("Alice")
    .withAge(25)
    .withEmployment(true)

let person = builder.build()

let specifications: [Specification] = [YoungAdultSpecification(), EmployedSpecification()]

if SpecificationValidator.validate(person, against: specifications) {
    print("Person is valid")
} else {
    print("Person is invalid")
}
```