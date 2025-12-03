---
title: "Interpreter - Java"
date: 2025-12-03T13:05:01.356-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Java"]
---
The Interpreter pattern is a behavioral pattern that allows you to define a grammatical representation for a language and provides an interpreter to process statements in that language. It’s useful for scenarios involving parsing and evaluating simple language expressions, like arithmetic expressions or rule-based systems.

This Java implementation defines an abstract `Expression` class and concrete classes for terminals (numbers) and non-terminals (addition and subtraction). The `Context` holds variables used during interpretation.  A `Calculator` class acts as the interpreter, evaluating an expression given a context. The code is object-oriented, defining a hierarchy for expression types—a natural fit for Java.  Using interfaces like `Expression` supports polymorphism and extensibility, enabling the easy addition of new operations or terminals.

```java
// Expression Interface
interface Expression {
    int interpret(Context context);
}

// Terminal Expression: Number
class Number implements Expression {
    private int value;

    public Number(int value) {
        this.value = value;
    }

    @Override
    public int interpret(Context context) {
        return value;
    }
}

// Non-Terminal Expression: Addition
class Addition implements Expression {
    private Expression left;
    private Expression right;

    public Addition(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Context context) {
        return left.interpret(context) + right.interpret(context);
    }
}

// Non-Terminal Expression: Subtraction
class Subtraction implements Expression {
    private Expression left;
    private Expression right;

    public Subtraction(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Context context) {
        return left.interpret(context) - right.interpret(context);
    }
}

// Context
class Context {
    // Can hold variables if needed for a more complex language
}

// Interpreter (Calculator)
class Calculator {
    public int calculate(String expression) {
        // Simple parsing for demonstration.  A full parser would be more robust.
        // Example expression: "5 + 3 - 2"
        String[] parts = expression.split(" ");
        Expression result = new Number(Integer.parseInt(parts[0]));

        for (int i = 1; i < parts.length; i += 2) {
            String operator = parts[i];
            int operand = Integer.parseInt(parts[i + 1]);

            switch (operator) {
                case "+":
                    result = new Addition(result, new Number(operand));
                    break;
                case "-":
                    result = new Subtraction(result, new Number(operand));
                    break;
                default:
                    throw new IllegalArgumentException("Invalid operator: " + operator);
            }
        }

        return result.interpret(new Context());
    }
}

// Example Usage
public class InterpreterExample {
    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        String expression = "5 + 3 - 2";
        int result = calculator.calculate(expression);
        System.out.println("Result: " + result); // Output: Result: 6
    }
}
```