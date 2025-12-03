---
title: "Factory Method - C#"
date: 2025-12-03T10:57:36.515-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["C#"]
---
The Factory Method pattern is a creational pattern that lets a class defer instantiation to subclasses. It defines an interface for creating an object, but lets subclasses decide which class to instantiate. This promotes loose coupling between the creator and the concrete products, allowing for flexibility and extensibility.

The C# example defines an `IProduct` interface and concrete product classes (`ConcreteProductA`, `ConcreteProductB`). The `Creator` class declares the `FactoryMethod` which returns an `IProduct`. Subclasses like `ConcreteCreatorA` and `ConcreteCreatorB` override `FactoryMethod` to return specific product types.  This adheres to C#’s OOP principles, utilizing interfaces and inheritance to achieve polymorphism and decoupling. The use of abstract classes and methods is a common C# practice for defining contracts and enabling customization.

```csharp
// IProduct interface
public interface IProduct
{
    string Operation();
}

// Concrete Products
public class ConcreteProductA : IProduct
{
    public string Operation()
    {
        return "ConcreteProductA operation";
    }
}

public class ConcreteProductB : IProduct
{
    public string Operation()
    {
        return "ConcreteProductB operation";
    }
}

// Creator class
public abstract class Creator
{
    public abstract IProduct FactoryMethod();

    public void SomeCommonOperation()
    {
        IProduct product = FactoryMethod();
        Console.WriteLine(product.Operation());
    }
}

// Concrete Creators
public class ConcreteCreatorA : Creator
{
    public override IProduct FactoryMethod()
    {
        return new ConcreteProductA();
    }
}

public class ConcreteCreatorB : Creator
{
    public override IProduct FactoryMethod()
    {
        return new ConcreteProductB();
    }
}

// Usage
public class Program
{
    public static void Main(string[] args)
    {
        Creator creatorA = new ConcreteCreatorA();
        creatorA.SomeCommonOperation();

        Creator creatorB = new ConcreteCreatorB();
        creatorB.SomeCommonOperation();
    }
}
```