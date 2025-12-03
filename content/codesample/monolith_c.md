---
title: "Monolith - C"
date: 2025-12-03T14:25:59.415-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["C"]
---
The Monolith pattern represents a traditional, unified application architecture where all components are tightly coupled and deployed as a single unit. This contrasts with microservices, where applications are composed of independent services. The implementation here shows a basic simulation of an order processing system—receiving orders, validating them, updating inventory, and processing payments—all contained within a single `order_system.c` file and `main` function. This monolithic approach is common in C, where direct dependency management is usually handled at the compilation stage and a large, single executable is often the norm, especially for resource-constrained or simple applications. There's minimal attempt at abstraction beyond function definitions, reflecting C's procedural nature and the typical simplicity of monoliths.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Data structures (shared across the monolith)
typedef struct {
    int item_id;
    int quantity;
} OrderItem;

typedef struct {
    int order_id;
    OrderItem items[10];
    int num_items;
} Order;

// Global state (common in monoliths - be cautious!)
int inventory[10] = {10, 5, 20, 15, 8, 12, 6, 18, 11, 7}; 

// Function prototypes
int receive_order(Order *order);
int validate_order(Order *order);
int update_inventory(Order *order);
int process_payment(Order *order, double amount);
void print_order(Order *order);

int main() {
    Order order;
    order.order_id = 123;
    order.num_items = 2;

    order.items[0].item_id = 0;
    order.items[0].quantity = 2;

    order.items[1].item_id = 1;
    order.items[1].quantity = 1;

    if (receive_order(&order) == 0) {
        if (validate_order(&order) == 0) {
            double total_amount = order.items[0].quantity * 10.0 + order.items[1].quantity * 15.0; // Simple price calculation
            if (update_inventory(&order) == 0) {
                if (process_payment(&order, total_amount) == 0) {
                    printf("Order processed successfully!\n");
                    print_order(&order);
                } else {
                    printf("Payment processing failed.\n");
                }
            } else {
                printf("Inventory update failed.\n");
            }
        } else {
            printf("Order validation failed.\n");
        }
    } else {
        printf("Order reception failed.\n");
    }
    

    return 0;
}

// Receive Order (simply assigns values, in a real scenario, this would involve network calls or file reads)
int receive_order(Order *order) {
    // In a real system. handle errors, logging, etc.
    return 0; // Success
}

// Validate Order
int validate_order(Order *order) {
    for (int i = 0; i < order->num_items; i++) {
        if (order->items[i].item_id < 0 || order->items[i].item_id >= 10) {
            printf("Invalid item ID: %d\n", order->items[i].item_id);
            return -1; // Failure
        }
        if (order->items[i].quantity <= 0) {
            printf("Invalid quantity: %d\n", order->items[i].quantity);
            return -1; // Failure
        }

    }
    return 0; // Success
}

// Update Inventory
int update_inventory(Order *order) {
    for (int i = 0; i < order->num_items; i++) {
        int item_id = order->items[i].item_id;
        int quantity = order->items[i].quantity;

        if (inventory[item_id] < quantity) {
            printf("Not enough stock for item %d\n", item_id);
            return -1; // Failure
        }
        inventory[item_id] -= quantity;
    }
    return 0; // Success
}

// Process Payment
int process_payment(Order *order, double amount) {
    // Simulate payment processing (e.g., interacting with a payment gateway)
    printf("Processing payment of %.2f for order %d\n", amount, order->order_id);
    return 0; // Success
}

// Print Order details
void print_order(Order *order) {
    printf("Order ID: %d\n", order->order_id);
    printf("Items:\n");
    for (int i = 0; i < order->num_items; i++) {
        printf("  Item ID: %d, Quantity: %d\n", order->items[i].item_id, order->items[i].quantity);
    }
}
```