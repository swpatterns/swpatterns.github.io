---
title: "Null Object - TypeScript"
date: 2025-12-03T13:46:25.945-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["TypeScript"]
---
The Null Object pattern provides a substitute object for null references, allowing default or no-op behavior instead of throwing exceptions when attempting to operate on a null value. This improves code readability and reduces conditional checks for null.

The TypeScript example implements a `Vehicle` interface with methods like `getMileage()`. A `NullVehicle` class implements the same interface, providing default values (0 for mileage) and no-op behavior for other methods.  Instead of returning `null` when a vehicle is unavailable, the code returns an instance of `NullVehicle`. This allows calling `vehicle.getMileage()` without needing a `null` check, simplifying the client code.  Using interfaces and classes is a standard TypeScript practice for defining types and structures.

```typescript
// Vehicle Interface
interface Vehicle {
  getMileage(): number;
  getType(): string;
}

// Concrete Vehicle Class
class Car implements Vehicle {
  constructor(private mileage: number) {}

  getMileage(): number {
    return this.mileage;
  }

  getType(): string {
    return "Car";
  }
}

// Null Vehicle Class - the Null Object
class NullVehicle implements Vehicle {
  getMileage(): number {
    return 0;
  }

  getType(): string {
    return "Unknown";
  }
}

// Function that might return a vehicle or a null object
function getVehicle(hasVehicle: boolean): Vehicle {
  if (hasVehicle) {
    return new Car(10000);
  } else {
    return new NullVehicle();
  }
}

// Client Code - no null checks needed!
const vehicle1 = getVehicle(true);
console.log(`Vehicle 1 Mileage: ${vehicle1.getMileage()}, Type: ${vehicle1.getType()}`);

const vehicle2 = getVehicle(false);
console.log(`Vehicle 2 Mileage: ${vehicle2.getMileage()}, Type: ${vehicle2.getType()}`);
```