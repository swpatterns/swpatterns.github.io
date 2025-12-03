---
title: "Visitor - C"
date: 2025-12-03T13:42:48.338-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["C"]
---
The Visitor pattern allows you to add new operations to a hierarchy of objects without modifying the objects themselves. It achieves this by defining a separate "visitor" class that implements the operations, and then having each element in the hierarchy "accept" the visitor, allowing it to perform its operation. This promotes the Open/Closed Principle.

In this C implementation, we have an abstract `Animal` structure and concrete types like `Dog` and `Cat`. The `Animal` defines an `accept` method taking a `Visitor` pointer.  Each concrete animal type implements the `accept` method to call the appropriate `visit` method on the visitor, passing itself as an argument. The `Visitor` abstract structure defines `visit` methods for each concrete animal type.  A concrete visitor, `AnimalSoundVisitor`, demonstrates how to add a new operation (making a sound) without altering the animal classes.  This uses function pointers to achieve polymorphism, a common C technique.

```c
#include <stdio.h>

// Forward declaration of Animal
typedef struct Animal Animal;

// Visitor interface
typedef struct Visitor Visitor;
struct Visitor {
    void (*visitDog)(Animal* animal);
    void (*visitCat)(Animal* animal);
};

// Animal base class
struct Animal {
    void (*accept)(Animal* animal, Visitor* visitor);
};

// Concrete animal: Dog
typedef struct Dog Dog;
struct Dog {
    Animal base;
};

void dogAccept(Animal* animal, Visitor* visitor) {
    visitor->visitDog((Dog*)animal);
}

// Concrete animal: Cat
typedef struct Cat Cat;
struct Cat {
    Animal base;
};

void catAccept(Animal* animal, Visitor* visitor) {
    visitor->visitCat((Cat*)animal);
}

// Concrete visitor: AnimalSoundVisitor
typedef struct AnimalSoundVisitor AnimalSoundVisitor;
struct AnimalSoundVisitor {
    Visitor base;
};

void dogVisit(Animal* animal) {
    printf("Woof!\n");
}

void catVisit(Animal* animal) {
    printf("Meow!\n");
}

AnimalSoundVisitor createAnimalSoundVisitor() {
    AnimalSoundVisitor visitor;
    visitor.base.visitDog = dogVisit;
    visitor.base.visitCat = catVisit;
    return visitor;
}

// Example Usage
int main() {
    Dog dog;
    dog.base.accept = dogAccept;

    Cat cat;
    cat.base.accept = catAccept;

    AnimalSoundVisitor soundVisitor = createAnimalSoundVisitor();

    dog.base.accept(&dog, &soundVisitor.base);
    cat.base.accept(&cat, &soundVisitor.base);

    return 0;
}
```