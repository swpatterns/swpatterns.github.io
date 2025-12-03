---
title: "Mediator - C#"
date: 2025-12-03T13:14:56.114-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["C#"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interactions independently.  This example represents a simple chat room where users communicate through a `Chatroom` mediator instead of directly messaging each other.  C# lends itself well to the Mediator pattern via interfaces, allowing for flexible collaboration between components without tight dependencies. The code uses classes representing users and a central mediator to handle message passing, keeping user classes focused on their own concerns.

```csharp
// Mediator Interface
public interface IChatMediator
{
    void SendMessage(string message, User user);
    void RegisterUser(User user);
}

// Concrete Mediator
public class Chatroom : IChatMediator
{
    private List<User> users = new List<User>();

    public void SendMessage(string message, User user)
    {
        foreach (var u in users)
        {
            if (u != user)
            {
                u.Receive(message);
            }
        }
    }

    public void RegisterUser(User user)
    {
        users.Add(user);
    }
}

// Colleague (User)
public class User
{
    private string name;
    private IChatMediator mediator;

    public User(string name, IChatMediator mediator)
    {
        this.name = name;
        this.mediator = mediator;
        mediator.RegisterUser(this);
    }

    public void Send(string message)
    {
        mediator.SendMessage(message, this);
    }

    public void Receive(string message)
    {
        Console.WriteLine($"{name} received: {message}");
    }
}

// Example usage
public class Program
{
    public static void Main(string[] args)
    {
        Chatroom chat = new Chatroom();

        User alice = new User("Alice", chat);
        User bob = new User("Bob", chat);
        User charlie = new User("Charlie", chat);

        alice.Send("Hello, everyone!");
        bob.Send("Hi Alice, and Charlie!");
        charlie.Send("Hey guys!");
    }
}
```