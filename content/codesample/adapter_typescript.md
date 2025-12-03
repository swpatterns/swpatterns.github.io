---
title: "Adapter - TypeScript"
date: 2025-12-03T11:27:09.166-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["TypeScript"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. This is achieved by creating a wrapper class (the Adapter) that translates calls from the client to the adaptee.

The following TypeScript example adapts a legacy `LegacyRectangle` class (providing area calculation in old units) to a modern `Rectangle` interface (expecting area in square meters).  The `LegacyRectangleAdapter` implements the `Rectangle` interface, taking a `LegacyRectangle` instance in its constructor and translating the `area()` call. TypeScript's strong typing and interface implementation features naturally fit the Adapter pattern's contract-based approach benefiting from compile-time safety.

```typescript
// The target interface
interface Rectangle {
  area(): number;
}

// The adaptee
class LegacyRectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getAreaInOldUnits(): number {
    return this.width * this.height; // Assume old units are just width * height
  }
}

// The adapter
class LegacyRectangleAdapter implements Rectangle {
  private legacyRectangle: LegacyRectangle;

  constructor(legacyRectangle: LegacyRectangle) {
    this.legacyRectangle = legacyRectangle;
  }

  area(): number {
    const areaInOldUnits = this.legacyRectangle.getAreaInOldUnits();
    // Conversion factor from old units to square meters (example)
    const conversionFactor = 0.092903;
    return areaInOldUnits * conversionFactor;
  }
}

// Client code
function processRectangle(rectangle: Rectangle): void {
  console.log(`Rectangle area: ${rectangle.area()} square meters`);
}

// Usage
const legacyRect = new LegacyRectangle(10, 5);
const adapter = new LegacyRectangleAdapter(legacyRect);

processRectangle(adapter);
```