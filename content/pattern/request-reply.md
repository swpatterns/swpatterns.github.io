
---
title: Request-Reply
date: 2024-02-29T16:53:58-00:00
draft: false
pattern_types: ["behavioral", "messaging"]
wikipedia: "https://en.wikipedia.org/wiki/Request%E2%80%93reply"
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant Client\n  participant Requestor\n  participant ReplyHandler\n  participant Service\n\n  Client->>Requestor: Send Request\n  Requestor->>Service: Forward Request\n  Service->>ReplyHandler: Process Request & Form Reply\n  ReplyHandler->>Requestor: Send Reply\n  Requestor->>Client: Deliver Reply"
code: true
---

The Request-Reply pattern is a fundamental communication pattern where one party (the client) sends a request to another party (the service) and waits for a response (the reply). It's a synchronous interaction style, meaning the client blocks until the reply is received. This pattern is commonly used in client-server applications, remote procedure calls, and other scenarios where a specific piece of information or action is needed from a remote component. It ensures a direct link between what is asked for and the answer received.

This pattern is a building block for many complex systems. It's often enhanced with features like timeouts, error handling, and retry mechanisms to improve robustness and reliability. While simple in concept, efficient implementations require careful consideration of network communication, serialization, and concurrency.  It provides a clear flow of control and facilitates modular design by enforcing a well-defined interface between requesting and responding components.

## Usage

The Request-Reply pattern is widely used in:

*   **Client-Server applications:** A web browser requesting a webpage from a web server is a classic example. The browser sends a request, the server processes it, and sends back the HTML, CSS, and JavaScript.
*   **Microservices Architecture:**  Microservices often communicate using Request-Reply, typically via lightweight protocols like HTTP/REST or messaging queues.
*   **Remote Procedure Calls (RPC):**  RPC frameworks like gRPC or Thrift are built on this pattern, allowing developers to call functions on remote servers as if they were local.
*   **Database Access:**  Applications query databases using a request, and the database responds with the requested data.
*   **APIs:** Most APIs are built using Request-Reply, where clients make requests to specific endpoints and receive JSON or XML responses.

## Examples

1.  **HTTP/REST:** The entire HTTP protocol is based on Request-Reply. A client (e.g., a web browser or a mobile app) sends an HTTP request (GET, POST, PUT, DELETE) to a server. The server processes the request and sends back an HTTP response containing the requested data or a status code indicating success or failure.  Frameworks like Spring RestController in Java, or Flask/Django in Python, heavily rely on this pattern.

2.  **gRPC:** gRPC is a modern RPC framework that utilizes Protocol Buffers for serialization. When a client calls a gRPC method, it sends a request message to the server. The server processes the request and sends back a response message. The framework handles the low-level details of communication, serialization, and deserialization, making it easier for developers to build high-performance, distributed applications.

3.  **Redis:** While capable of pub/sub, Redis often employs a request-reply model when clients send commands to the server (e.g., `GET key`, `SET key value`).  The Redis server executes the command and immediately replies with the result.
