---
title: "Self-contained Systems - C#"
date: 2025-12-03T14:29:10.868-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["C_sharp"]
---
The Self-Contained System pattern aims to minimize dependencies by bundling everything a component needs—code, configurations, and even runtime components—within itself. This promotes portability, simplifies deployment, and avoids conflicts arising from shared dependencies. The C# example below demonstrates this by creating a simple console application with its own embedded resources for configuration, avoiding external config files or package references beyond the standard .NET runtime. This approach is common in scenarios like developing tools intended for use in restricted environments or where controlling the entire execution context is paramount. It leverages C#’s capability to embed resources directly into an executable.

```csharp
// SelfContainedApp.cs
using System;
using System.IO;
using System.Reflection;

namespace SelfContainedApp
{
    class Program
    {
        static void Main(string[] args)
        {
            string configData = ReadEmbeddedResource("SelfContainedApp.Config.txt");
            Console.WriteLine("Loaded Configuration:");
            Console.WriteLine(configData);

            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }

        static string ReadEmbeddedResource(string resourceName)
        {
            using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    return "Error: Resource not found.";
                }

                using (var reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }
}
```

```
// SelfContainedApp.Config.txt (embedded resource)
Setting1=Value1
Setting2=Value2
```

(To make this truly self-contained in a real-world scenario, one would embed potentially other dependencies. However, for clarity of demonstrating the pattern, only a simple config file is embedded.)