
---
title: Write-Through Cache
date: 2024-02-29T16:23:00-00:00
draft: false
pattern_types: ["behavioral", "performance"]
wikipedia: "https://en.wikipedia.org/wiki/Write-through_cache"
diagramtype: "sequence"
diagram: "[Participant: Client] -> [Participant: Cache]: get(key)\n[Participant: Cache] -> [Participant: Data Store]: get(key)\n[Participant: Data Store] --> [Participant: Cache]: value\n[Participant: Cache] --> [Participant: Client]: value\n\n[Participant: Client] -> [Participant: Cache]: put(key, value)\n[Participant: Cache] -> [Participant: Data Store]: put(key, value)\n[Participant: Cache] -> [Participant: Client]: ACK"
code: true
---

The Write-Through Cache pattern involves updating both the cache and the underlying data store simultaneously when a write operation occurs.  Every write to the cache immediately propagates to the data store, ensuring data consistency. While this approach reduces read latency (data is often present in the cache) it can increase write latency due to the necessity of waiting for the data store's confirmation.

## Usage

Write-Through caching is commonly used in scenarios where strong data consistency is paramount. Examples include financial applications where immediate updates are crucial, collaborative editing tools where all users must see the latest changes quickly, and systems involving frequent reads compared to writes, where the benefit of faster reads outweighs the impact of slower writes. It’s also effective in cases where the data store itself is relatively fast, minimizing the write latency penalty.

## Examples

1. **Redis:** Redis, a popular in-memory data store, can be configured as a write-through cache. When a write operation is performed, the application updates both the Redis cache and the primary database. This maintains consistency and provides rapid read access through Redis.

2. **Ehcache (with Persistence):** Ehcache, a Java-based caching library, supports write-through caching with disk or database persistence. Each write to the cache is automatically written to the configured persistent store. This is useful for applications that need to ensure data is not lost even in the event of a cache eviction or server restart.
