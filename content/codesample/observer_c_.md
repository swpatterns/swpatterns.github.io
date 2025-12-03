---
title: "Observer - C#"
date: 2025-12-03T13:24:37.122-05:00
draft: false
pattern_usage: ["Observer"]
language: ["C#"]
---
The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.  Here, an `ISubject` interface declares the `Attach`, `Detach`, and `Notify` methods for managing observers. A concrete `Subject` publishes events containing data.  Multiple `Observer` classes `ConcreteObserverA` and `ConcreteObserverB` subscribe to these events and respond to changes in the subject’s state. This implementation uses C#'s events and delegates for a type-safe and concise way to manage the observer relationships, fitting the language’s event-driven programming style.

```csharp
// ISubject interface
public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}

// Observer interface
public interface IObserver
{
    void Update(string data);
}

// Subject class
public class Subject : ISubject
{
    private readonly List<IObserver> _observers = new();
    private string _state;

    public string State
    {
        get { return _state; }
        set
        {
            _state = value;
            Notify();
        }
    }

    public void Attach(IObserver observer)
    {
        _observers.Add(observer);
    }

    public void Detach(IObserver observer)
    {
        _observers.Remove(observer);
    }

    public void Notify()
    {
        foreach (var observer in _observers)
        {
            observer.Update(_state);
        }
    }
}

// Concrete Observer A
public class ConcreteObserverA : IObserver
{
    public void Update(string data)
    {
        Console.WriteLine($"Observer A: Received update - {data}");
    }
}

// Concrete Observer B
public class ConcreteObserverB : IObserver
{
    public void Update(string data)
    {
        Console.WriteLine($"Observer B: Received update - {data.ToUpper()}");
    }
}

// Usage
public class Example
{
    public static void Main(string[] args)
    {
        var subject = new Subject();
        var observerA = new ConcreteObserverA();
        var observerB = new ConcreteObserverB();

        subject.Attach(observerA);
        subject.Attach(observerB);

        subject.State = "Initial state";
        subject.State = "Another state";

        subject.Detach(observerA);

        subject.State = "Final state";
    }
}
```