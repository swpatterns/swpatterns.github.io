---
title: "Proxy - TypeScript"
date: 2025-12-03T12:46:01.439-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["TypeScript"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for adding functionality like access control, logging, or lazy loading without modifying the original object. In this TypeScript example, we create a `SecureRemoteData` proxy for a `RemoteData` object. The proxy intercepts get requests and checks if the user has permission to access the data before forwarding the request. This implementation leverages TypeScript's built-in `Proxy` object for clean and type-safe interception of operations.  The use of interfaces promotes loose coupling and maintainability, aligning with TypeScript best practices.

```typescript
// Define the interface for the real object
interface RemoteData {
  data: string;
  sensitiveData: string;
}

// The real object
const realData: RemoteData = {
  data: "Public information",
  sensitiveData: "Confidential information",
};

// Define the handler for the proxy
const handler: ProxyHandler<RemoteData> = {
  get: (target, prop, receiver) => {
    const userRole = "admin"; // Simulate user role

    if (prop === "sensitiveData" && userRole !== "admin") {
      return "Access denied";
    }

    return Reflect.get(target, prop, receiver);
  },
};

// Create the proxy
const secureData = new Proxy(realData, handler);

// Usage
console.log(secureData.data); // Output: Public information
console.log(secureData.sensitiveData); // Output: Confidential information (if user is admin) or Access denied
```