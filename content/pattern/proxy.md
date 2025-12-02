
---
title: "Proxy"
date: 2024-02-29T16:10:00-00:00
draft: false
pattern_types: ["structural", "object-structural"]
wikipedia: "https://en.wikipedia.org/wiki/Proxy_pattern"
diagramtype: "class"
diagram: "[AbstractSubject] --|> [Subject] : implements\n[Client] -- Subject : uses\n[Proxy] --|> [AbstractSubject] : implements\n[Proxy] -- Subject : delegates"
code: true
---

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This can be used to add functionality before or after the original object's method is executed, or to simply delay the creation or access of the expensive object until it's actually needed.  It essentially manages access to an object, allowing for features like security checks, lazy loading, or remote access.

## Usage

The Proxy pattern is commonly used in scenarios such as:

*   **Remote Proxies:** When accessing objects across a network, a proxy can handle the communication and complexities of the remote connection.
*   **Virtual Proxies:**  For objects that are expensive to create (e.g., large images or complex data structures), a proxy can load them on demand.
*   **Protection Proxies:** Controlling access to an object based on permissions or security constraints. A proxy can decide whether or not a client is allowed to use the original object.
*   **Smart References:** Adding logging, caching, or other side-effects to object access.
*   **Caching:** Acting as a cache for an expensive operation, returning cached results if available and only invoking the real object when necessary.

## Examples

*   **JavaScript Proxies (ES6):**  JavaScript's `Proxy` object provides a meta-programming functionality that allows intercepting fundamental operations on objects, such as getting or setting properties. This is effectively a proxy pattern for controlling object access.

    javascript
    const target = { message: "Hello" };
    const handler = {
      get: function(target, prop, receiver) {
        console.log(`Property ${prop} accessed`);
        return Reflect.get(target, prop, receiver);
      },
    };

    const proxy = new Proxy(target, handler);
    console.log(proxy.message); // Logs "Property message accessed" and then "Hello"
    

*   **Hibernate Lazy Loading (Java):** In the Hibernate Java ORM framework, relationships between entities are often loaded lazily using proxies. When a related entity is accessed for the first time, Hibernate intercepts the access through a proxy and loads the entity from the database only then. This improves performance by avoiding unnecessary data loading.

    java
    // Assume 'Customer' has a 'address' field that is lazily loaded
    Customer customer = session.get(Customer.class, 1);
    String street = customer.getAddress().getStreet(); // Address is only loaded when accessed
    