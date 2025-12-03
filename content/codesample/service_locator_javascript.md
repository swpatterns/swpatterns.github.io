---
title: "Service Locator - JavaScript"
date: 2025-12-03T11:23:00.632-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["JavaScript"]
---
The Service Locator pattern provides a centralized way to obtain access to various services within an application. Instead of directly creating dependencies, components request them from a central "locator" object. This promotes loose coupling and makes it easier to swap implementations or manage dependencies, particularly in testing.

The JavaScript implementation uses a simple object to store service registrations and a `resolve` method to retrieve them.  Services are registered with a key (string identifier).  The `resolve` method returns the registered service for a given key, or throws an error if not found. This approach is idiomatic JavaScript due to its flexibility with objects and function-based programming.  It avoids the complexity of a full-fledged dependency injection container while still offering dependency management benefits.

```javascript
/**
 * Service Locator Pattern in JavaScript
 */
class ServiceLocator {
  constructor() {
    this.services = {};
  }

  register(key, service) {
    if (this.services[key]) {
      console.warn(`Service with key "${key}" already registered. Overwriting.`);
    }
    this.services[key] = service;
  }

  resolve(key) {
    if (!this.services[key]) {
      throw new Error(`Service "${key}" not found.`);
    }
    return this.services[key];
  }
}

// Example Services
class DatabaseService {
  getData() {
    return "Data from the database";
  }
}

class LoggingService {
  log(message) {
    console.log(`LOG: ${message}`);
  }
}

// Usage
const locator = new ServiceLocator();
locator.register("database", new DatabaseService());
locator.register("logger", new LoggingService());

const database = locator.resolve("database");
const logger = locator.resolve("logger");

logger.log(database.getData()); // Output: LOG: Data from the database
```