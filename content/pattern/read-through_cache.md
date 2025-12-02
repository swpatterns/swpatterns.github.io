
---
title: "Read-Through Cache"
date: 2024-02-29T14:35:00Z
draft: false
pattern_types: ["behavioral", "caching"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] -- \"get(key)\" :> [Cache]
[Cache] -- \"get(key)\" :> [Data Source]
[Cache] <-- \"get(key)\" :> [Client]
[Client] -- \"put(key, value)\" :> [Cache]
[Cache] -- \"put(key, value)\" :> [Data Source]
[note: Cache handles both reads and writes, delegating writes to the Data Source]"
code: true
---

The Read-Through Cache pattern addresses the performance bottleneck of frequent data access from a slow data source (like a database or remote API). It introduces a cache layer that sits between the client and the data source. When a client requests data, the cache is consulted first. If the data is present (a cache hit), it's returned directly. If the data is not present (a cache miss), the cache itself is responsible for retrieving the data from the data source and then returning it to the client, storing a copy for future use.

This pattern simplifies the client code, as it doesn't need to be aware of the caching mechanism or the data source interaction. The cache acts as a transparent proxy, handling all data retrieval and storage. This improves performance by reducing the load on the data source and providing faster access to frequently used data. It also promotes data consistency, as the cache is the single point of interaction with the data source for write operations.

## Usage

The Read-Through Cache pattern is commonly used in scenarios where:

*   **Data access is slow:**  Databases, network requests, or complex computations are involved.
*   **Data is frequently read:**  A significant portion of requests are for the same data.
*   **Simplified client logic is desired:**  Clients should not be burdened with cache management.
*   **Write-through or write-back caching is not suitable:** When immediate consistency with the data source is crucial for reads.
*   **Microservices architectures:** Caching data accessed across multiple services.

## Examples

1.  **Guava Cache (Java):** Google's Guava library provides a `CacheLoader` interface that embodies the Read-Through Cache pattern. You implement a `CacheLoader` to define how the cache loads data from the data source when a cache miss occurs.  The `get()` method of the `Cache` object automatically uses the `CacheLoader` if the key is not found in the cache.

2.  **Redis with a Client Library (Various Languages):** While Redis is often used as a general-purpose cache, many client libraries enable a Read-Through Cache implementation. For instance, you can configure a library to automatically fetch data from a database if a key isn't present in the Redis cache, and then store the fetched data in Redis for subsequent requests.  Libraries like `node-redis` in Node.js or `redis-py` in Python can be used this way.

3.  **.NET MemoryCache with CacheEntryUpdateCallback:**  .NET's `MemoryCache` allows registering a callback function that is invoked when a cache entry expires (a cache miss happens). The callback efficiently retrieves the data from the underlying data source and updates the cache with fresh data. Thus, it acts as a read-through mechanism.
