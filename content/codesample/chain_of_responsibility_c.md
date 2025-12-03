---
title: "Chain of Responsibility - C"
date: 2025-12-03T12:57:20.064-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["C"]
---
The Chain of Responsibility pattern is a behavioral design pattern that allows an object to send a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, allowing for flexible and extensible request handling.

My C implementation uses a structure representing a handler with a function pointer for processing and a pointer to the next handler.  The `handle_request` function initiates the chain. Each handler checks if it can handle the request; if not, it passes the request to the `next` handler. This avoids tight coupling and allows handlers to be added or removed without modifying existing code. C's function pointers are ideal for implementing this dynamic dispatch.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Handler {
  int (*handle_request)(struct Request* request);
  struct Handler* next;
} Handler;

typedef struct Request {
  int data;
} Request;

int handler1_handle(Request* request) {
  if (request->data > 0 && request->data <= 10) {
    printf("Handler 1 processed request with data: %d\n", request->data);
    return 1;
  }
  return 0;
}

int handler2_handle(Request* request) {
  if (request->data > 10 && request->data <= 100) {
    printf("Handler 2 processed request with data: %d\n", request->data);
    return 1;
  }
  return 0;
}

int handler3_handle(Request* request) {
  if (request->data > 100) {
    printf("Handler 3 processed request with data: %d\n", request->data);
    return 1;
  }
  printf("Request could not be handled.\n");
  return 0;
}

int main() {
  Handler handler1, handler2, handler3;
  Request request1, request2, request3, request4;

  handler1.handle_request = handler1_handle;
  handler2.handle_request = handler2_handle;
  handler3.handle_request = handler3_handle;

  handler1.next = &handler2;
  handler2.next = &handler3;
  handler3.next = NULL;

  request1.data = 5;
  request2.data = 25;
  request3.data = 150;
  request4.data = 0;

  handle_request(&request1);
  handle_request(&request2);
  handle_request(&request3);
  handle_request(&request4);

  return 0;
}

int handle_request(Request* request) {
  Handler* current = &handler1; // Start the chain with the first handler

  while (current != NULL) {
    if (current->handle_request(request) == 1) {
      return 1; // Request was handled
    }
    current = current->next; // Move to the next handler
  }

  return 0; // Request wasn't handled by anyone in the chain
}
```