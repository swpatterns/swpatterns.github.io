---
title: "Object Pool - Python"
date: 2025-12-03T11:11:59.897-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Python"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the overhead of frequent object creation and destruction. This is particularly useful for expensive-to-create objects. The pool maintains a collection of objects, and instead of creating new ones, clients request objects from the pool. When an object is no longer needed, it's returned to the pool for reuse.

This Python implementation uses a simple list to store the available objects.  `PooledObject` represents the type of object being pooled.  `ObjectPool` handles object creation (up to a maximum size) and distribution. `acquire_object` retrieves an object, creating one if needed and available. `release_object` returns an object to the pool. This approach aligns with Python's dynamic nature and avoids complex synchronization for basic use cases.  More robust implementations might use threading locks for concurrent access.

```python
class PooledObject:
    def __init__(self, id):
        self.id = id
        self.reset()

    def reset(self):
        # Simulate expensive initialization/resetting
        print(f"Object {self.id} resetting...")
        self.value = 0

    def do_something(self):
        self.value += 1
        print(f"Object {self.id} did something. Value: {self.value}")


class ObjectPool:
    def __init__(self, obj_class, max_size):
        self.obj_class = obj_class
        self.max_size = max_size
        self.pool = []
        self._create_pool()

    def _create_pool(self):
        for i in range(self.max_size):
            self.pool.append(self.obj_class(i))

    def acquire_object(self):
        if self.pool:
            return self.pool.pop()
        else:
            return self.obj_class(len(self.pool))  # Create if pool is empty

    def release_object(self, obj):
        obj.reset()
        self.pool.append(obj)


if __name__ == "__main__":
    pool = ObjectPool(PooledObject, 3)

    obj1 = pool.acquire_object()
    obj1.do_something()
    obj1.do_something()

    obj2 = pool.acquire_object()
    obj2.do_something()

    pool.release_object(obj1)
    obj3 = pool.acquire_object()
    obj3.do_something()

    pool.release_object(obj2)
    pool.release_object(obj3)
```