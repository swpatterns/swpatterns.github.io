---
title: "Proxy - JavaScript"
date: 2025-12-03T12:45:47.761-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["JavaScript"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for adding functionality like access control, logging, or validation before operations are performed on the original object. In JavaScript, the `Proxy` object natively supports this pattern, allowing interception of fundamental operations.

The code creates a `Subject` class representing the real object and a `Proxy` class that wraps it. The `Proxy` intercepts calls to the `Subject`'s methods and adds logging before executing them. This demonstrates a simple use case – logging – but the Proxy can be extended to handle more complex scenarios like validation or access control.  Using the built-in `Proxy` object is the most idiomatic way to implement this pattern in modern JavaScript, avoiding the need for manual interception or inheritance.

```javascript
// Subject (Real Object)
class Subject {
  doSomething() {
    console.log("Subject: Doing something.");
  }

  doAnotherThing() {
    console.log("Subject: Doing another thing.");
  }
}

// Proxy
class Proxy {
  constructor(subject) {
    this.subject = subject;
  }

  get(target, prop, receiver) {
    console.log(`Proxy: Accessing property "${prop}".`);
    return Reflect.get(target, prop, receiver);
  }

  apply(target, thisArg, argumentsList) {
    console.log("Proxy: Calling method.");
    return target.apply(thisArg, argumentsList);
  }
}

// Usage
const subject = new Subject();
const proxy = new Proxy(subject, {
  get: new Proxy().get,
  apply: new Proxy().apply
});

proxy.doSomething();
proxy.doAnotherThing();
```