---
title: "Onion Architecture - C#"
date: 2025-12-03T14:13:11.899-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["C#"]
---
The Onion Architecture aims for loose coupling and high testability by organizing code into concentric layers. The core layer contains business rules and entities, completely independent of infrastructure concerns.  Outer layers represent interfaces, data access, and presentation. Dependencies point *inward* – infrastructure depends on application logic, but application logic knows nothing of infrastructure. This promotes adaptability; you can swap databases or UI frameworks without impacting core business rules. 

This implementation defines interfaces in the Application and Infrastructure layers. The Domain layer houses entities and interfaces for use cases. The Startup layer (often a console app or ASP.NET core entry point) orchestrates dependencies. Dependency Injection (DI) is key, resolving dependencies against interface definitions. This structure embodies C#'s focus on strong typing and interface-based programming, facilitating testability and maintainability.

```csharp
// Domain Layer - Core Business Logic
namespace Onion.Domain.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}

namespace Onion.Domain.Interfaces;

public interface IProductRepository
{
    Product GetProduct(int id);
    void AddProduct(Product product);
}

// Application Layer - Use Cases
namespace Onion.Application.Services;

public class ProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public Product GetProductDetails(int id)
    {
        return _productRepository.GetProduct(id);
    }

    public void AddNewProduct(Product product)
    {
        _productRepository.AddProduct(product);
    }
}

// Infrastructure Layer - Data Access (e.g., EF Core)
namespace Onion.Infrastructure.Repositories;

using Onion.Domain.Interfaces;
using Onion.Domain.Models;

public class ProductRepository : IProductRepository
{
    // Simulate a database context
    private static List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Example Product", Price = 19.99m }
    };

    public Product GetProduct(int id)
    {
        return _products.FirstOrDefault(p => p.Id == id);
    }

    public void AddProduct(Product product)
    {
        _products.Add(product);
    }
}

// Startup / Composition Root (Console App example)
namespace Onion.Startup;

using Microsoft.Extensions.DependencyInjection;
using Onion.Application.Services;
using Onion.Domain.Interfaces;
using Onion.Infrastructure.Repositories;

public static class Program
{
    public static void Main(string[] args)
    {
        var services = new ServiceCollection();

        // Register Application Services
        services.AddScoped<ProductService>();

        // Register Infrastructure (implementations pointing to interfaces)
        services.AddScoped<IProductRepository, ProductRepository>();

        var serviceProvider = services.BuildServiceProvider();

        // Use the services
        var productService = serviceProvider.GetRequiredService<ProductService>();
        var product = productService.GetProductDetails(1);

        Console.WriteLine($"Product Name: {product?.Name}, Price: {product?.Price}");

        productService.AddNewProduct(new Domain.Models.Product{Id = 2, Name = "New Product", Price = 29.99m});

        var newProduct = productService.GetProductDetails(2);
        Console.WriteLine($"New Product Name: {newProduct?.Name}, Price: {newProduct?.Price}");
    }
}
```