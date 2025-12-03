---
title: "Monolith - C#"
date: 2025-12-03T14:25:17.780-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["C#"]
---
The Monolith pattern, in its most basic form, represents a traditional software architecture where all components of an application are tightly coupled and deployed as a single unit. While often criticized for scalability challenges, it simplifies development and initial deployment.  This C# example presents a complete, albeit simplified, application handling basic product operations (add, list) within a single project.  It utilizes a single class `ProductManager` to encapsulate all functionalities, demonstrating the core concept of a monolith – everything resides in one place. While a real-world monolith would be much larger and more complex, this example reflects the architectural style by lacking distinct service boundaries. The use of simple console I/O and a list for storage is common in simple C# applications and reflects a pragmatic approach to demonstrating the pattern.

```csharp
// Program.cs
using System;
using System.Collections.Generic;

public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}

public class ProductManager
{
    private readonly List<Product> _products = new List<Product>();

    public void AddProduct(string name, decimal price)
    {
        _products.Add(new Product { Name = name, Price = price });
        Console.WriteLine($"Product '{name}' added successfully.");
    }

    public void ListProducts()
    {
        if (_products.Count == 0)
        {
            Console.WriteLine("No products available.");
            return;
        }

        Console.WriteLine("Available Products:");
        foreach (var product in _products)
        {
            Console.WriteLine($"- {product.Name}: ${product.Price}");
        }
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        ProductManager manager = new ProductManager();

        manager.AddProduct("Laptop", 1200.00m);
        manager.AddProduct("Mouse", 25.00m);
        manager.ListProducts();
    }
}
```