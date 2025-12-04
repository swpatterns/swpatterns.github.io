---
title: "Specification - C#"
date: 2025-12-03T13:51:04.632-05:00
draft: false
pattern_usage: ["Specification"]
language: ["C_sharp"]
---
The Specification pattern is a behavioral design pattern that encapsulates a set of criteria (a "specification") as an object. This allows you to decouple complex filtering logic from the data it operates on, making code more maintainable and reusable.  The code defines an `ISpecification` interface with methods for `IsSatisfiedBy` (checking if an object meets the criteria) and `Combine` (composing specifications).  A concrete `AgeSpecification` implements this to check if a person's age is within a range. C#’s use of interfaces and LINQ makes this pattern a natural fit, promoting loose coupling and expressive querying.

```csharp
// Specification Pattern in C#

public interface ISpecification<T>
{
    bool IsSatisfiedBy(T item);
    ISpecification<T> Combine(ISpecification<T> other);
}

public class AgeSpecification : ISpecification<int>
{
    private readonly int _minAge;
    private readonly int _maxAge;

    public AgeSpecification(int minAge, int maxAge)
    {
        _minAge = minAge;
        _maxAge = maxAge;
    }

    public bool IsSatisfiedBy(int age)
    {
        return age >= _minAge && age <= _maxAge;
    }

    public ISpecification<int> Combine(ISpecification<int> other)
    {
        return new AndSpecification<int>(this, other);
    }
}

public class AndSpecification<T> : ISpecification<T>
{
    private readonly ISpecification<T> _first;
    private readonly ISpecification<T> _second;

    public AndSpecification(ISpecification<T> first, ISpecification<T> second)
    {
        _first = first;
        _second = second;
    }

    public bool IsSatisfiedBy(T item)
    {
        return _first.IsSatisfiedBy(item) && _second.IsSatisfiedBy(item);
    }

    public ISpecification<T> Combine(ISpecification<T> other)
    {
        return new AndSpecification<T>(this, other);
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        var ageSpec = new AgeSpecification(18, 65);
        
        // Example usage with a list of ages
        List<int> ages = new List<int> { 15, 25, 70, 30, 60 };
        var filteredAges = ages.Where(ageSpec.IsSatisfiedBy).ToList();

        Console.WriteLine(string.Join(", ", filteredAges)); // Output: 25, 30, 60
    }
}
```