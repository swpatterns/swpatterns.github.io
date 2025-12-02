
---
title: Chain of Responsibility
date: 2023-10-27T10:30:00-00:00
draft: false
pattern_types: ["behavioral", "GoF"]
wikipedia: "https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern"
diagramtype: "sequence"
diagram: |
  participant Client
  participant Handler
  participant ConcreteHandler1
  participant ConcreteHandler2
  participant ConcreteHandler3

  Client->Handler: Request
  activate Handler
  Handler->ConcreteHandler1: CanHandle?
  activate ConcreteHandler1
  ConcreteHandler1->Handler: No
  deactivate ConcreteHandler1
  Handler->ConcreteHandler2: CanHandle?
  activate ConcreteHandler2
  ConcreteHandler2->ConcreteHandler3: CanHandle?
  activate ConcreteHandler3
  ConcreteHandler3->Handler: Yes, Handle
  deactivate ConcreteHandler3
  Handler->ConcreteHandler2: Handle
  deactivate ConcreteHandler2
  Handler->Client: Result
  deactivate Handler
code: true
---

The Chain of Responsibility is a behavioral design pattern that allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This pattern decouples the sender of a request from its receivers, giving multiple objects the opportunity to handle the request without the sender explicitly knowing which object will handle it.

This pattern is particularly useful when you have multiple objects that can handle a request, but you don't know beforehand which object is the appropriate one. It promotes loose coupling and allows you to add or remove handlers dynamically without affecting the client. It is often used in scenarios like request processing pipelines, error handling, and document workflow systems.

## Usage

*   **Request Processing Pipelines:**  Used extensively in web frameworks and server-side applications to process HTTP requests through a series of middleware or filters. Each middleware component can perform a specific task (e.g., authentication, logging, compression) before passing the request to the next.
*   **Error Handling:**  A chain of error handlers can be created to progressively attempt to resolve an error.  First handlers might attempt simple fixes, while later handlers might escalate the error or log detailed information.
*   **Workflow Systems:**  Implementing business workflows where a request needs to be approved or processed by multiple departments or individuals in a specific order.
*   **GUI Event Handling:** In graphical user interfaces, event handling can be structured as a chain of responsibility where each handler checks if it's responsible for a specific event and handles it accordingly.

## Examples

*   **Node.js Express Middleware:** Express.js utilizes the Chain of Responsibility pattern through its middleware stack. Each middleware function receives the request, response, and next function. It can perform operations on the request/response and then call `next()` to pass control to the next middleware in the chain. If a middleware doesn't call `next()`, the chain is terminated.
*   **Java Servlet Filters:** Java Servlets employ filters that act as interceptors in a chain.  A request passes through a series of filters before reaching the servlet. Each filter can modify the request, response, or terminate the chain.  This is analogous to Express middleware.
*   **PHP Symfony Event Dispatcher:** Symfony's event dispatcher component allows you to register listeners to specific events. When an event is dispatched, the dispatcher iterates through the registered listeners, calling each one in turn until a listener stops the propagation of the event.
*   **Python's `logging` module:** The Python `logging` module uses a chain of handlers to process log records. Each handler is responsible for a specific action, such as writing to a file or sending an email. If a handler cannot process a log record, it can pass it to the next handler in the chain.
