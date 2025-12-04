---
title: "Chain of Responsibility - C#"
date: 2025-12-03T12:56:41.751-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["C_sharp"]
---
The Chain of Responsibility pattern allows a request to be passed along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its specific receivers, allowing multiple objects to potentially handle the request without the sender knowing which one.

This C# implementation uses an abstract `Handler` class defining the chain structure and a `HandleRequest` method. Concrete handlers (`ConcreteHandlerA`, `ConcreteHandlerB`) either process the request if they can, or pass it on.  The client creates and links the handlers, then sends the request to the first handler in the chain. C#’s interface and abstract class capabilities are leveraged for flexibility and extensibility, fitting the object-oriented nature of the language.

```csharp
// Chain of Responsibility
// https://gist.github.com/your-username/your-gist-id

// Abstract Handler
public abstract class Handler
{
    protected Handler _next;

    public void SetNext(Handler next)
    {
        _next = next;
    }

    public abstract void HandleRequest(string request);
}

// Concrete Handlers
public class ConcreteHandlerA : Handler
{
    public override void HandleRequest(string request)
    {
        if (request == "A")
        {
            Console.WriteLine("ConcreteHandlerA handling request: " + request);
        }
        else if (_next != null)
        {
            _next.HandleRequest(request);
        }
        else
        {
            Console.WriteLine("Request not handled.");
        }
    }
}

public class ConcreteHandlerB : Handler
{
    public override void HandleRequest(string request)
    {
        if (request == "B")
        {
            Console.WriteLine("ConcreteHandlerB handling request: " + request);
        }
        else if (_next != null)
        {
            _next.HandleRequest(request);
        }
        else
        {
            Console.WriteLine("Request not handled.");
        }
    }
}

// Client
public class Client
{
    public static void Main(string[] args)
    {
        Handler handlerA = new ConcreteHandlerA();
        Handler handlerB = new ConcreteHandlerB();

        handlerA.SetNext(handlerB);

        handlerA.HandleRequest("A");
        handlerA.HandleRequest("B");
        handlerA.HandleRequest("C");
    }
}
```