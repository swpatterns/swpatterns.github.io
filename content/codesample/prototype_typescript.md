---
title: "Prototype - TypeScript"
date: 2025-12-03T11:01:24.025-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["TypeScript"]
---
The Prototype pattern is a creational design pattern that allows you to create new objects by cloning an existing object—the prototype. Instead of relying on a constructor function and `new` operator, it uses a prototype object to create copies. This is especially useful when creating objects is expensive or complex, and you want to avoid repetitive initialization.

The code implements the pattern using TypeScript classes and the `Object.assign()` method for shallow cloning. `Animal` is the base prototype, and concrete animal types like `Dog` and `Cat` can be cloned without knowing their specific construction details.  TypeScript's class-based structure nicely supports defining prototype interfaces, and `Object.assign()` provides a concise way to achieve cloning, fitting idiomatic TypeScript style by leaning into built-in JavaScript functionalities where appropriate.

```typescript
// Prototype Interface
interface Animal {
  species: string;
  name: string;
  makeSound(): string;
  clone(): Animal;
}

// Concrete Prototype
class Dog implements Animal {
  species: string = "Dog";
  name: string;
  breed: string;

  constructor(name: string, breed: string) {
    this.name = name;
    this.breed = breed;
  }

  makeSound(): string {
    return "Woof!";
  }

  clone(): Animal {
    return Object.assign({}, this); // Shallow copy
  }
}

class Cat implements Animal {
  species: string = "Cat";
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  makeSound(): string {
    return "Meow!";
  }

  clone(): Animal {
    return Object.assign({}, this); // Shallow copy
  }
}

// Usage
const myDog = new Dog("Buddy", "Golden Retriever");
const clonedDog = myDog.clone();

const myCat = new Cat("Whiskers", "Gray");
const clonedCat = myCat.clone();

console.log(myDog.name, myDog.breed, myDog.makeSound());
console.log(clonedDog.name, clonedDog.breed, clonedDog.makeSound());

console.log(myCat.name, myCat.color, myCat.makeSound());
console.log(clonedCat.name, clonedCat.color, clonedCat.makeSound());
```