---
title: "Factory Method - C"
date: 2025-12-03T10:58:08.322-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["C"]
---
The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. It promotes loose coupling by relieving the client of direct object creation responsibilities. This implementation uses function pointers to achieve the factory method effect in C, as C doesn't natively support method overriding like OOP languages.  A `Product` struct represents the objects created, and a `Creator` struct holds a function pointer (`create_product`) that acts as the factory method. Different concrete creators assign different functions to this pointer, effectively changing the object creation logic. This approach is common in C for achieving polymorphism and flexibility without full-blown OOP.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Product
typedef struct {
  char* type;
} Product;

// Creator
typedef struct {
  Product (*create_product)(void);
} Creator;

// Concrete Products
Product create_product_a() {
  Product product;
  product.type = strdup("Product A");
  return product;
}

Product create_product_b() {
  Product product;
  product.type = strdup("Product B");
  return product;
}

// Concrete Creators
typedef struct {
  Creator base;
} ConcreteCreatorA, ConcreteCreatorB;

void init_creator_a(ConcreteCreatorA* creator) {
  creator->base.create_product = create_product_a;
}

void init_creator_b(ConcreteCreatorB* creator) {
  creator->base.create_product = create_product_b;
}

// Client
int main() {
  ConcreteCreatorA creator_a;
  init_creator_a(&creator_a);

  ConcreteCreatorB creator_b;
  init_creator_b(&creator_b);

  Product product_a = creator_a.base.create_product();
  Product product_b = creator_b.base.create_product();

  printf("Created: %s\n", product_a.type);
  printf("Created: %s\n", product_b.type);

  free(product_a.type);
  free(product_b.type);

  return 0;
}
```