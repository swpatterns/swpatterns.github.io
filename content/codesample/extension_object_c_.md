---
title: "Extension Object - C#"
date: 2025-12-03T12:52:56.927-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["C#"]
---
The Extension Object pattern allows adding functionality to existing classes without modifying their source code, using a separate "extension" class that holds the new methods. This is particularly useful when you can't or don't want to alter the original class, perhaps because it's from a third-party library or part of a core system.  In C#, this is naturally implemented using Extension Methods. The example extends the `string` class with a method to count the number of vowels. This fits C# style as extension methods are a first-class language feature, providing a clean and type-safe way to add functionality.

```csharp
// ExtensionObjectExample.cs
using System;
using System.Linq;

public static class StringExtensions
{
    public static int CountVowels(this string str)
    {
        if (string.IsNullOrEmpty(str))
        {
            return 0;
        }

        return str.ToLower().Count(c => "aeiou".Contains(c));
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        string myString = "Hello World";
        int vowelCount = myString.CountVowels();
        Console.WriteLine($"The string \"{myString}\" contains {vowelCount} vowels.");

        string emptyString = "";
        Console.WriteLine($"The string \"{emptyString}\" contains {emptyString.CountVowels()} vowels.");
    }
}
```