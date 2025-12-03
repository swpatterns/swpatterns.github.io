---
title: "Facade - JavaScript"
date: 2025-12-03T11:42:27.475-05:00
draft: false
pattern_usage: ["Facade"]
language: ["JavaScript"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components, making the system easier to use. This example demonstrates a facade for ordering a pizza, encapsulating the complexities of checking ingredients, preparing the dough, adding toppings, and baking. The `PizzaOrderFacade` provides a single `orderPizza` method, hiding the internal steps. This aligns with JavaScript's flexible nature, allowing for easy object composition and a clean, readable API.

```javascript
// Subsystem classes
class Dough {
  prepare() {
    console.log("Preparing the dough...");
  }
}

class Sauce {
  addSauce() {
    console.log("Adding tomato sauce...");
  }
}

class Toppings {
  add(topping) {
    console.log(`Adding ${topping}...`);
  }
}

class Baking {
  bake() {
    console.log("Baking the pizza...");
  }
}

// Facade class
class PizzaOrderFacade {
  constructor() {
    this.dough = new Dough();
    this.sauce = new Sauce();
    this.toppings = new Toppings();
    this.baking = new Baking();
  }

  orderPizza(topping1, topping2) {
    this.dough.prepare();
    this.sauce.addSauce();
    this.toppings.add(topping1);
    this.toppings.add(topping2);
    this.baking.bake();
    console.log("Pizza is ready!");
  }
}

// Usage
const order = new PizzaOrderFacade();
order.orderPizza("pepperoni", "cheese");
```