---
title: "Chain of Responsibility - Dart"
date: 2025-12-03T12:59:58.520-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Dart"]
---
The Chain of Responsibility pattern allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, providing flexibility in handling different types of requests.

This Dart implementation defines an abstract `RequestHandler` class with a `nextHandler` property. Concrete handlers like `AuthenticationRequestHandler`, `AuthorizationRequestHandler`, and `LoggingRequestHandler` implement the `handleRequest` method, potentially processing the request and then calling `nextHandler.handleRequest(request)` if they can't fully handle it. The client initiates the chain with the first handler.  It leverages Dart's type system and optional chaining to maintain a clean, readable, and flexible design – fitting the generally object-oriented style of Dart.

```dart
abstract class RequestHandler {
  RequestHandler? nextHandler;

  void setNext(RequestHandler next) {
    nextHandler = next;
  }

  void handleRequest(String request);
}

class AuthenticationRequestHandler extends RequestHandler {
  @override
  void handleRequest(String request) {
    if (request.startsWith("auth:")) {
      print("Authenticating request: ${request.substring(5)}");
    } else {
      nextHandler?.handleRequest(request);
    }
  }
}

class AuthorizationRequestHandler extends RequestHandler {
  @override
  void handleRequest(String request) {
    if (request.startsWith("authz:")) {
      print("Authorizing request: ${request.substring(6)}");
    } else {
      nextHandler?.handleRequest(request);
    }
  }
}

class LoggingRequestHandler extends RequestHandler {
  @override
  void handleRequest(String request) {
    print("Logging request: $request");
    nextHandler?.handleRequest(request); // Always passes to the next handler
  }
}

void main() {
  // Create the chain
  AuthenticationRequestHandler authHandler = AuthenticationRequestHandler();
  AuthorizationRequestHandler authzHandler = AuthorizationRequestHandler();
  LoggingRequestHandler loggerHandler = LoggingRequestHandler();

  authHandler.setNext(authzHandler);
  authzHandler.setNext(loggerHandler);

  // Send requests
  authHandler.handleRequest("auth:user123");
  authHandler.handleRequest("authz:resource456");
  authHandler.handleRequest("general:some data");
}
```