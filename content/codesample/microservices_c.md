---
title: "Microservices - C"
date: 2025-12-03T14:43:17.965-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["C"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service handles a specific function and communicates with others, often via HTTP. This example simulates a simplified e-commerce system with 'product' and 'order' services.  It uses basic C structures and functions to represent the services and their interactions.  While C isn't a typical choice for microservices due to its lack of built-in concurrency and networking features, this demonstrates the *architectural* concept.  The use of function pointers allows for a degree of decoupling, simulating service calls.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Product Service
typedef struct {
    int id;
    char name[50];
    float price;
} Product;

typedef int (*getProductFunc)(int, Product*);

int getProductDetails(int id, Product* product) {
    // Simulate database lookup
    if (id == 1) {
        strcpy(product->name, "Laptop");
        product->price = 1200.00;
        return 0; // Success
    } else {
        return -1; // Product not found
    }
}

// Order Service
typedef struct {
    int orderId;
    int productId;
    int quantity;
} Order;

typedef int (*processOrderFunc)(Order*);

int processOrder(Order* order) {
    // Simulate order processing logic
    if (order->quantity > 0) {
        printf("Order processed: Order ID: %d, Product ID: %d, Quantity: %d\n",
               order->orderId, order->productId, order->quantity);
        return 0; // Success
    } else {
        return -1; // Invalid quantity
    }
}

int main() {
    Product product;
    Order order;

    // Product Service Call
    getProductFunc getProduct = &getProductDetails;
    if (getProduct(1, &product) == 0) {
        printf("Product found: ID: %d, Name: %s, Price: %.2f\n",
               product.id, product.name, product.price);
    } else {
        printf("Product not found.\n");
    }

    // Order Service Call
    processOrderFunc process = &processOrder;
    order.orderId = 101;
    order.productId = 1;
    order.quantity = 2;

    if (process(&order) == 0) {
        printf("Order processing successful.\n");
    } else {
        printf("Order processing failed.\n");
    }

    return 0;
}
```