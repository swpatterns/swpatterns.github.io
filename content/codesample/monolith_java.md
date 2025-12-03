---
title: "Monolith - Java"
date: 2025-12-03T14:24:17.561-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Java"]
---
The Monolith pattern represents a traditional software architecture where an application is built as a single, unified unit. All functionalities are tightly coupled and deployed as one. This example demonstrates a simple e-commerce application built as a monolith. It includes classes for `Product`, `ShoppingCart`, `Order`, and a `Main` class to orchestrate interactions.  The implementation is straightforward Java, utilizing classes and methods to represent the domain logic. It fits the monolithic style by having all components within the same project and relying on direct method calls for communication, avoiding separate services or APIs. This simplicity is characteristic of monoliths, though they can grow complex.

```java
// Product.java
class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}

// ShoppingCart.java
import java.util.ArrayList;
import java.util.List;

class ShoppingCart {
    private List<Product> items = new ArrayList<>();

    public void addItem(Product product) {
        items.add(product);
    }

    public double calculateTotal() {
        double total = 0;
        for (Product product : items) {
            total += product.getPrice();
        }
        return total;
    }

    public List<Product> getItems() {
        return items;
    }
}

// Order.java
import java.util.List;

class Order {
    private ShoppingCart cart;
    private String customerName;

    public Order(ShoppingCart cart, String customerName) {
        this.cart = cart;
        this.customerName = customerName;
    }

    public double getTotal() {
        return cart.calculateTotal();
    }

    public String getCustomerName() {
        return customerName;
    }

    public void processOrder() {
        System.out.println("Processing order for " + customerName);
        System.out.println("Order total: " + getTotal());
        System.out.println("Items:");
        for (Product product : cart.getItems()) {
            System.out.println("- " + product.getName());
        }
        System.out.println("Order processed successfully!");
    }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        Product product1 = new Product("Laptop", 1200.00);
        Product product2 = new Product("Mouse", 25.00);

        ShoppingCart cart = new ShoppingCart();
        cart.addItem(product1);
        cart.addItem(product2);

        Order order = new Order(cart, "John Doe");
        order.processOrder();
    }
}
```