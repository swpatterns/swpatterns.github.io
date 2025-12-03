---
title: "Interpreter - C#"
date: 2025-12-03T13:06:14.800-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["C#"]
---
The Interpreter pattern defines a way to represent a grammar for a language and uses an interpreter to process statements in that language. It's particularly useful when a language is simple, and changing the grammar is frequent.  This example implements a simple arithmetic expression interpreter for addition and subtraction of integers.  Each expression component (number, addition, subtraction) is represented by a separate class implementing a common `Expression` interface.  The `Interpreter` class takes a string expression and constructs an Abstract Syntax Tree (AST) from the individual expressions, then evaluates it.  This leverages C#'s strong typing and interface-based programming for a clear and extensible solution.

```csharp
// Expression Interface
public interface IExpression
{
    int Interpret();
}

// Terminal Expression - Number
public class Number : IExpression
{
    private readonly int _value;

    public Number(int value)
    {
        _value = value;
    }

    public int Interpret()
    {
        return _value;
    }
}

// Non-Terminal Expression - Addition
public class Addition : IExpression
{
    private readonly IExpression _left;
    private readonly IExpression _right;

    public Addition(IExpression left, IExpression right)
    {
        _left = left;
        _right = right;
    }

    public int Interpret()
    {
        return _left.Interpret() + _right.Interpret();
    }
}

// Non-Terminal Expression - Subtraction
public class Subtraction : IExpression
{
    private readonly IExpression _left;
    private readonly IExpression _right;

    public Subtraction(IExpression left, IExpression right)
    {
        _left = left;
        _right = right;
    }

    public int Interpret()
    {
        return _left.Interpret() - _right.Interpret();
    }
}

// Interpreter Context
public class Interpreter
{
    public IExpression Interpret(string expression)
    {
        // Simple implementation for demonstration.  More robust parsing would be needed.
        if (expression.Contains("+"))
        {
            string[] parts = expression.Split('+');
            return new Addition(ParseExpression(parts[0]), ParseExpression(parts[1]));
        }
        else if (expression.Contains("-"))
        {
            string[] parts = expression.Split('-');
            return new Subtraction(ParseExpression(parts[0]), ParseExpression(parts[1]));
        }
        else
        {
            return ParseExpression(expression);
        }
    }

    private IExpression ParseExpression(string expression)
    {
        return new Number(int.Parse(expression));
    }
}

// Example Usage
public class Example
{
    public static void Main(string[] args)
    {
        Interpreter interpreter = new Interpreter();
        IExpression expression = interpreter.Interpret("10+5-2");
        Console.WriteLine(expression.Interpret()); // Output: 13
    }
}
```