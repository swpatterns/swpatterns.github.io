---
title: "Microkernel - TypeScript"
date: 2025-12-03T14:21:12.108-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["TypeScript"]
---
The Microkernel pattern aims to create a minimal core system ("microkernel") and extend functionality through plug-ins ("kernel modules"). This promotes modularity, flexibility, and testability.  Our TypeScript implementation defines an `EventBus` as the microkernel, handling event dispatch.  Independent `Plugin` classes implement specific features, registering event handlers with the `EventBus`.  The main application starts the bus and then loads plugins, injecting the bus dependency. This adheres to TypeScript's class-based OOP style and leverages dependency injection for loose coupling.  The use of interfaces (`Plugin`, `EventHandler`) enforces clear contracts between components.

```typescript
// Event Bus (Microkernel)
interface EventHandler {
  (data: any): void;
}

class EventBus {
  private handlers: { [event: string]: EventHandler[] } = {};

  on(event: string, handler: EventHandler) {
    this.handlers[event] = this.handlers[event] || [];
    this.handlers[event].push(handler);
  }

  emit(event: string, data: any) {
    const handlers = this.handlers[event];
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
}

// Plugin Interface
interface Plugin {
  start(bus: EventBus): void;
}

// Example Plugin 1: Logging
class LoggingPlugin implements Plugin {
  start(bus: EventBus) {
    bus.on('data.received', (data: any) => {
      console.log('Logging Plugin: Data received:', data);
    });
  }
}

// Example Plugin 2: Data Processing
class DataProcessingPlugin implements Plugin {
  start(bus: EventBus) {
    bus.on('data.received', (data: any) => {
      const processedData = { ...data, processed: true };
      console.log('Data Processing Plugin: Data processed:', processedData);
      bus.emit('data.processed', processedData);
    });

    bus.on('data.processed', (data: any) => {
      console.log('Data Processing Plugin:  Event Received - Data is completely processed');
    });
  }
}



// Main Application
class Application {
  private bus: EventBus;
  private plugins: Plugin[] = [];

  constructor() {
    this.bus = new EventBus();
  }

  addPlugin(plugin: Plugin) {
    this.plugins.push(plugin);
  }

  start() {
    this.plugins.forEach(plugin => plugin.start(this.bus));
    this.bus.emit('app.started', 'Application is running'); //Initial event
  }
}

// Usage
const app = new Application();
app.addPlugin(new LoggingPlugin());
app.addPlugin(new DataProcessingPlugin());
app.start();

app.bus.emit('data.received', { message: 'Hello, Microkernel!' });
```