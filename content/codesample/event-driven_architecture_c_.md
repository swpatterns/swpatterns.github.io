---
title: "Event-Driven Architecture - C#"
date: 2025-12-03T14:52:18.283-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["C_sharp"]
---
The Event-Driven Architecture (EDA) decouples system components by allowing them to communicate through events. Components (event producers) emit events when a state change occurs, and other components (event consumers) subscribe to these events and react accordingly, without needing direct knowledge of the producers. This promotes scalability, flexibility, and resilience.

The C# example uses the built-in `event` keyword and delegates to implement a simple EDA. `OrderService` publishes an `OrderPlaced` event when an order is created. `EmailService` and `LoggingService` subscribe to this event and perform their respective actions. This approach is idiomatic C# because it leverages the language's type-safe event handling mechanism, promoting loose coupling and maintainability.  The use of delegates provides a clean and concise way to define event handlers.

```csharp
// Define the event arguments
public class OrderPlacedEventArgs : EventArgs
{
    public int OrderId { get; }
    public string CustomerName { get; }

    public OrderPlacedEventArgs(int orderId, string customerName)
    {
        OrderId = orderId;
        CustomerName = customerName;
    }
}

// Event Producer
public class OrderService
{
    // Define the event
    public event EventHandler<OrderPlacedEventArgs> OrderPlaced;

    public void CreateOrder(string customerName)
    {
        int orderId = new Random().Next(1000); // Simulate order ID generation
        Console.WriteLine($"Order created with ID: {orderId} for {customerName}");

        // Raise the event
        OnOrderPlaced(new OrderPlacedEventArgs(orderId, customerName));
    }

    protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
    {
        // Make a local copy to avoid race conditions
        EventHandler<OrderPlacedEventArgs> handler = OrderPlaced;
        handler?.Invoke(this, e);
    }
}

// Event Consumers
public class EmailService
{
    public void HandleOrderPlaced(object sender, OrderPlacedEventArgs e)
    {
        Console.WriteLine($"EmailService: Sending confirmation email to {e.CustomerName} for order {e.OrderId}");
    }
}

public class LoggingService
{
    public void HandleOrderPlaced(object sender, OrderPlacedEventArgs e)
    {
        Console.WriteLine($"LoggingService: Logging order placement - Order ID: {e.OrderId}, Customer: {e.CustomerName}");
    }
}

// Usage
public class Program
{
    public static void Main(string[] args)
    {
        OrderService orderService = new OrderService();
        EmailService emailService = new EmailService();
        LoggingService loggingService = new LoggingService();

        // Subscribe to the event
        orderService.OrderPlaced += emailService.HandleOrderPlaced;
        orderService.OrderPlaced += loggingService.HandleOrderPlaced;

        // Create an order
        orderService.CreateOrder("Alice Smith");
        orderService.CreateOrder("Bob Johnson");
    }
}
```