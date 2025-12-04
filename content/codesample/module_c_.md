---
title: "Module - C#"
date: 2025-12-03T12:49:46.272-05:00
draft: false
pattern_usage: ["Module"]
language: ["C_sharp"]
---
The Module pattern, also known as the Minit pattern, aims to encapsulate functionality within a single type, exposing a minimal public interface. It's particularly useful for grouping related functions and constants without creating a formal class with state. This promotes code organization and reduces namespace pollution.

The C# implementation uses a static class to hold all related functionality.  All members are private except for the explicitly exposed public methods. This approach leverages C#'s static class capabilities to achieve the desired encapsulation and minimal interface.  It's idiomatic because C# readily supports static classes, making them a natural fit for this pattern, and avoids unnecessary object instantiation.

```csharp
// Module.cs
public static class StringFormatter
{
    private const string DefaultSeparator = "-";

    public static string ToKebabCase(string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            return string.Empty;
        }

        var result = System.Text.RegularExpressions.Regex.Replace(input, "[^a-zA-Z0-9]", " ");
        result = string.Join(DefaultSeparator, result.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)).ToLower();
        return result;
    }

    public static string Truncate(string input, int maxLength)
    {
        if (string.IsNullOrEmpty(input) || input.Length <= maxLength)
        {
            return input;
        }

        return input.Substring(0, maxLength) + "...";
    }

    internal static string GetInternalConstant()
    {
        return DefaultSeparator;
    }
}
```