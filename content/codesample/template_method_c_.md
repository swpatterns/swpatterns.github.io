---
title: "Template Method - C#"
date: 2025-12-03T13:37:40.800-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["C_sharp"]
---
The Template Method pattern defines the skeleton of an algorithm in an abstract class, deferring some steps to concrete subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm’s structure. This promotes code reuse and avoids duplication.

The C# code implements this using an abstract base class `AbstractWorkflow` with a `TemplateMethod` defining the overall workflow. Concrete workflow classes like `DownloadAndProcessWorkflow` and `UploadAndProcessWorkflow` extend `AbstractWorkflow` and override the specific 'primitive operations' (e.g., `Download`, `Upload`, `Process`) to provide their unique implementations, while maintaining the consistent order defined in the template method. This leverages C#’s inheritance and polymorphism features for a clean and type-safe implementation.

```csharp
// TemplateMethod.cs
using System;

// Abstract class defining the template method
public abstract class AbstractWorkflow
{
    public abstract void Download();
    public abstract void Process();
    public abstract void Upload();

    // Template method defines the algorithm's structure
    public void TemplateMethod()
    {
        Console.WriteLine("Starting Workflow...");
        Download();
        Process();
        Upload();
        Console.WriteLine("Workflow Complete.");
    }
}

// Concrete workflow 1
public class DownloadAndProcessWorkflow : AbstractWorkflow
{
    public override void Download()
    {
        Console.WriteLine("Downloading data...");
    }

    public override void Process()
    {
        Console.WriteLine("Processing downloaded data...");
    }

    public override void Upload()
    {
        Console.WriteLine("Upload not required for this workflow.");
    }
}

// Concrete workflow 2
public class UploadAndProcessWorkflow : AbstractWorkflow
{
    public override void Download()
    {
        Console.WriteLine("Download not required for this workflow.");
    }

    public override void Process()
    {
        Console.WriteLine("Processing uploaded data...");
    }

    public override void Upload()
    {
        Console.WriteLine("Uploading data...");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        AbstractWorkflow workflow1 = new DownloadAndProcessWorkflow();
        workflow1.TemplateMethod();

        Console.WriteLine("\n");

        AbstractWorkflow workflow2 = new UploadAndProcessWorkflow();
        workflow2.TemplateMethod();
    }
}
```