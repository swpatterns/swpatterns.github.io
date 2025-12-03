---
title: "Object Pool - C"
date: 2025-12-03T11:13:30.847-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["C"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the overhead of frequent object creation and destruction. Instead of allocating new memory each time an object is needed, the pool provides an existing object. When an object is no longer needed, it's returned to the pool for later reuse. This improves performance, especially for expensive-to-create objects. The C implementation utilizes a fixed-size array to store pre-allocated objects. `pool_get()` retrieves an available object, while `pool_return()` places an unused object back into the pool. This is a low-level, manual approach fitting C’s style, offering direct memory control and efficiency without relying on runtime type information or garbage collection.

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Define the type of objects we'll pool
typedef struct {
    int data;
    bool in_use;
} MyObject;

// Object Pool structure
typedef struct {
    MyObject* objects;
    size_t pool_size;
    size_t next_free;
} ObjectPool;

// Initialize the object pool
ObjectPool* pool_init(size_t size) {
    ObjectPool* pool = (ObjectPool*)malloc(sizeof(ObjectPool));
    if (!pool) {
        return NULL;
    }

    pool->objects = (MyObject*)malloc(size * sizeof(MyObject));
    if (!pool->objects) {
        free(pool);
        return NULL;
    }

    pool->pool_size = size;
    pool->next_free = 0;

    for (size_t i = 0; i < size; ++i) {
        pool->objects[i].in_use = false;
    }

    return pool;
}

// Get an object from the pool
MyObject* pool_get(ObjectPool* pool) {
    if (pool->next_free < pool->pool_size) {
        MyObject* obj = &pool->objects[pool->next_free];
        obj->in_use = true;
        pool->next_free++;
        return obj;
    }
    return NULL; // Pool is empty
}

// Return an object to the pool
void pool_return(ObjectPool* pool, MyObject* obj) {
    if (obj && obj->in_use && (obj - &pool->objects[0]) < pool->pool_size) {
        obj->in_use = false;
        pool->next_free--; // Adjust to re-use the slot
    }
}

// Destroy the object pool
void pool_destroy(ObjectPool* pool) {
    if (pool) {
        if (pool->objects) {
            free(pool->objects);
        }
        free(pool);
    }
}

int main() {
    ObjectPool* pool = pool_init(5);

    if (!pool) {
        fprintf(stderr, "Failed to initialize pool\n");
        return 1;
    }

    MyObject* obj1 = pool_get(pool);
    MyObject* obj2 = pool_get(pool);

    if (obj1 && obj2) {
        obj1->data = 10;
        obj2->data = 20;
        printf("Object 1 data: %d\n", obj1->data);
        printf("Object 2 data: %d\n", obj2->data);
    }

    pool_return(pool, obj1);
    pool_return(pool, obj2);

    MyObject* obj3 = pool_get(pool);
    if(obj3) {
        printf("Object 3 data (reused): %d\n", obj3->data);
    }

    pool_destroy(pool);

    return 0;
}
```