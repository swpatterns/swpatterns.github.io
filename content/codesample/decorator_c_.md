---
title: "Decorator - C#"
date: 2025-12-03T11:39:10.079-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["C#"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class to add behavior, you "wrap" the original object with decorator classes, each adding a specific responsibility. This implementation uses interfaces to define the core component and the decorator, allowing for multiple decorators to be stacked. C#’s composition-based approach makes the Decorator pattern a natural fit, avoiding the rigidity of inheritance and promoting loose coupling.

```csharp
// Component Interface
public interface IMessage
{
    string GetMessage();
}

// Concrete Component
public class SimpleMessage : IMessage
{
    private readonly string _message;

    public SimpleMessage(string message)
    {
        _message = message;
    }

    public string GetMessage()
    {
        return _message;
    }
}

// Decorator Abstract Class
public abstract class MessageDecorator : IMessage
{
    protected readonly IMessage _message;

    protected MessageDecorator(IMessage message)
    {
        _message = message;
    }

    public virtual string GetMessage()
    {
        return _message.GetMessage();
    }
}

// Concrete Decorators
public class EncryptionDecorator : MessageDecorator
{
    public EncryptionDecorator(IMessage message) : base(message) { }

    public override string GetMessage()
    {
        return "Encrypted: " + base.GetMessage();
    }
}

public class PriorityDecorator : MessageDecorator
{
    public PriorityDecorator(IMessage message) : base(message) { }

    public override string GetMessage()
    {
        return "Priority: " + base.GetMessage();
    }
}

// Example Usage
public class Program
{
    public static void Main(string[] args)
    {
        IMessage message = new SimpleMessage("Hello, World!");

        message = new EncryptionDecorator(message);
        message = new PriorityDecorator(message);

        Console.WriteLine(message.GetMessage()); // Output: Priority: Encrypted: Hello, World!
    }
}
```