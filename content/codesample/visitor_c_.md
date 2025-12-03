---
title: "Visitor - C#"
date: 2025-12-03T13:42:10.935-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["C#"]
---
The Visitor pattern lets you define a new operation without changing the classes of the objects on which it operates. It's achieved by moving the operation to a separate "visitor" class that accepts different object types as input. This is useful when you have a complex object structure and want to add operations that depend on the object's type without cluttering the original classes with conditional logic.

This C# example defines a basic expression tree (Add, Subtract, Number) and a `Visitor` interface with `Visit` methods for each expression type.  Concrete visitors (e.g., `PrintVisitor`, `EvaluateVisitor`) implement the interface to perform specific operations. The `Accept` method in each expression type calls the appropriate `Visit` method on the visitor, enabling the operation. This approach leverages C#'s interfaces and polymorphism for a clean and extensible solution, fitting the language's OOP style.

```csharp
// Visitor Interface
public interface IVisitor
{
    void Visit(Add expression);
    void Visit(Subtract expression);
    void Visit(Number expression);
}

// Expression Base Class
public abstract class Expression
{
    public abstract void Accept(IVisitor visitor);
}

// Concrete Expression: Add
public class Add : Expression
{
    public Expression Left { get; }
    public Expression Right { get; }

    public Add(Expression left, Expression right)
    {
        Left = left;
        Right = right;
    }

    public override void Accept(IVisitor visitor)
    {
        visitor.Visit(this);
    }
}

// Concrete Expression: Subtract
public class Subtract : Expression
{
    public Expression Left { get; }
    public Expression Right { get; }

    public Subtract(Expression left, Expression right)
    {
        Left = left;
        Right = right;
    }

    public override void Accept(IVisitor visitor)
    {
        visitor.Visit(this);
    }
}

// Concrete Expression: Number
public class Number : Expression
{
    public int Value { get; }

    public Number(int value)
    {
        Value = value;
    }

    public override void Accept(IVisitor visitor)
    {
        visitor.Visit(this);
    }
}

// Concrete Visitor: Print
public class PrintVisitor : IVisitor
{
    public void Visit(Add expression)
    {
        Console.WriteLine("Add");
    }

    public void Visit(Subtract expression)
    {
        Console.WriteLine("Subtract");
    }

    public void Visit(Number expression)
    {
        Console.WriteLine("Number: " + expression.Value);
    }
}

// Concrete Visitor: Evaluate
public class EvaluateVisitor : IVisitor
{
    public void Visit(Add expression)
    {
        Context.Result = expression.Left.Evaluate() + expression.Right.Evaluate();
    }

    public void Visit(Subtract expression)
    {
        Context.Result = expression.Left.Evaluate() - expression.Right.Evaluate();
    }

    public void Visit(Number expression)
    {
        Context.Result = expression.Value;
    }
}

public static class Context
{
    public static int Result { get; set; }
}

// Example Usage
public class Example
{
    public static void Main(string[] args)
    {
        Expression expression = new Add(new Number(5), new Subtract(new Number(10), new Number(2)));

        PrintVisitor printVisitor = new PrintVisitor();
        expression.Accept(printVisitor); // Output: Add, Subtract, Number

        EvaluateVisitor evaluateVisitor = new EvaluateVisitor();
        expression.Accept(evaluateVisitor);
        Console.WriteLine("Result: " + Context.Result); // Output: Result: 3
    }
}
```