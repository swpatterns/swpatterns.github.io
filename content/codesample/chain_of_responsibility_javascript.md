---
title: "Chain of Responsibility - JavaScript"
date: 2025-12-03T12:56:01.068-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["JavaScript"]
---
The Chain of Responsibility pattern promotes decoupling the sender of a request from its receivers by passing the request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This allows for a flexible system where handlers can be added or removed without affecting the others.

The JavaScript implementation uses objects as handlers, each with a `handle` method and a `next` property pointing to the next handler.  The `handle` method checks if it can process the request; if not, it delegates to `next`.  The initial request is passed to the first handler in the chain. This approach leverages JavaScript's flexible object model and prototypal inheritance (though not explicitly used here, it's a common functional pattern).  It avoids tight coupling and promotes a more modular design.

```javascript
// Handler interface (implicitly defined through structure)

class Handler {
  constructor() {
    this.next = null;
  }

  setNext(handler) {
    this.next = handler;
    return handler; // For chaining setNext calls
  }

  handle(request) {
    if (this.next) {
      return this.next.handle(request);
    }
    return null; // Request not handled
  }
}

// Concrete Handlers

class ConcreteHandler1 extends Handler {
  handle(request) {
    if (request.type === "type1") {
      console.log("ConcreteHandler1 handling request:", request);
      return "Handler 1 processed the request";
    }
    return super.handle(request);
  }
}

class ConcreteHandler2 extends Handler {
  handle(request) {
    if (request.type === "type2") {
      console.log("ConcreteHandler2 handling request:", request);
      return "Handler 2 processed the request";
    }
    return super.handle(request);
  }
}

class ConcreteHandler3 extends Handler {
  handle(request) {
    if (request.type === "type3") {
      console.log("ConcreteHandler3 handling request:", request);
      return "Handler 3 processed the request";
    }
    return super.handle(request);
  }
}

// Client code

const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();

handler1.setNext(handler2).setNext(handler3);

const requests = [
  { type: "type1", data: "data1" },
  { type: "type2", data: "data2" },
  { type: "type3", data: "data3" },
  { type: "type4", data: "data4" } // Not handled
];

requests.forEach(request => {
  const result = handler1.handle(request);
  if(result) {
    console.log("Result:", result);
  } else {
    console.log("Request not handled.");
  }
});
```