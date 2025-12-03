---
title: "N-tier - C#"
date: 2025-12-03T14:37:27.557-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["C#"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application more maintainable, testable, and scalable. A typical N-tier architecture includes a Presentation Tier (UI), a Business Logic Tier (BLL), and a Data Access Tier (DAL). 

This C# example focuses on the BLL and DAL, demonstrating how they interact. The `Product` class represents data. The `ProductRepository` (DAL) handles database interactions (simulated here with a list). The `ProductService` (BLL) encapsulates business rules and uses the repository to access data. This structure is common in C# applications, leveraging interfaces for dependency injection and clear separation of concerns, fitting the language’s object-oriented nature.

```csharp
// Model
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

// Data Access Tier (DAL)
public interface IProductRepository
{
    IEnumerable<Product> GetAll();
    Product GetById(int id);
    void Add(Product product);
}

public class ProductRepository : IProductRepository
{
    private readonly List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop", Price = 1200 },
        new Product { Id = 2, Name = "Mouse", Price = 25 }
    };

    public IEnumerable<Product> GetAll() => _products;
    public Product GetById(int id) => _products.FirstOrDefault(p => p.Id == id);
    public void Add(Product product)
    {
        product.Id = _products.Max(p => p.Id) + 1;
        _products.Add(product);
    }
}

// Business Logic Tier (BLL)
public interface IProductService
{
    IEnumerable<Product> GetAllProducts();
    Product GetProductById(int id);
    void AddProduct(Product product);
}

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public IEnumerable<Product> GetAllProducts() => _productRepository.GetAll();
    public Product GetProductById(int id) => _productRepository.GetById(id);
    public void AddProduct(Product product)
    {
        // Business logic (e.g., validation) can be added here.
        _productRepository.Add(product);
    }
}

// Example Usage (Presentation Tier would handle input/output)
public class Program
{
    public static void Main(string[] args)
    {
        IProductRepository repository = new ProductRepository();
        IProductService productService = new ProductService(repository);

        foreach (var product in productService.GetAllProducts())
        {
            Console.WriteLine($"ID: {product.Id}, Name: {product.Name}, Price: {product.Price}");
        }

        var newProduct = new Product { Name = "Keyboard", Price = 75 };
        productService.AddProduct(newProduct);

        Console.WriteLine($"Added new product with ID: {newProduct.Id}");

        foreach (var product in productService.GetAllProducts())
        {
            Console.WriteLine($"ID: {product.Id}, Name: {product.Name}, Price: {product.Price}");
        }
    }
}
```