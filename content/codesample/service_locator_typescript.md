---
title: "Service Locator - TypeScript"
date: 2025-12-03T11:23:14.416-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["TypeScript"]
---
The Service Locator pattern provides a centralized way to access various services within an application. Instead of a service directly creating or relying on its dependencies, it requests them from a central registry (the Service Locator). This decouples the service from concrete implementations, making testing and configuration more flexible.

The TypeScript code below implements a simple Service Locator.  Services are registered with the locator using a string key.  When a service is needed, it is requested by its key. The use of a class and a static method is idiomatic TypeScript for this singleton-like access capability.  Type safety is maintained through TypeScript’s type system by specifying the service types during registration and retrieval.

```typescript
// service-locator.ts

interface ServiceMap {
  [key: string]: any;
}

class ServiceLocator {
  private static instance: ServiceLocator;
  private services: ServiceMap = {};

  private constructor() {
    // Singleton pattern
  }

  static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  registerService<T>(key: string, service: T): void {
    this.services[key] = service;
  }

  getService<T>(key: string): T {
    if (!this.services[key]) {
      throw new Error(`Service not registered: ${key}`);
    }
    return this.services[key];
  }
}

// Example Services
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`LOG: ${message}`);
  }
}

interface DataService {
  getData(): string;
}

class RealDataService implements DataService {
  getData(): string {
    return "Real data from the source!";
  }
}

// Usage
const locator = ServiceLocator.getInstance();
locator.registerService<Logger>("logger", new ConsoleLogger());
locator.registerService<DataService>("dataService", new RealDataService());

const logger = locator.getService<Logger>("logger");
const dataService = locator.getService<DataService>("dataService");

logger.log(dataService.getData());
```