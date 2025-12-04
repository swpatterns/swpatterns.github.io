---
title: "Composite - C#"
date: 2025-12-03T11:35:11.388-05:00
draft: false
pattern_usage: ["Composite"]
language: ["C_sharp"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It's used when you have a hierarchical structure of objects, and you want to perform operations on the entire structure without knowing whether you're dealing with a single object or a composite of many. In this C# example, we represent a file system structure where files and folders can be nested. The `FileSystemComponent` is the abstract base class, `File` is a leaf node representing a file, and `Folder` is a composite node containing other `FileSystemComponent`s.  The `Operation()` method demonstrates a common operation (printing name) done on the whole structure. This implementation leverages interfaces and abstract classes, common in C# for defining flexible and extensible behaviors.

```csharp
// FileSystemComponent.cs
using System;
using System.Collections.Generic;

public interface IFileSystemComponent
{
    void Operation(int depth);
}

public abstract class FileSystemComponent : IFileSystemComponent
{
    protected string name;

    public FileSystemComponent(string name)
    {
        this.name = name;
    }

    public abstract void Operation(int depth);
}

// File.cs
public class File : FileSystemComponent
{
    public File(string name) : base(name) { }

    public override void Operation(int depth)
    {
        Console.WriteLine($"{new string(' ', depth * 2)}- {name}");
    }
}

// Folder.cs
public class Folder : FileSystemComponent
{
    private List<IFileSystemComponent> children = new List<IFileSystemComponent>();

    public Folder(string name) : base(name) { }

    public void Add(IFileSystemComponent component)
    {
        children.Add(component);
    }

    public void Remove(IFileSystemComponent component)
    {
        children.Remove(component);
    }

    public override void Operation(int depth)
    {
        Console.WriteLine($"{new string(' ', depth * 2)}+ {name}");
        foreach (var child in children)
        {
            child.Operation(depth + 1);
        }
    }
}

// Example usage.cs
public class Example
{
    public static void Main(string[] args)
    {
        var root = new Folder("MyDocuments");
        root.Add(new Folder("Work"));
        root.Add(new File("Resume.txt"));
        var workFolder = (Folder)root.children[0];
        workFolder.Add(new File("ProjectReport.docx"));
        workFolder.Add(new Folder("ClientA"));
        var clientAFolder = (Folder)workFolder.children[1];
        clientAFolder.Add(new File("Contract.pdf"));
        
        root.Operation(0);
    }
}
```