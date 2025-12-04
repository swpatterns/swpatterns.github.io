---
title: "Proxy - C#"
date: 2025-12-03T12:46:15.541-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["C_sharp"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like remote access, security checks, or lazy initialization.  The `Subject` interface defines the common interface for both the real object (`RealSubject`) and the proxy (`Proxy`). The `Proxy` controls access to the `RealSubject`, potentially adding functionality before or after the real object's method is called. This C# implementation uses interfaces to define the contract, which is a common and preferred approach in C# for loose coupling and testability. The proxy handles the creation of the real subject only when needed.

```csharp
// Define the common interface for the real object and the proxy
public interface ISubject
{
    void Request();
}

// The real object
public class RealSubject : ISubject
{
    public void Request()
    {
        Console.WriteLine("RealSubject: Handling request.");
    }
}

// The proxy
public class Proxy : ISubject
{
    private ISubject? _realSubject;

    public void Request()
    {
        if (_realSubject == null)
        {
            Console.WriteLine("Proxy: Initializing RealSubject.");
            _realSubject = new RealSubject();
        }

        Console.WriteLine("Proxy: Logging request before forwarding.");
        _realSubject.Request();
        Console.WriteLine("Proxy: Logging request after forwarding.");
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        Proxy proxy = new Proxy();
        proxy.Request();
        proxy.Request(); // Demonstrates lazy initialization
    }
}
```