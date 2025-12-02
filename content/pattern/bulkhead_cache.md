
---
title: Bulkhead Cache
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["resilience", "behavioral", "microservices"]
wikipedia: ""
diagramtype: "class"
diagram: "[Cache] --|> [Bulkhead]\n[Application] -- calls --> [Bulkhead] \n[Bulkhead] -- calls (limited) --> [Cache]\n[Bulkhead] -- calls (fallback) --> [DataSource] \n[note: Limits concurrent access\n to the Cache {bg:lightyellow}]"
code: true
---

The Bulkhead Cache pattern enhances system resilience by isolating a shared, potentially unreliable resource – a cache – from the rest of the application.  It achieves this by limiting the number of concurrent requests that can access the cache. If the cache is slow or fails, the bulkhead prevents cascading failures by allowing a managed fallback, typically to a slower, more reliable data source.

## Usage

This pattern is particularly useful in microservice architectures where multiple services rely on a common caching layer. It protects downstream services from being overwhelmed by cache issues.  It’s also applicable in monolithic applications facing high load or dealing with third-party cache providers that have performance SLAs.  Specifically helpful when caching dependencies have unpredictable latency or availability.

## Examples

1. **Netflix Hystrix:** Netflix's Hystrix library pioneered the bulkhead pattern, and included specific support for caching.  Hystrix would wrap cache access with a thread pool or semaphore to limit concurrency, and provided mechanisms to fall back to data sources when the cache was unavailable or response times exceeded a threshold. It is a common implementation in Java microservices for rate limiting and failure isolation of cache access.

2. **Redis with Lettuce/Jedis:** When using Redis as a cache in Java applications, libraries like Lettuce or Jedis can be configured with connection pools. While primarily for connection management, limiting the pool size effectively creates a bulkhead.  If Redis becomes unresponsive, it prevents the application from exhausting all connections, allowing a controlled fallback and preventing total application outage. Specifically, you can configure maximum pooled connections to bound resource usage.
