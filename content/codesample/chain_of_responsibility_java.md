---
title: "Chain of Responsibility - Java"
date: 2025-12-03T12:55:26.358-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Java"]
---
The Chain of Responsibility pattern creates a chain of objects where each object has a chance to handle a request. If an object can't handle the request, it passes it on to the next object in the chain. This avoids coupling the sender of a request to its specific receiver.

The Java implementation uses an interface `Handler` defining a `setNext()` and `handleRequest()` method. Concrete handlers (`ConcreteHandlerA`, `ConcreteHandlerB`, and `DefaultHandler`) implement the interface. `DefaultHandler` acts as the end of the chain, handling requests no other handler could. The client builds the chain and sends the request to the first handler. This approach leverages Java's interface and class structure for a clear and extensible design, fitting the object-oriented nature of the language.

```java
// Handler interface
interface Handler {
    Handler setNext(Handler handler);
    void handleRequest(Request request);
}

// Request class
class Request {
    private final int value;

    public Request(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

// Concrete Handler A
class ConcreteHandlerA implements Handler {
    private Handler nextHandler;

    @Override
    public Handler setNext(Handler handler) {
        this.nextHandler = handler;
        return this;
    }

    @Override
    public void handleRequest(Request request) {
        if (request.getValue() <= 10) {
            System.out.println("ConcreteHandlerA handled request: " + request.getValue());
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        } else {
            System.out.println("Request not handled.");
        }
    }
}

// Concrete Handler B
class ConcreteHandlerB implements Handler {
    private Handler nextHandler;

    @Override
    public Handler setNext(Handler handler) {
        this.nextHandler = handler;
        return this;
    }

    @Override
    public void handleRequest(Request request) {
        if (request.getValue() > 10 && request.getValue() <= 20) {
            System.out.println("ConcreteHandlerB handled request: " + request.getValue());
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        } else {
            System.out.println("Request not handled.");
        }
    }
}

// Default Handler (end of chain)
class DefaultHandler implements Handler {
    @Override
    public Handler setNext(Handler handler) {
        return this; // No next handler
    }

    @Override
    public void handleRequest(Request request) {
        System.out.println("DefaultHandler handled request: " + request.getValue());
    }
}

// Client
public class ChainOfResponsibility {
    public static void main(String[] args) {
        Handler handlerA = new ConcreteHandlerA();
        Handler handlerB = new ConcreteHandlerB();
        Handler defaultHandler = new DefaultHandler();

        handlerA.setNext(handlerB).setNext(defaultHandler);

        handlerA.handleRequest(new Request(5));
        handlerA.handleRequest(new Request(15));
        handlerA.handleRequest(new Request(25));
    }
}
```