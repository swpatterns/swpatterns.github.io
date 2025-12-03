---
title: "Dependency Injection - TypeScript"
date: 2025-12-03T11:19:42.235-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["TypeScript"]
---
Dependency Injection (DI) is a design pattern that reduces coupling between software components by providing dependencies from external sources rather than the components creating them themselves. This promotes modularity, testability, and reusability. Our TypeScript example utilizes a simple interface `ILogger` and a concrete implementation `ConsoleLogger`.  The `UserService` class doesn't *create* the logger; it *receives* it through its constructor. This is constructor injection, a common DI approach. TypeScript’s type system helps enforce correct dependency types. The use of interfaces and explicit dependency declaration is a standard practice in robust TypeScript applications, enhancing maintainability and testability via mock dependencies.

```typescript
// Define the dependency interface
interface ILogger {
  log(message: string): void;
}

// Concrete dependency implementation
class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`LOG: ${message}`);
  }
}

// Client class that depends on ILogger
class UserService {
  private logger: ILogger;

  // Constructor injection: Receive the dependency
  constructor(logger: ILogger) {
    this.logger = logger;
  }

  createUser(username: string): void {
    this.logger.log(`Creating user: ${username}`);
    // ... user creation logic ...
    this.logger.log(`User ${username} created successfully.`);
  }
}

// Usage (Dependency Composition Root)
const logger = new ConsoleLogger();
const userService = new UserService(logger);

userService.createUser("john.doe");
```