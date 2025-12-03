---
title: "Onion Architecture - Java"
date: 2025-12-03T14:12:01.054-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Java"]
---
The Onion Architecture is a design pattern focused on achieving loose coupling and increased testability by organizing code into concentric layers. The innermost layer represents the *domain* – core business logic with no dependencies. Surrounding layers represent *domain services*, *data access*, and *infrastructure* (UI, frameworks, etc.), each depending only on the layers within. Changes in outer layers shouldn't force changes in inner layers. 

This Java example demonstrates a simplified Onion Architecture with Domain, Use Case (Application Service), and Infrastructure layers. Interfaces define layer boundaries, allowing dependency inversion. The core domain objects (`Product`) are pure Java objects without framework dependencies. Use cases use these domain objects to implement business rules. Infrastructure handles persistence (here, a simple in-memory repository) and interacts with the external world. This is idiomatic Java due to its use of interfaces for abstraction, dependency injection (although simple here), and the clear separation of concerns promoted by the architecture.

```java
// Domain Layer
package com.example.onion.domain;

public class Product {
    private String id;
    private String name;
    private double price;

    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}

// Use Case Layer
package com.example.onion.usecase;

import com.example.onion.domain.Product;
import com.example.onion.domain.ProductRepository;

public class GetProduct {
    private final ProductRepository productRepository;

    public GetProduct(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProductById(String id) {
        return productRepository.findById(id);
    }
}

// Infrastructure Layer
package com.example.onion.infrastructure;

import com.example.onion.domain.Product;
import com.example.onion.domain.ProductRepository;
import java.util.HashMap;
import java.util.Map;

public class InMemoryProductRepository implements ProductRepository {
    private final Map<String, Product> products = new HashMap<>();

    public InMemoryProductRepository() {
        products.put("1", new Product("1", "Laptop", 1200.0));
        products.put("2", new Product("2", "Mouse", 25.0));
    }

    @Override
    public Product findById(String id) {
        return products.get(id);
    }
}

// Main (For demonstration - typically handled by a framework)
package com.example.onion;

import com.example.onion.usecase.GetProduct;
import com.example.onion.infrastructure.InMemoryProductRepository;
import com.example.onion.domain.Product;

public class Main {
    public static void main(String[] args) {
        ProductRepository repository = new InMemoryProductRepository();
        GetProduct getProduct = new GetProduct(repository);
        Product product = getProduct.getProductById("1");

        if (product != null) {
            System.out.println("Product Name: " + product.getName());
            System.out.println("Product Price: " + product.getPrice());
        } else {
            System.out.println("Product not found!");
        }
    }
}
```