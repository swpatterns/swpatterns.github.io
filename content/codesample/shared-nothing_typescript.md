---
title: "Shared-Nothing - TypeScript"
date: 2025-12-03T15:11:48.611-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["TypeScript"]
---
The Shared-Nothing pattern promotes scalability and resilience by avoiding shared state between components. Each component has its own private data and communicates with others via explicit message passing (typically function calls with data transfer). This eliminates contention points like locks, often found in shared-memory approaches.

This TypeScript example demonstrates a simple order processing system.  `OrderProcessor` instances each manage their own `orders` array.  When a new order is added, it's copied (using spread syntax) to the specific processor's state. The `reportOrders` function explicitly requests the order list from each processor; no shared list exists. This approach aligns well with TypeScript's focus on type safety and explicit data handling, favoring immutable data structures and clear function contracts.

```typescript
// order-processor.ts
interface Order {
  id: string;
  amount: number;
}

class OrderProcessor {
  private orders: Order[] = [];

  addOrder(order: Order): void {
    this.orders = [...this.orders, order];
  }

  getOrders(): Order[] {
    return [...this.orders]; // Return a copy to prevent external modification
  }
}

// main.ts
const processor1 = new OrderProcessor();
const processor2 = new OrderProcessor();

processor1.addOrder({ id: '1001', amount: 50 });
processor2.addOrder({ id: '1002', amount: 100 });
processor2.addOrder({ id: '1003', amount: 25 });

function reportOrders(processors: OrderProcessor[]): void {
  processors.forEach((processor, index) => {
    console.log(`Processor ${index + 1}:`, processor.getOrders());
  });
}

reportOrders([processor1, processor2]);
```