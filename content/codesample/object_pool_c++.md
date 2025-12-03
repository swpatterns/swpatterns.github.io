---
title: "Object Pool - C++"
date: 2025-12-03T11:13:10.029-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["C++"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the overhead of frequent object creation and destruction. Instead of allocating new objects directly, clients request them from the pool. The pool provides existing available objects, or creates new ones if the pool is empty (up to a predefined maximum size). When an object is no longer needed, it's returned to the pool for reuse, rather than being destroyed.

This C++ implementation uses a `std::vector` to store the pooled objects.  The `Pool` class provides `acquire()` and `release()` methods to manage object access.  A simple `PooledObject` class is used as an example.  The use of a `std::mutex` ensures thread safety. This approach is idiomatic C++ as it leverages standard containers and synchronization primitives, promoting efficiency and avoiding manual memory management where possible.  Templates allow the pool to manage objects of any type.

```cpp
#include <iostream>
#include <vector>
#include <mutex>

template <typename T>
class Pool {
public:
    Pool(size_t size) : pool_size(size) {
        for (size_t i = 0; i < pool_size; ++i) {
            pool.push_back(std::make_unique<T>());
        }
    }

    T* acquire() {
        std::lock_guard<std::mutex> lock(mutex);
        if (pool.empty()) {
            return nullptr; // Or throw an exception
        }
        T* object = pool.back().get();
        pool.pop_back();
        return object;
    }

    void release(T* object) {
        std::lock_guard<std::mutex> lock(mutex);
        pool.push_back(std::unique_ptr<T>(object));
    }

private:
    size_t pool_size;
    std::vector<std::unique_ptr<T>> pool;
    std::mutex mutex;
};

class PooledObject {
public:
    PooledObject(int id) : id_(id) {
        std::cout << "PooledObject created with ID: " << id_ << std::endl;
    }

    ~PooledObject() {
        std::cout << "PooledObject destroyed with ID: " << id_ << std::endl;
    }

    int getId() const { return id_; }

private:
    int id_;
};

int main() {
    Pool<PooledObject> objectPool(5);

    PooledObject* obj1 = objectPool.acquire();
    if (obj1) {
        std::cout << "Acquired object with ID: " << obj1->getId() << std::endl;
    }

    PooledObject* obj2 = objectPool.acquire();
    if(obj2){
        std::cout << "Acquired object with ID: " << obj2->getId() << std::endl;
    }

    objectPool.release(obj1);
    objectPool.release(obj2);

    return 0;
}
```