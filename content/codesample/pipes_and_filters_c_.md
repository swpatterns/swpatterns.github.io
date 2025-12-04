---
title: "Pipes and Filters - C#"
date: 2025-12-03T15:20:14.898-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["C_sharp"]
---
The Pipes and Filters pattern breaks down a larger processing task into a series of independent, reusable processing stages (filters) connected by channels (pipes). Each filter performs a specific transformation on the data it receives, passing the result to the next filter in the pipeline. This promotes modularity, separation of concerns, and allows for easy modification of the processing chain.

The C# example uses `Func<T, T>` delegates to represent the filters, creating a flexible and composable pipeline.  The `Pipe` method combines these filters sequentially, applying each transformation to the input data.  Using delegates and method chaining aligns with C#'s functional programming capabilities and promotes a clean, readable style.  Error handling is left out for brevity, but should be implemented in a production environment.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public static class Pipeline
{
    public static T Pipe<T>(T input, params Func<T, T>[] filters)
    {
        return filters.Aggregate(input, (acc, filter) => filter(acc));
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        string inputString = "  Hello, World!  ";

        // Define filters
        Func<string, string> trimFilter = s => s.Trim();
        Func<string, string> toLowerFilter = s => s.ToLower();
        Func<string, string> replaceFilter = s => s.Replace("world", "c#");

        // Create and execute the pipeline
        string result = Pipeline.Pipe(inputString, trimFilter, toLowerFilter, replaceFilter);

        Console.WriteLine($"Original: '{inputString}'");
        Console.WriteLine($"Processed: '{result}'");
    }
}
```