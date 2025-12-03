---
title: "Template Method - JavaScript"
date: 2025-12-03T13:37:08.699-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["JavaScript"]
---
The Template Method pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and avoids duplication.

The JavaScript example defines an abstract `CaffeineBeverage` class with a `prepareBeverage` method that outlines the beverage preparation process. Concrete classes like `Coffee` and `Tea` inherit from `CaffeineBeverage` and override the specific steps (e.g., `brew`, `addCondiments`) while maintaining the overall preparation sequence. JavaScript's prototypal inheritance and function overriding capabilities make this pattern a natural fit, leveraging the language's flexibility without requiring explicit interface definitions.

```javascript
// CaffeineBeverage.js
class CaffeineBeverage {
  prepareBeverage() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
    return "Enjoy your " + this.getName();
  }

  boilWater() {
    console.log("Boiling water...");
  }

  pourInCup() {
    console.log("Pouring into cup...");
  }

  addCondiments() {
    console.log("Adding condiments...");
  }

  getName() {
    return "beverage";
  }
}

// Coffee.js
class Coffee extends CaffeineBeverage {
  brew() {
    console.log("Brewing coffee...");
  }

  addCondiments() {
    console.log("Adding sugar and milk...");
  }

  getName() {
    return "coffee";
  }
}

// Tea.js
class Tea extends CaffeineBeverage {
  brew() {
    console.log("Steeping tea...");
  }

  addCondiments() {
    console.log("Adding lemon...");
  }

  getName() {
    return "tea";
  }
}

// App.js
const coffee = new Coffee();
const tea = new Tea();

console.log(coffee.prepareBeverage());
console.log(tea.prepareBeverage());
```