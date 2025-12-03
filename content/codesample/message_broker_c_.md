---
title: "Message Broker - C#"
date: 2025-12-03T15:07:30.460-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["C#"]
---
The Message Broker pattern decouples application components by enabling them to communicate through intermediary message queues. Components don't need to know about each other; they simply send and receive messages. This promotes scalability, resilience, and flexibility.

This C# example uses a simple `MessageBroker` class that holds a list of message subscriptions (handlers). `SendMessage` iterates through relevant subscriptions and invokes their `HandleMessage` methods.  We define a concrete `OrderService` and `EmailService` which subscribe to messages of type `OrderCreatedMessage`.  This implementation leverages C# delegates for flexible message handling and is a common approach for event-driven architectures in C#.  The use of interfaces (`IMessageHandler`) further enhances decoupling.

```csharp
// IMessageHandler.cs
public interface IMessageHandler
{
    Type GetMessageType();
    void HandleMessage(object message);
}

// MessageBroker.cs
public class MessageBroker
{
    private readonly List<IMessageHandler> _handlers = new();

    public void Subscribe<T>(IMessageHandler handler)
    {
        _handlers.Add(handler);
    }

    public void Unsubscribe<T>(IMessageHandler handler)
    {
        _handlers.Remove(handler);
    }

    public void SendMessage(object message)
    {
        var messageType = message.GetType();
        foreach (var handler in _handlers)
        {
            if (handler.GetMessageType() == messageType)
            {
                handler.HandleMessage(message);
            }
        }
    }
}

// OrderCreatedMessage.cs
public class OrderCreatedMessage
{
    public int OrderId { get; }
    public decimal TotalAmount { get; }

    public OrderCreatedMessage(int orderId, decimal totalAmount)
    {
        OrderId = orderId;
        TotalAmount = totalAmount;
    }
}

// OrderService.cs
public class OrderService : IMessageHandler
{
    public Type GetMessageType() => typeof(OrderCreatedMessage);

    public void HandleMessage(object message)
    {
        var orderMessage = (OrderCreatedMessage)message;
        Console.WriteLine($"Order Service: Order created with ID {orderMessage.OrderId}, Amount: {orderMessage.TotalAmount}");
    }
}

// EmailService.cs
public class EmailService : IMessageHandler
{
    public Type GetMessageType() => typeof(OrderCreatedMessage);

    public void HandleMessage(object message)
    {
        var orderMessage = (OrderCreatedMessage)message;
        Console.WriteLine($"Email Service: Sending confirmation email for Order ID {orderMessage.OrderId}");
    }
}

// Example Usage
public class Program
{
    public static void Main(string[] args)
    {
        var broker = new MessageBroker();
        var orderService = new OrderService();
        var emailService = new EmailService();

        broker.Subscribe(orderService);
        broker.Subscribe(emailService);

        broker.SendMessage(new OrderCreatedMessage(123, 50.00m));
    }
}
```