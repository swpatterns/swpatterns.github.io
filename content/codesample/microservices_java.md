---
title: "Microservices - Java"
date: 2025-12-03T14:41:08.206-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Java"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often an HTTP resource API. This example demonstrates a simplified scenario with two microservices: a `ProductService` and an `ReviewService`. They communicate via simple method calls (in a real-world scenario, this would likely be REST or message queues).  The implementation uses standard Java classes and interfaces, favoring composition over inheritance.  Dependency Injection (though not explicitly shown with a framework like Spring for brevity) would be a common addition in a production environment to further decouple services.

```java
// ProductService.java
import java.util.List;
import java.util.ArrayList;

interface ReviewService {
    List<String> getReviewsForProduct(String productId);
}

public class ProductService {
    private final ReviewService reviewService;

    public ProductService(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    public String getProductDetails(String productId) {
        return "Product ID: " + productId + ", Details: ... " +
               (reviewService.getReviewsForProduct(productId).isEmpty() ? "No reviews yet." : " Reviews: " + reviewService.getReviewsForProduct(productId));
    }
}

// ReviewService.java
import java.util.List;
import java.util.Arrays;

public class ReviewServiceImplementation implements ReviewService {
    @Override
    public List<String> getReviewsForProduct(String productId) {
        // Simulate fetching reviews from a database
        if (productId.equals("123")) {
            return Arrays.asList("Great product!", "Highly recommended.");
        } else {
            return new ArrayList<>();
        }
    }
}

// Main.java (Example Usage)
public class Main {
    public static void main(String[] args) {
        ReviewService reviewService = new ReviewServiceImplementation();
        ProductService productService = new ProductService(reviewService);

        System.out.println(productService.getProductDetails("123"));
        System.out.println(productService.getProductDetails("456"));
    }
}
```