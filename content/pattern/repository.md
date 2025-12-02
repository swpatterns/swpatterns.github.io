
---
title: Repository
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["DDD", "behavioral"]
wikipedia: https://en.wikipedia.org/wiki/Repository_pattern
diagramtype: "class"
diagram: "[Client] -- Repository : uses > [Interface] : implements > [ConcreteRepository] : implements < [Entities]"
code: true
---

The Repository pattern provides an abstraction layer between the domain logic and the data access layer. It encapsulates the complexities of data access, allowing the domain to work with objects without knowing how they are stored or retrieved. This promotes loose coupling, making the application easier to test, maintain, and evolve, as changes to the data access implementation don't necessarily impact the domain logic.

Essentially, the repository acts as a collection of domain objects, providing methods for retrieving, adding, updating, and deleting these objects. It shields the rest of the application from the specifics of the underlying data store (e.g., relational database, NoSQL database, in-memory list).  The pattern promotes the Single Responsibility Principle by centralizing data access concerns.

## Usage

The Repository pattern is commonly used in:

*   **Domain-Driven Design (DDD):** As a core element for separating concerns between the domain model and infrastructure.
*   **Data Access Layer (DAL):** When building applications that need to interact with various data sources.
*   **Unit Testing:** Facilitating the use of mock repositories to isolate unit tests from the real database.
*   **Microservices:**  Allowing individual services to manage their own data persistence without exposing database details to other services.
*   **Applications with complex business rules:** Where the domain logic should be free from data access concerns.

## Examples

*   **Entity Framework Core (C#):**  EF Core's `DbContext` class, when used in conjunction with repository classes, essentially implements the Repository pattern. The `DbContext` handles the underlying database interactions, while the repository provides an interface for accessing and manipulating entities without directly exposing database queries.

    csharp
    public interface IProductRepository
    {
        IEnumerable<Product> GetAll();
        Product GetById(int id);
        void Add(Product product);
        void Update(Product product);
        void Delete(Product product);
    }

    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Implementation using _context to interact with the database
    }
    

*   **Django ORM (Python):** Django’s Model classes and their associated methods (e.g., `objects.get()`, `objects.filter()`, `objects.create()`) act as repositories. While not a strict implementation adhering to a formalized interface, the ORM handles the database interaction, allowing developers to work with Python objects representing database records.  Custom model managers can further enhance this behavior, providing more specialized repository-like functionality.

    python
    from django.db import models

    class Product(models.Model):
        name = models.CharField(max_length=100)
        price = models.DecimalField(max_digits=10, decimal_places=2)

        @classmethod
        def get_all(cls):
            return cls.objects.all()

        @classmethod
        def get_by_id(cls, id):
            return cls.objects.get(pk=id)
    