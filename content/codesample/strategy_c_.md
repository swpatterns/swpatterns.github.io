---
title: "Strategy - C#"
date: 2025-12-03T13:33:11.719-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["C#"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. In this C# example, we have a `Context` (OrderProcessor) that needs to apply a shipping cost calculation.  Instead of hardcoding the logic, it relies on a `ShippingCostStrategy` interface. Concrete strategies like `StandardShipping`, `ExpressShipping`, and `FreeShipping` implement specific calculation formulas. The `OrderProcessor`'s constructor accepts the desired shipping strategy, enabling runtime algorithm selection. This follows C#’s principle of programming to interfaces and leveraging dependency injection for flexibility.

```csharp
// Strategy Interface
public interface IShippingCostStrategy
{
    decimal CalculateCost(decimal orderTotal, string destination);
}

// Concrete Strategies
public class StandardShipping : IShippingCostStrategy
{
    public decimal CalculateCost(decimal orderTotal, string destination)
    {
        // Base cost + distance-based cost
        return 5.00m + (orderTotal * 0.02m);
    }
}

public class ExpressShipping : IShippingCostStrategy
{
    public decimal CalculateCost(decimal orderTotal, string destination)
    {
        // Higher base cost + quicker delivery surcharge
        return 15.00m + (orderTotal * 0.05m);
    }
}

public class FreeShipping : IShippingCostStrategy
{
    public decimal CalculateCost(decimal orderTotal, string destination)
    {
        return 0.00m;
    }
}

// Context
public class OrderProcessor
{
    private readonly IShippingCostStrategy _shippingCostStrategy;

    public OrderProcessor(IShippingCostStrategy shippingCostStrategy)
    {
        _shippingCostStrategy = shippingCostStrategy;
    }

    public decimal CalculateShipping(decimal orderTotal, string destination)
    {
        return _shippingCostStrategy.CalculateCost(orderTotal, destination);
    }
}

// Usage
public class Program
{
    public static void Main(string[] args)
    {
        var standardShipping = new StandardShipping();
        var expressShipping = new ExpressShipping();
        var freeShipping = new FreeShipping();

        var orderProcessor1 = new OrderProcessor(standardShipping);
        var orderProcessor2 = new OrderProcessor(expressShipping);
        var orderProcessor3 = new OrderProcessor(freeShipping);

        decimal cost1 = orderProcessor1.CalculateShipping(100, "USA");
        decimal cost2 = orderProcessor2.CalculateShipping(100, "USA");
        decimal cost3 = orderProcessor3.CalculateShipping(100, "USA");
        
        Console.WriteLine($"Standard Shipping Cost: {cost1}");
        Console.WriteLine($"Express Shipping Cost: {cost2}");
        Console.WriteLine($"Free Shipping Cost: {cost3}");
    }
}
```