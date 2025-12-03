---
title: "Dependency Injection - Java"
date: 2025-12-03T11:19:00.700-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Java"]
---
The Dependency Injection (DI) pattern aims to reduce tight coupling between software components. Instead of a component creating its dependencies, they are *injected* into it, typically through a constructor, setter method, or interface. This promotes modularity, testability, and reusability.

The Java example uses constructor injection. The `Service` class is a dependency of the `Client` class. Instead of `Client` instantiating `Service` directly, it receives an instance of `Service` through its constructor. This allows for easy swapping of `Service` implementations (e.g., for testing with a mock).  Using interfaces (`ServiceInterface`) further decouples the classes. This approach aligns with Java's emphasis on explicit dependencies and interfaces for abstraction.

```java
// Define the dependency interface
interface ServiceInterface {
    String getData();
}

// Concrete dependency implementation
class RealService implements ServiceInterface {
    @Override
    public String getData() {
        return "Data from Real Service";
    }
}

// Client class that depends on the service
class Client {
    private final ServiceInterface service;

    // Constructor injection
    public Client(ServiceInterface service) {
        this.service = service;
    }

    public void doSomething() {
        System.out.println(service.getData());
    }
}

// Main application class
public class DependencyInjectionExample {
    public static void main(String[] args) {
        // Inject the dependency
        ServiceInterface service = new RealService();
        Client client = new Client(service);

        client.doSomething();
    }
}
```