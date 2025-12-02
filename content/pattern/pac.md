
---
title: PAC
date: 2024-02-29T11:00:00-00:00
draft: false
pattern_types: ["behavioral", "security"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant Client\n  participant Proxy\n  participant RealSubject\n\n  Client->>Proxy: request(resource)\n  activate Proxy\n  Proxy->>Proxy: check access\n  alt Access Granted\n    Proxy->>RealSubject: request(resource)\n    activate RealSubject\n    RealSubject-->>Proxy: response(resource)\n    deactivate RealSubject\n    Proxy-->>Client: response(resource)\n  else Access Denied\n    Proxy-->>Client: access denied\n  end\n  deactivate Proxy"
code: true
---

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is particularly useful for sensitive or expensive-to-create resources. The proxy object has an interface identical to the real subject, but it doesn't necessarily have the full functionality. Instead, it acts as an intermediary, deciding when and how to access the real subject.

This pattern is commonly employed for security purposes, controlling access to resources based on user roles or permissions. It can also be used for performance optimization, such as lazy loading of images or managing connections to a remote server.  The proxy encapsulates the access control logic, keeping it separated from the core business logic of the real subject.

## Usage

The Proxy pattern shines in scenarios like:

*   **Remote Proxies:** Representing an object located on a different machine, controlling communication and potentially caching results.
*   **Virtual Proxies:** Delaying the creation of an expensive object until it's actually needed ("lazy loading").
*   **Security Proxies:** Controlling access to sensitive resources based on client context or permissions.
*   **Smart References:** Implementing features like automatic garbage collection or logging access to objects.
*   **Access Control:** Enforcing policies before allowing operations on a core object.

## Examples

1.  **Netflix Video Streaming:** When you browse Netflix, you don’t immediately download the entire video. A proxy object might represent the video stream. This proxy handles authentication (checking your subscription status), manages connection pooling to the content delivery network (CDN), and then only requests the video chunks needed for playback.  This avoids unnecessary data transfer and ensures you have authorized access.

2.  **Hibernate Lazy Loading (JPA/ORM):**  In Hibernate, relationships between entities are often loaded lazily. When you access a related entity for the first time, Hibernate doesn’t immediately fetch it from the database. Instead, it creates a proxy object with the same interface as the real entity. When you attempt to call a method on the proxy, it triggers the database query to load the actual data. This improves performance by only loading data when necessary.

3.  **Guava Cache (Java):** The Guava Cache library leverages proxy objects for its loading functionality. When a cache miss occurs, a `CacheLoader` (acting as the real subject) is invoked to load the data. However, the access and execution are orchestrated through a proxy to apply interceptors and control caching behavior.
