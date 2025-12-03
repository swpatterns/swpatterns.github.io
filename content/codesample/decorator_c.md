---
title: "Decorator - C"
date: 2025-12-03T11:39:46.219-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["C"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Here, we define a base `Coffee` interface and concrete implementations like `SimpleCoffee`.  Decorators, like `MilkDecorator` and `SugarDecorator`, wrap a `Coffee` object and add their own behavior (milk or sugar) without altering the original `Coffee`'s class.  The `decorate()` method recursively adds decorators, building up the desired functionality. This C implementation uses function pointers to achieve the dynamic behavior, a common approach in C for simulating polymorphism and achieving flexibility similar to interfaces in other languages.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Component Interface
typedef struct Coffee Coffee;
typedef void (*CoffeeFunc)(Coffee*);

struct Coffee {
  CoffeeFunc drink;
  char* description;
};

void simpleCoffeeDrink(Coffee* coffee) {
  printf("Drinking a simple coffee: %s\n", coffee->description);
}

// Concrete Component
Coffee* createSimpleCoffee() {
  Coffee* coffee = (Coffee*)malloc(sizeof(Coffee));
  if (coffee == NULL) {
    perror("Failed to allocate memory for coffee");
    exit(EXIT_FAILURE);
  }
  coffee->drink = simpleCoffeeDrink;
  coffee->description = strdup("Simple Coffee");
  return coffee;
}

// Decorator
typedef struct CoffeeDecorator CoffeeDecorator;

struct CoffeeDecorator {
  Coffee* coffee;
  char* description;
};

CoffeeDecorator* createCoffeeDecorator(Coffee* coffee) {
  CoffeeDecorator* decorator = (CoffeeDecorator*)malloc(sizeof(CoffeeDecorator));
  if (decorator == NULL) {
    perror("Failed to allocate memory for decorator");
    exit(EXIT_FAILURE);
  }
  decorator->coffee = coffee;
  decorator->description = strdup("Decorated Coffee");
  return decorator;
}

// Concrete Decorators
typedef struct MilkDecorator MilkDecorator;
typedef struct SugarDecorator SugarDecorator;

struct MilkDecorator {
  CoffeeDecorator base;
  char* milk_description;
};

struct SugarDecorator {
  CoffeeDecorator base;
  char* sugar_description;
};

void milkDecoratorDrink(CoffeeDecorator* decorator) {
  printf("Adding milk: %s\n", decorator->base.coffee->description);
  printf("Drinking a coffee with milk: %s\n", decorator->milk_description);
}

void sugarDecoratorDrink(CoffeeDecorator* decorator) {
  printf("Adding sugar: %s\n", decorator->base.coffee->description);
  printf("Drinking a coffee with sugar: %s\n", decorator->sugar_description);
}

CoffeeDecorator* createMilkDecorator(Coffee* coffee) {
  CoffeeDecorator* decorator = createCoffeeDecorator(coffee);
  MilkDecorator* milkDecorator = (MilkDecorator*)decorator;
  milkDecorator->milk_description = strdup("Milk Coffee");
  milkDecorator->base.coffee->drink(milkDecorator); // Call the underlying coffee's drink method
  return decorator;
}

CoffeeDecorator* createSugarDecorator(Coffee* coffee) {
  CoffeeDecorator* decorator = createCoffeeDecorator(coffee);
  SugarDecorator* sugarDecorator = (SugarDecorator*)decorator;
  sugarDecorator->sugar_description = strdup("Sugar Coffee");
  sugarDecorator->base.coffee->drink(sugarDecorator); // Call the underlying coffee's drink method
  return decorator;
}

int main() {
  Coffee* simple = createSimpleCoffee();

  CoffeeDecorator* milk = createMilkDecorator(simple);

  CoffeeDecorator* sugar = createSugarDecorator(milk);

  // Cleanup (important in C)
  free(simple->description);
  free(simple);
  free(milk->milk_description);
  free(milk);
  free(sugar->sugar_description);
  free(sugar);

  return 0;
}
```