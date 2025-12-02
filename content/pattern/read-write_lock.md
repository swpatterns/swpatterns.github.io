
---
title: Read-Write Lock
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["concurrency", "behavioral"]
wikipedia: "https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock"
diagramtype: "class"
diagram: "[Reader] --|> [Lock] : reads\n[Writer] --|> [Lock] : writes\n[Lock] -- [Resource] : protects\n[note: Multiple readers allowed {bg:lightgreen}]\n[note: Only one writer allowed {bg:lightcoral}]"
code: true
---

The Read-Write Lock pattern allows multiple readers to access a shared resource concurrently, but requires exclusive access for writers. This is in contrast to a traditional mutex, which only allows one thread to access the resource at a time, regardless of whether it's reading or writing. By allowing concurrent reads, the Read-Write Lock can significantly improve performance in scenarios where reads are much more frequent than writes.

This pattern is particularly useful when dealing with data that is read often and modified infrequently. It avoids the performance bottleneck of serializing all access to the resource, as would happen with a simple lock. However, it introduces complexity in managing the lock state and potential for writer starvation if readers continuously hold the lock.

## Usage

*   **Caching Systems:**  Allowing multiple threads to read from a cache simultaneously while ensuring exclusive access for cache updates.
*   **Database Access:** Optimizing concurrent access to database records where reads are far more common than writes.
*   **Configuration Management:**  Enabling multiple threads to read configuration data without blocking, while ensuring that updates to the configuration are atomic.
*   **Data Structures:** Implementing concurrent data structures like read-mostly dictionaries or sets.

## Examples

*   **Java `ReadWriteLock`:** The `java.util.concurrent.locks.ReadWriteLock` interface in Java provides a mechanism for implementing read-write locks. It includes `readLock()` and `writeLock()` methods to acquire read and write access respectively.  Libraries like Guava also offer implementations.
*   **Python `threading.Rlock` with counters:** While Python doesn't have a built-in ReadWriteLock, it can be emulated using a `threading.Rlock` (reentrant lock) combined with counters to track the number of active readers. This allows multiple readers to acquire the lock while writers must wait for all readers to release it. Libraries like `rwlock` provide ReadWriteLock implementations.
*   **C++ `shared_mutex` (C++17):**  C++17 introduced `std::shared_mutex`, explicitly designed as a Read-Write lock.  It provides `lock_shared()` for reading and `lock()` for writing. This simplifies concurrent data access in C++ applications.
