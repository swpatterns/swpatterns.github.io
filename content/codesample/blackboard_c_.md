---
title: "Blackboard - C#"
date: 2025-12-03T15:23:53.948-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["C#"]
---
The Blackboard pattern is a computational architecture for solving problems that don't have a pre-defined solution sequence. It consists of several knowledge sources (KSs) that independently examine a shared data structure (the blackboard) and contribute to the solution when they have relevant information. A control component manages the KS execution order. This implementation uses a simple string blackboard and KSs that perform basic string manipulations. It's idiomatic C# due to its use of interfaces for KSs, allowing for loose coupling and extensibility, and delegates for the control component to manage KS execution.

```csharp
// Blackboard.cs
using System;
using System.Collections.Generic;

// Define the Blackboard interface
public interface IBlackboard
{
    string Data { get; set; }
}

// Concrete Blackboard implementation
public class StringBlackboard : IBlackboard
{
    public string Data { get; set; } = string.Empty;
}

// Define the Knowledge Source interface
public interface IKnowledgeSource
{
    void Execute(IBlackboard blackboard);
}

// Concrete Knowledge Sources
public class UppercaseKS : IKnowledgeSource
{
    public void Execute(IBlackboard blackboard)
    {
        if (!string.IsNullOrEmpty(blackboard.Data))
        {
            blackboard.Data = blackboard.Data.ToUpper();
        }
    }
}

public class ReverseKS : IKnowledgeSource
{
    public void Execute(IBlackboard blackboard)
    {
        if (!string.IsNullOrEmpty(blackboard.Data))
        {
            blackboard.Data = new string(blackboard.Data.ToCharArray().Reverse().ToArray());
        }
    }
}

public class TrimKS : IKnowledgeSource
{
    public void Execute(IBlackboard blackboard)
    {
        if (!string.IsNullOrEmpty(blackboard.Data))
        {
            blackboard.Data = blackboard.Data.Trim();
        }
    }
}

// Control component
public class BlackboardController
{
    private readonly List<IKnowledgeSource> _knowledgeSources;

    public BlackboardController(List<IKnowledgeSource> knowledgeSources)
    {
        _knowledgeSources = knowledgeSources;
    }

    public void Run(IBlackboard blackboard)
    {
        foreach (var ks in _knowledgeSources)
        {
            ks.Execute(blackboard);
        }
    }
}
// Usage Example
public class Program
{
    public static void Main(string[] args)
    {
        StringBlackboard blackboard = new StringBlackboard();
        blackboard.Data = "  hello world ";

        List<IKnowledgeSource> knowledgeSources = new List<IKnowledgeSource>()
        {
            new UppercaseKS(),
            new TrimKS(),
            new ReverseKS()
        };

        BlackboardController controller = new BlackboardController(knowledgeSources);
        controller.Run(blackboard);

        Console.WriteLine(blackboard.Data); // Output: DLROW OLLEH
    }
}
```