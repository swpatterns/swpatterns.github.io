---
title: "Module - TypeScript"
date: 2025-12-03T12:49:34.795-05:00
draft: false
pattern_usage: ["Module"]
language: ["TypeScript"]
---
The Module Pattern is a way to encapsulate state and expose only a necessary interface. It's commonly used to create self-contained units of code, preventing global namespace pollution and improving maintainability. This TypeScript example uses a simple object literal to create a module.  The `counter` variable is private to the module, and only the `increment` and `getCount` methods are exposed through the returned object. This aligns with TypeScript's preference for clear interfaces and encapsulation, leveraging object literals for concise module creation when full class structures aren't needed.

```typescript
// counter.ts

const counterModule = (function() {
  let counter = 0;

  return {
    increment: function() {
      counter++;
    },
    getCount: function() {
      return counter;
    }
  };
})();

export default counterModule;
```