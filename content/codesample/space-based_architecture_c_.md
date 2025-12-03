---
title: "Space-Based Architecture - C#"
date: 2025-12-03T14:57:27.061-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["C#"]
---
The Space-Based Architecture pattern decouples application logic by using a central "space" (often a dictionary or similar data structure) to store application state and a set of independent "agents" that react to changes in that space. Agents subscribe to specific state changes and perform actions accordingly. This avoids direct dependencies between components, promoting flexibility and testability.

The C# example uses a `Dictionary` as the space, holding `string` keys representing events and `object` values representing event data. Agents are implemented as classes subscribing to events triggered when the space is updated.  The use of events and delegates is idiomatic C# for loosely coupled communication.  The `Space` class encapsulates the state and provides a controlled way to update it, triggering agent reactions.

```csharp
using System;
using System.Collections.Generic;

// The "Space" - holds application state
public class Space
{
    private readonly Dictionary<string, object> _state = new Dictionary<string, object>();
    public event EventHandler<StateChangedEventArgs> StateChanged;

    public object GetState(string key)
    {
        if (_state.ContainsKey(key))
        {
            return _state[key];
        }
        return null;
    }

    public void SetState(string key, object value)
    {
        _state[key] = value;
        OnStateChanged(key, value);
    }

    protected virtual void OnStateChanged(string key, object value)
    {
        StateChanged?.Invoke(this, new StateChangedEventArgs(key, value));
    }
}

// Event arguments for state changes
public class StateChangedEventArgs : EventArgs
{
    public string Key { get; }
    public object Value { get; }

    public StateChangedEventArgs(string key, object value)
    {
        Key = key;
        Value = value;
    }
}

// An "Agent" - reacts to state changes
public class OrderAgent
{
    private readonly Space _space;

    public OrderAgent(Space space)
    {
        _space = space;
        _space.StateChanged += OnSpaceStateChanged;
    }

    private void OnSpaceStateChanged(object sender, StateChangedEventArgs e)
    {
        if (e.Key == "newOrder")
        {
            var order = (string)e.Value;
            Console.WriteLine($"Order Agent: Processing new order - {order}");
            // Perform order processing logic here
        }
    }
}

// Another "Agent"
public class InventoryAgent
{
    private readonly Space _space;

    public InventoryAgent(Space space)
    {
        _space = space;
        _space.StateChanged += OnSpaceStateChanged;
    }

    private void OnSpaceStateChanged(object sender, StateChangedEventArgs e)
    {
        if (e.Key == "newOrder")
        {
            var order = (string)e.Value;
            Console.WriteLine($"Inventory Agent: Updating inventory for order - {order}");
            // Perform inventory update logic here
        }
    }
}

// Example Usage
public class Program
{
    public static void Main(string[] args)
    {
        var space = new Space();
        var orderAgent = new OrderAgent(space);
        var inventoryAgent = new InventoryAgent(space);

        space.SetState("newOrder", "Order #123 - Widget A x 2");
        space.SetState("newOrder", "Order #456 - Gadget B x 1");
    }
}
```