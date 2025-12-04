---
title: "Policy - C#"
date: 2025-12-03T13:55:56.041-05:00
draft: false
pattern_usage: ["Policy"]
language: ["C_sharp"]
---
The Policy pattern allows you to encapsulate a changeable algorithm or set of rules into a separate object. This promotes flexibility as you can swap out different policies at runtime without modifying the core logic that *uses* the policy.  This example demonstrates a simple pricing policy. The `PricingService` class depends on an `IPricingPolicy` interface.  Different concrete policies (e.g., `StandardPricingPolicy`, `DiscountedPricingPolicy`) implement the pricing logic.  The client can inject the desired policy, enabling dynamic pricing strategies. This approach aligns with C#'s dependency injection principles and interface-based programming, making the code testable and maintainable.

```csharp
// IPricingPolicy.cs
public interface IPricingPolicy
{
    decimal CalculatePrice(decimal originalPrice, int quantity);
}

// StandardPricingPolicy.cs
public class StandardPricingPolicy : IPricingPolicy
{
    public decimal CalculatePrice(decimal originalPrice, int quantity)
    {
        return originalPrice * quantity;
    }
}

// DiscountedPricingPolicy.cs
public class DiscountedPricingPolicy : IPricingPolicy
{
    private readonly decimal _discountPercentage;

    public DiscountedPricingPolicy(decimal discountPercentage)
    {
        _discountPercentage = discountPercentage;
    }

    public decimal CalculatePrice(decimal originalPrice, int quantity)
    {
        decimal discountFactor = 1 - _discountPercentage;
        return (originalPrice * quantity) * discountFactor;
    }
}

// PricingService.cs
public class PricingService
{
    private readonly IPricingPolicy _pricingPolicy;

    public PricingService(IPricingPolicy pricingPolicy)
    {
        _pricingPolicy = pricingPolicy;
    }

    public decimal GetPrice(decimal originalPrice, int quantity)
    {
        return _pricingPolicy.CalculatePrice(originalPrice, quantity);
    }
}

// Example Usage (Program.cs)
public class Program
{
    public static void Main(string[] args)
    {
        // Use standard pricing
        var standardPolicy = new StandardPricingPolicy();
        var pricingServiceStandard = new PricingService(standardPolicy);
        decimal price1 = pricingServiceStandard.GetPrice(10, 5);
        Console.WriteLine($"Standard Price: {price1}");

        // Use discounted pricing
        var discountPolicy = new DiscountedPricingPolicy(0.1m); // 10% discount
        var pricingServiceDiscount = new PricingService(discountPolicy);
        decimal price2 = pricingServiceDiscount.GetPrice(10, 5);
        Console.WriteLine($"Discounted Price: {price2}");
    }
}
```