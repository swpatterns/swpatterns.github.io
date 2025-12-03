---
title: "Memento - C#"
date: 2025-12-03T13:19:42.881-05:00
draft: false
pattern_usage: ["Memento"]
language: ["C#"]
---
The Memento pattern is a behavioral design pattern that allows you to capture and externalize the internal state of an object without violating encapsulation. This enables restoring the object to its previous state later. It involves three key players: the Originator (holding the state), the Memento (a snapshot of the state), and the Caretaker (responsible for storing and retrieving Mementos).

Here, `GumballMachine` is the originator, holding the `state` (number of gumballs). `GumballMachineMemento` is a private inner class holding a snapshot of this state. `GumballMachineManager` is the caretaker, storing and retrieving mementos, providing undo/redo functionality.  This implementation utilizes a simple class structure, common in C#, and leverages immutability (the Memento is read-only) to preserve the originator’s state safely. This approach aligns with C#'s encapsulation principles and provides a clear separation of concerns.

```csharp
// Caretaker
public class GumballMachineManager
{
    private GumballMachineMemento memento;

    public void Save(GumballMachine gumballMachine)
    {
        memento = gumballMachine.CreateMemento();
    }

    public void Restore(GumballMachine gumballMachine)
    {
        gumballMachine.Restore(memento);
    }
}

// Originator
public class GumballMachine
{
    private int _gumballs;

    public GumballMachine(int gumballs)
    {
        _gumballs = gumballs;
    }

    public int Gumballs
    {
        get { return _gumballs; }
    }

    public void Dispense(int amount)
    {
        if (_gumballs >= amount)
        {
            _gumballs -= amount;
            Console.WriteLine($"Dispensing {amount} gumballs. Remaining: {_gumballs}");
        }
        else
        {
            Console.WriteLine("Not enough gumballs.");
        }
    }

    // Memento Creation
    public GumballMachineMemento CreateMemento()
    {
        return new GumballMachineMemento(_gumballs);
    }

    // Memento Restoration
    public void Restore(GumballMachineMemento memento)
    {
        _gumballs = memento.GetGumballs();
        Console.WriteLine($"Restored to {_gumballs} gumballs.");
    }

    // Private Memento class (holds state)
    private class GumballMachineMemento
    {
        private readonly int _gumballs;

        private GumballMachineMemento(int gumballs)
        {
            _gumballs = gumballs;
        }

        public int GetGumballs()
        {
            return _gumballs;
        }
    }
}

// Example Usage
public class Example
{
    public static void Main(string[] args)
    {
        GumballMachine gumballMachine = new GumballMachine(10);
        GumballMachineManager mementoManager = new GumballMachineManager();

        mementoManager.Save(gumballMachine);
        gumballMachine.Dispense(5);
        mementoManager.Save(gumballMachine);
        gumballMachine.Dispense(2);

        mementoManager.Restore(gumballMachine); // Restore to 5 gumballs
        mementoManager.Restore(gumballMachine); // Restore to 10 gumballs
    }
}
```