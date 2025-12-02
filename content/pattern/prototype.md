---
title: "Prototype"
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational", "object-creation"]
wikipedia: "https://en.wikipedia.org/wiki/Prototype_pattern"
diagramtype: "class"
diagram: "[Client]--[Prototype] : creates clone()<br>[Prototype]--[ConcretePrototypeA] : extends<br>[Prototype]--[ConcretePrototypeB] : extends"
code: true
---

The Prototype pattern is a creational design pattern that empowers you to create new objects by cloning existing ones, offering a flexible alternative to traditional instantiation methods. Instead of specifying new object creation through classes, it delegates the creation responsibility to a prototype instance. This proves particularly useful when the creation process is expensive or complex, or when the exact type of objects to be created isn't known in advance.

This pattern avoids the limitations of class hierarchies for object creation, enabling the creation of a hierarchical structure of objects by using existing instances as prototypes. It relies on the abstract `Prototype` interface, defining the `clone()` method, which is implemented by concrete prototype classes. Clients request new objects by calling `clone()` on a prototype, resulting in identical copies with potentially modified state.

## Usage

The Prototype pattern is frequently used in scenarios like:

*   **Object Creation is Expensive:** When creating an object involves significant computational cost, cloning an existing instance can be much faster.
*   **Reducing Class Instantiation:** Avoid creating multiple classes that differ only in a small number of initialization parameters.
*   **Dynamic Object Creation:** When the specific types of objects to be created are determined at runtime, prototypes allow for flexible instantiation.
*   **Configuration Management:**  Creating default configurations or templates by cloning a base object.
*   **Game Development:** Cloning game objects (e.g., enemies, power-ups) efficiently is a common use case.

## Examples

*   **JavaScript Object.create():** JavaScript's `Object.create()` method internally utilizes the Prototype pattern. It allows you to create new objects with specified prototype objects, inheriting properties and methods from the prototype.
    javascript
    const animal = {
      type: 'animal',
      makeSound: function() { console.log('Generic animal sound'); }
    };

    const dog = Object.create(animal);
    dog.type = 'dog';
    dog.makeSound = function() { console.log('Woof!'); };

    console.log(dog.type); // Output: dog
    dog.makeSound(); // Output: Woof!
    

*   **Git:** The version control system Git essentially uses a prototype pattern when branching. A new branch is created as a shallow copy (prototype) of the existing branch, after which changes are applied to the new branch without modifying the original. This allows for experimentation and parallel development. Technically, Git uses content-addressable storage and only stores unique content, but from a conceptual point of view, the branching logic resembles the Prototype pattern.