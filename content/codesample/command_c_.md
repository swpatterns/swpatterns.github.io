---
title: "Command - C#"
date: 2025-12-03T13:01:32.666-05:00
draft: false
pattern_usage: ["Command"]
language: ["C_sharp"]
---
The Command pattern encapsulates a request as an object, allowing parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This implementation defines a base `Command` class with an `Execute` method. Concrete commands like `FileSaveCommand` and `FileOpenCommand` implement this interface, holding the necessary data to perform the action. An `Invoker` class stores and executes commands.  This is idiomatic C# due to the use of interfaces for abstraction, delegates (implicitly used within the command’s execution) and clear separation of concerns, fitting well into the language’s object-oriented structure.

```csharp
// Command Pattern in C#

// Receiver - The object that knows how to perform the action
public class FileSystemReceiver
{
    public string FilePath { get; set; }

    public void OpenFile(string filePath)
    {
        FilePath = filePath;
        Console.WriteLine($"Opening file: {filePath}");
    }

    public void SaveFile(string filePath)
    {
        FilePath = filePath;
        Console.WriteLine($"Saving file to: {filePath}");
    }
}

// Command Interface
public interface ICommand
{
    void Execute();
}

// Concrete Commands
public class FileOpenCommand : ICommand
{
    private readonly FileSystemReceiver _receiver;
    private readonly string _filePath;

    public FileOpenCommand(FileSystemReceiver receiver, string filePath)
    {
        _receiver = receiver;
        _filePath = filePath;
    }

    public void Execute()
    {
        _receiver.OpenFile(_filePath);
    }
}

public class FileSaveCommand : ICommand
{
    private readonly FileSystemReceiver _receiver;
    private readonly string _filePath;

    public FileSaveCommand(FileSystemReceiver receiver, string filePath)
    {
        _receiver = receiver;
        _filePath = filePath;
    }

    public void Execute()
    {
        _receiver.SaveFile(_filePath);
    }
}

// Invoker - Stores and executes commands
public class Menu
{
    private readonly List<ICommand> _commands = new List<ICommand>();

    public void AddCommand(ICommand command)
    {
        _commands.Add(command);
    }

    public void ExecuteCommand(int index)
    {
        if (index >= 0 && index < _commands.Count)
        {
            _commands[index].Execute();
        }
        else
        {
            Console.WriteLine("Invalid command index.");
        }
    }
}

// Client
public class Program
{
    public static void Main(string[] args)
    {
        FileSystemReceiver fileSystem = new FileSystemReceiver();
        Menu menu = new Menu();

        menu.AddCommand(new FileOpenCommand(fileSystem, "document.txt"));
        menu.AddCommand(new FileSaveCommand(fileSystem, "document.txt"));

        menu.ExecuteCommand(0); // Open file
        menu.ExecuteCommand(1); // Save file
    }
}
```