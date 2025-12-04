---
title: "Null Object - C#"
date: 2025-12-03T13:46:44.045-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["C_sharp"]
---
The Null Object pattern provides a substitute for a null reference or null value. It defines a class with default or "null" behavior, allowing you to avoid null checks throughout your code. This improves readability and reduces the risk of NullReferenceExceptions.

The C# example implements a `NullCustomer` class that inherits from an `ICustomer` interface.  `NullCustomer` provides empty or default implementations for all interface members, effectively acting as a "do-nothing" customer.  The client code can then request a customer and be assured of receiving a valid object, even if no actual customer exists, eliminating the need for null checks. This approach is idiomatic C# as it leverages interfaces for loose coupling and object composition to handle the absence of a real object.

```csharp
// ICustomer.cs
public interface ICustomer
{
    string GetName();
    string GetAddress();
    bool IsValid();
}

// Customer.cs
public class Customer : ICustomer
{
    public string Name { get; set; }
    public string Address { get; set; }

    public string GetName() => Name;
    public string GetAddress() => Address;
    public bool IsValid() => !string.IsNullOrEmpty(Name) && !string.IsNullOrEmpty(Address);
}

// NullCustomer.cs
public class NullCustomer : ICustomer
{
    public string GetName() => string.Empty;
    public string GetAddress() => string.Empty;
    public bool IsValid() => false;
}

// Client.cs
public class Client
{
    private readonly ICustomer _customer;

    public Client(ICustomer customer)
    {
        _customer = customer;
    }

    public void PrintCustomerDetails()
    {
        if (_customer.IsValid())
        {
            Console.WriteLine($"Name: {_customer.GetName()}");
            Console.WriteLine($"Address: {_customer.GetAddress()}");
        }
        else
        {
            Console.WriteLine("No customer details available.");
        }
    }
}

// Usage.cs
public class Usage
{
    public static void Main(string[] args)
    {
        Client clientWithCustomer = new Client(new Customer { Name = "Alice", Address = "123 Main St" });
        clientWithCustomer.PrintCustomerDetails();

        Client clientWithNullCustomer = new Client(new NullCustomer());
        clientWithNullCustomer.PrintCustomerDetails();
    }
}
```