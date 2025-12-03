---
title: "Decorator - TypeScript"
date: 2025-12-03T11:38:56.208-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["TypeScript"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality. In this TypeScript example, we define a base `Component` class and then use decorator functions (`@logExecution`, `@throttle`) to add logging and rate-limiting behavior to a specific component instance without modifying its core code. TypeScript's decorator syntax allows for clean and concise modification of classes and methods. This implementation leverages TypeScript's type system for safety and readability, aligning with its best practices for code extensibility.

```typescript
// Component interface
interface Component {
  execute(): void;
}

// Base Component class
class BasicComponent implements Component {
  public execute(): void {
    console.log("BasicComponent executing...");
  }
}

// Decorator: Log execution
function logExecution(constructor: any) {
  return class extends constructor {
    execute() {
      console.log("Executing decorated method...");
      super.execute();
    }
  };
}

// Decorator: Throttle execution
function throttle(milliseconds: number) {
  return function (constructor: any) {
    return class extends constructor {
      private timeoutId: NodeJS.Timeout | null = null;

      execute() {
        if (!this.timeoutId) {
          super.execute();
          this.timeoutId = setTimeout(() => {
            this.timeoutId = null;
          }, milliseconds);
        }
      }
    };
  };
}

// Apply decorators
@logExecution
@throttle(500)
class EnhancedComponent extends BasicComponent {
  execute() {
    console.log("EnhancedComponent executing...");
    super.execute();
  }
}

// Usage
const enhanced = new EnhancedComponent();

enhanced.execute(); // Logs and throttles
enhanced.execute(); // Throttled
enhanced.execute(); // Throttled

setTimeout(() => {
  enhanced.execute(); // Executes after throttle
}, 600);
```