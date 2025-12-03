---
title: "Service Locator - Java"
date: 2025-12-03T11:22:30.290-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Java"]
---
The Service Locator pattern provides a centralized way to obtain references to services without tightly coupling the client code to the concrete service implementations. Instead of constructing dependencies directly, clients request them from a locator. This promotes loose coupling and makes it easier to swap service implementations.

The Java example implements a simple `ServiceLocator` class responsible for storing and retrieving services.  `Service` is an interface that defines the functionality to be provided.  Concrete services like `EmailService` and `LoggingService` implement this interface.  Clients obtain services via `ServiceLocator.getService(Service.class)`, which returns the appropriate implementation. This aligns with Java's dependency injection principles, though it's a less explicit form compared to using frameworks like Spring.  The use of interfaces and a central access point is standard Java practice.

```java
// Service Interface
interface Service {
    void execute();
}

// Concrete Service 1
class EmailService implements Service {
    @Override
    public void execute() {
        System.out.println("Sending email...");
    }
}

// Concrete Service 2
class LoggingService implements Service {
    @Override
    public void execute() {
        System.out.println("Logging data...");
    }
}

// Service Locator
class ServiceLocator {
    private static final java.util.Map<Class<? extends Service>, Service> services = new java.util.HashMap<>();

    static {
        // Register services
        registerService(EmailService.class, new EmailService());
        registerService(LoggingService.class, new LoggingService());
    }

    private static void registerService(Class<? extends Service> serviceType, Service service) {
        services.put(serviceType, service);
    }

    public static <T extends Service> T getService(Class<T> serviceType) {
        return (T) services.get(serviceType);
    }
}

// Client Code
class Client {
    private Service emailService;
    private Service loggingService;

    public Client() {
        this.emailService = ServiceLocator.getService(EmailService.class);
        this.loggingService = ServiceLocator.getService(LoggingService.class);
    }

    public void doSomething() {
        emailService.execute();
        loggingService.execute();
    }
}

// Main Class to run the example
public class Main {
    public static void main(String[] args) {
        Client client = new Client();
        client.doSomething();
    }
}
```