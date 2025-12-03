---
title: "Publish-Subscribe - C#"
date: 2025-12-03T15:28:09.256-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["C#"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message publishers from subscribers. Publishers don't know who their subscribers are, and subscribers only know about the publishers through a central message broker (in this case, a simple event aggregator).  This promotes loose coupling and extensibility.

This C# implementation uses the `event` keyword and delegates to create a basic event system.  The `EventAggregator` class holds a list of subscribers for each event type.  Publishers use the `Publish` method to trigger events, and subscribers `Subscribe` to events they are interested in.  This aligns with C#'s event-driven programming model and offers strong type safety.  Using `event` simplifies event handling, making it concise and readable.

```csharp
// EventAggregator.cs
using System;
using System.Collections.Generic;

public class EventAggregator
{
    private readonly Dictionary<string, List<Delegate>> _eventSubscribers = new();

    public void Subscribe<TEvent>(string eventName, Action<TEvent> subscriber)
    {
        _eventSubscribers.TryGetValue(eventName, out var subscribers);
        subscribers ??= new List<Delegate>();
        subscribers.Add(subscriber);
        _eventSubscribers[eventName] = subscribers;
    }

    public void Publish<TEvent>(string eventName, TEvent args)
    {
        if (_eventSubscribers.TryGetValue(eventName, out var subscribers))
        {
            foreach (var subscriber in subscribers)
            {
                ((Action<TEvent>)subscriber)(args);
            }
        }
    }
}

// Example Usage
// Subscriber.cs
public class OrderService
{
    public void HandleOrderCreated(OrderCreatedEvent args)
    {
        Console.WriteLine($"Order created: {args.OrderId}, Customer: {args.CustomerName}");
    }
}

// Publisher.cs
public class OrderProcessor
{
    private readonly EventAggregator _eventAggregator;
    private readonly OrderService _orderService;

    public OrderProcessor(EventAggregator eventAggregator, OrderService orderService)
    {
        _eventAggregator = eventAggregator;
        _orderService = orderService;
    }

    public void CreateOrder(int orderId, string customerName)
    {
        // Process order...
        Console.WriteLine($"Processing order {orderId} for {customerName}");

        // Publish the event
        _eventAggregator.Publish("OrderCreated", new OrderCreatedEvent(orderId, customerName));
    }
}

// Event Data
public class OrderCreatedEvent
{
    public int OrderId { get; }
    public string CustomerName { get; }

    public OrderCreatedEvent(int orderId, string customerName)
    {
        OrderId = orderId;
        CustomerName = customerName;
    }
}

// Program.cs
public class Program
{
    public static void Main(string[] args)
    {
        var eventAggregator = new EventAggregator();
        var orderService = new OrderService();
        var orderProcessor = new OrderProcessor(eventAggregator, orderService);

        // Subscribe to the event
        eventAggregator.Subscribe("OrderCreated", orderService.HandleOrderCreated);

        // Create an order
        orderProcessor.CreateOrder(123, "Alice");
    }
}
```