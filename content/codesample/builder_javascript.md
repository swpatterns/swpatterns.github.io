---
title: "Builder - JavaScript"
date: 2025-12-03T10:52:48.291-05:00
draft: false
pattern_usage: ["Builder"]
language: ["JavaScript"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. It allows for the separation of construction logic from the object's representation, enabling different variations of the object to be created using the same construction process.

This JavaScript implementation uses a `PizzaBuilder` class to construct `Pizza` objects. The builder has methods for each component (dough, sauce, toppings) and a `getResult()` method to return the final pizza. A `Director` class orchestrates the building process, defining common pizza "recipes" (e.g., Margherita, Spicy). This approach is idiomatic JavaScript as it leverages object literals and classes for structure, and functions (methods) to encapsulate the building steps, promoting code reusability and readability.

```javascript
// Product
class Pizza {
  constructor(dough, sauce, toppings) {
    this.dough = dough;
    this.sauce = sauce;
    this.toppings = toppings;
  }

  toString() {
    return `Dough: ${this.dough}, Sauce: ${this.sauce}, Toppings: ${this.toppings.join(', ')}`;
  }
}

// Builder
class PizzaBuilder {
  constructor() {
    this.dough = null;
    this.sauce = null;
    this.toppings = [];
  }

  reset() {
    this.dough = null;
    this.sauce = null;
    this.toppings = [];
  }

  setDough(dough) {
    this.dough = dough;
    return this;
  }

  setSauce(sauce) {
    this.sauce = sauce;
    return this;
  }

  addTopping(topping) {
    this.toppings.push(topping);
    return this;
  }

  getResult() {
    return new Pizza(this.dough, this.sauce, this.toppings);
  }
}

// Director
class Director {
  constructor(builder) {
    this.builder = builder;
  }

  setBuilder(builder) {
    this.builder = builder;
  }

  constructMargherita() {
    this.builder.setDough('thin crust').setSauce('tomato').addTopping('mozzarella').addTopping('basil');
  }

  constructSpicy() {
    this.builder.setDough('thick crust').setSauce('spicy marinara').addTopping('pepperoni').addTopping('jalapenos').addTopping('extra cheese');
  }
}

// Usage
const builder = new PizzaBuilder();
const director = new Director(builder);

director.constructMargherita();
const margherita = builder.getResult();
console.log(margherita.toString());

builder.reset();
director.constructSpicy();
const spicy = builder.getResult();
console.log(spicy.toString());
```