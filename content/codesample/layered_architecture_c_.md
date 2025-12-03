---
title: "Layered Architecture - C#"
date: 2025-12-03T14:04:15.865-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["C#"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application more maintainable, testable, and adaptable to change. Common layers include Presentation, Business Logic, and Data Access.  Our C# example demonstrates a simplified version with these three layers. The `PresentationLayer` handles user interaction, the `BusinessLogicLayer` contains the core application rules, and the `DataAccessLayer` interacts with the data source (in this case, a simple in-memory list).  This implementation uses interfaces to decouple layers, a common C# practice for dependency injection and testability.

```csharp
// DataAccessLayer
namespace MyApp.DataAccess
{
    public interface IProductRepository
    {
        List<string> GetProducts();
    }

    public class ProductRepository : IProductRepository
    {
        private readonly List<string> _products = new List<string> { "Apple", "Banana", "Orange" };

        public List<string> GetProducts()
        {
            return _products;
        }
    }
}

// BusinessLogicLayer
namespace MyApp.BusinessLogic
{
    public interface IProductService
    {
        List<string> GetAllProducts();
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public List<string> GetAllProducts()
        {
            return _productRepository.GetProducts();
        }
    }
}

// PresentationLayer
namespace MyApp.Presentation
{
    public class ProductController
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        public void DisplayProducts()
        {
            var products = _productService.GetAllProducts();
            foreach (var product in products)
            {
                System.Console.WriteLine(product);
            }
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            // Dependency Injection
            var productRepository = new MyApp.DataAccess.ProductRepository();
            var productService = new MyApp.BusinessLogic.ProductService(productRepository);
            var productController = new ProductController(productService);

            productController.DisplayProducts();
        }
    }
}
```