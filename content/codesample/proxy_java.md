---
title: "Proxy - Java"
date: 2025-12-03T12:45:20.550-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Java"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for adding functionality like access control, logging, or caching before forwarding requests to the real subject. In this Java example, we have a `Subject` interface representing a resource, a `RealSubject` implementing the resource, and a `ProxySubject` that intercepts calls to the `RealSubject`. The proxy checks if the real subject exists and creates it if necessary, then logs the request before delegating to the real subject. This implementation utilizes interfaces to define the contract, a common practice in Java for loose coupling and testability.

```java
// Subject interface
interface Subject {
    String operation(String data);
}

// Real Subject
class RealSubject implements Subject {
    @Override
    public String operation(String data) {
        System.out.println("RealSubject: Handling request.");
        return "RealSubject: Result for " + data;
    }
}

// Proxy Subject
class ProxySubject implements Subject {
    private RealSubject realSubject;
    private boolean isCreated = false;

    @Override
    public String operation(String data) {
        if (!isCreated) {
            System.out.println("ProxySubject: Creating RealSubject.");
            realSubject = new RealSubject();
            isCreated = true;
        }

        System.out.println("ProxySubject: Logging request: " + data);
        String result = realSubject.operation(data);
        System.out.println("ProxySubject: Logging response: " + result);
        return result;
    }
}

// Client
public class ProxyExample {
    public static void main(String[] args) {
        Subject proxy = new ProxySubject();
        proxy.operation("Hello");
        proxy.operation("World");
    }
}
```