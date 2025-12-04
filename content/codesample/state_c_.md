---
title: "State - C#"
date: 2025-12-03T13:28:51.135-05:00
draft: false
pattern_usage: ["State"]
language: ["C_sharp"]
---
The State pattern allows an object to alter its behavior when its internal state changes. It encapsulates each state as a separate class, avoiding large conditional statements and promoting the Open/Closed Principle. 

This C# example models a simple traffic light. Each color (Red, Yellow, Green) is a separate state class implementing a common `TrafficLightState` interface. The `TrafficLightContext` manages the current state.  Transitions between states are handled *within* the state classes themselves, making the context unaware of specific state logic. The use of interfaces and abstract classes promotes loose coupling and extensibility - new states can be added without modifying existing ones. This is a clean and standard approach to state management in C#.

```csharp
// Define the State interface
public interface ITrafficLightState
{
    void Handle(TrafficLightContext context);
}

// Concrete State: Red
public class RedState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("Traffic Light: RED - Stop!");
        context.SetState(new YellowState()); // Transition to Yellow
    }
}

// Concrete State: Yellow
public class YellowState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("Traffic Light: YELLOW - Caution!");
        context.SetState(new GreenState()); // Transition to Green
    }
}

// Concrete State: Green
public class GreenState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("Traffic Light: GREEN - Go!");
        context.SetState(new RedState()); // Transition to Red
    }
}

// The Context
public class TrafficLightContext
{
    private ITrafficLightState _state;

    public TrafficLightContext()
    {
        _state = new RedState(); // Initial state
    }

    public void SetState(ITrafficLightState state)
    {
        _state = state;
    }

    public void Request()
    {
        _state.Handle(this);
    }
}

// Example Usage
public class Example
{
    public static void Main(string[] args)
    {
        TrafficLightContext trafficLight = new TrafficLightContext();
        for (int i = 0; i < 5; i++)
        {
            trafficLight.Request();
        }
    }
}
```