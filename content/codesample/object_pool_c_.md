---
title: "Object Pool - C#"
date: 2025-12-03T11:12:50.893-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["C_sharp"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the performance overhead of frequent object creation and destruction. Instead of allocating new objects each time one is needed, the pool provides existing instances. When an object is no longer required, it's returned to the pool for later reuse. This is particularly beneficial for expensive-to-create objects.

The C# implementation uses a generic class `ObjectPool<T>` to manage the pool. It maintains a `List<T>` of available objects and provides `Get()` and `Release()` methods. `Get()` either retrieves a free object or creates a new one if the pool is empty (up to a maximum size). `Release()` returns an object to the pool, making it available for reuse.  The use of generics makes the pool type-safe and reusable.  The `using` statement ensures objects are always returned to the pool, even in the event of exceptions.

```csharp
using System;
using System.Collections.Generic;

public class ObjectPool<T> where T : new()
{
    private readonly List<T> _pool = new List<T>();
    private readonly int _maxSize;

    public ObjectPool(int maxSize)
    {
        _maxSize = maxSize;
    }

    public T Get()
    {
        lock (_pool)
        {
            if (_pool.Count > 0)
            {
                return _pool.Dequeue();
            }

            if (_pool.Count < _maxSize)
            {
                return new T();
            }

            throw new InvalidOperationException("Pool is exhausted.");
        }
    }

    public void Release(T obj)
    {
        lock (_pool)
        {
            _pool.Enqueue(obj);
        }
    }
}

// Example Usage
public class ExpensiveObject : IDisposable
{
    public ExpensiveObject()
    {
        Console.WriteLine("Expensive object created.");
    }

    public void DoSomething()
    {
        Console.WriteLine("Doing something with the expensive object.");
    }

    public void Dispose()
    {
        Console.WriteLine("Expensive object disposed.");
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        var pool = new ObjectPool<ExpensiveObject>(3);

        for (int i = 0; i < 5; i++)
        {
            using (var obj = pool.Get())
            {
                obj.DoSomething();
            }
            Console.WriteLine($"Iteration {i+1} complete.");
        }
    }
}
```