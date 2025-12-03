---
title: "Chain of Responsibility - TypeScript"
date: 2025-12-03T12:56:23.547-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["TypeScript"]
---
The Chain of Responsibility pattern is a behavioral design pattern that allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, allowing multiple objects to potentially handle the request without the sender knowing which one will ultimately do so.

This TypeScript implementation uses an abstract `Handler` class with a `setNext` and `handle` method. Concrete handlers (`AbstractSupportProcessor`, `EngineerSupportProcessor`, and `ManagementSupportProcessor`) represent different support levels and check if they can handle a given support level. `Client` creates and configures the chain, then sends requests.  TypeScript’s interfaces and abstract classes are well-suited for defining the handler contract, while function pointers (types) for `setNext` improve flexibility and maintainability.  This demonstrates a clean, type-safe approach common in TypeScript projects.

```typescript
// Handler Interface
interface SupportHandler {
  setNext(handler: SupportHandler): SupportHandler;
  handleRequest(level: number): string | null;
}

// Abstract Handler
abstract class Handler implements SupportHandler {
  private nextHandler: SupportHandler | null = null;

  public setNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handleRequest(level: number): string | null {
    if (this.canHandle(level)) {
      return this.handle();
    } else if (this.nextHandler) {
      return this.nextHandler.handleRequest(level);
    }

    return null; // Request not handled
  }

  protected abstract canHandle(level: number): boolean;
  protected abstract handle(): string;
}

// Concrete Handlers
class AbstractSupportProcessor extends Handler {
  protected canHandle(level: number): boolean {
    return level <= 1;
  }

  protected handle(): string {
    return "Abstract Support is handling the request.";
  }
}

class EngineerSupportProcessor extends Handler {
  protected canHandle(level: number): boolean {
    return level <= 2;
  }

  protected handle(): string {
    return "Engineer Support is handling the request.";
  }
}

class ManagementSupportProcessor extends Handler {
  protected canHandle(level: number): boolean {
    return level > 2;
  }

  protected handle(): string {
    return "Management Support is handling the request.";
  }
}

// Client
class Client {
  private handler: SupportHandler;

  constructor() {
    this.handler = new AbstractSupportProcessor();
    this.handler.setNext(new EngineerSupportProcessor()).setNext(new ManagementSupportProcessor());
  }

  public submitRequest(level: number): string | null {
    return this.handler.handleRequest(level);
  }
}

// Usage
const client = new Client();

console.log(client.submitRequest(0)); // Abstract Support is handling the request.
console.log(client.submitRequest(1)); // Abstract Support is handling the request.
console.log(client.submitRequest(2)); // Engineer Support is handling the request.
console.log(client.submitRequest(3)); // Management Support is handling the request.
console.log(client.submitRequest(4)); // Management Support is handling the request.
```