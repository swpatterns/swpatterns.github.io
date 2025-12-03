---
title: "Null Object - Java"
date: 2025-12-03T13:45:37.029-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Java"]
---
The Null Object pattern provides a substitute for a null reference or null value. It defines a class with behavior that does nothing, allowing you to avoid null checks throughout your code. This improves readability and reduces the risk of NullPointerExceptions.

The Java code below demonstrates this with a `Customer` interface and a `NullCustomer` class implementing it.  `NullCustomer` provides default, no-op implementations for methods that would normally operate on a valid customer.  This allows calling `Customer` methods without needing to check if the object is null, simplifying logic. This approach is idiomatic Java as it leverages interfaces and polymorphism to achieve a clean and type-safe solution.

```java
// Customer.java
interface Customer {
    String getName();
    String getAddress();
    boolean isValid();
    void displayDetails();
}

// NullCustomer.java
class NullCustomer implements Customer {
    @Override
    public String getName() {
        return "Unknown";
    }

    @Override
    public String getAddress() {
        return "N/A";
    }

    @Override
    public boolean isValid() {
        return false;
    }

    @Override
    public void displayDetails() {
        System.out.println("No customer details available.");
    }
}

// Example Usage
class Example {
    public static void main(String[] args) {
        Customer customer = null; // Could be null in a real scenario

        // Use Null Object to avoid null checks
        Customer actualCustomer = (customer != null) ? customer : new NullCustomer();

        System.out.println("Customer Name: " + actualCustomer.getName());
        System.out.println("Customer Address: " + actualCustomer.getAddress());
        System.out.println("Is Customer Valid: " + actualCustomer.isValid());
        actualCustomer.displayDetails();
    }
}
```