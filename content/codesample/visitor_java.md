---
title: "Visitor - Java"
date: 2025-12-03T13:40:53.936-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Java"]
---
The Visitor pattern is a behavioral design pattern that lets you define a new operation without changing the classes of the objects on which it operates. It's achieved by "moving" the operational logic into separate visitor classes.  Each visitor class implements a visit method for each concrete element type in the object structure.

The code demonstrates a simple expression tree with `Expression` as the base class and concrete implementations like `Literal`, `Add`, and `Multiply`. The `Visitor` interface defines `visit` methods for each expression type. `ExpressionEvaluator` is a concrete visitor that evaluates the expression tree.  This approach is idiomatic Java because it leverages interfaces and polymorphism to achieve flexibility and maintainability.  It avoids modifying the core expression classes when adding new evaluation logic (or other operations).

```java
// Define the Element interface
interface Expression {
    void accept(Visitor visitor);
}

// Concrete Elements
class Literal implements Expression {
    private int value;

    public Literal(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

class Add implements Expression {
    private Expression left;
    private Expression right;

    public Add(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public Expression getLeft() {
        return left;
    }

    public Expression getRight() {
        return right;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

class Multiply implements Expression {
    private Expression left;
    private Expression right;

    public Multiply(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public Expression getLeft() {
        return left;
    }

    public Expression getRight() {
        return right;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// Define the Visitor interface
interface Visitor {
    int visit(Literal literal);
    int visit(Add add);
    int visit(Multiply multiply);
}

// Concrete Visitor
class ExpressionEvaluator implements Visitor {
    @Override
    public int visit(Literal literal) {
        return literal.getValue();
    }

    @Override
    public int visit(Add add) {
        return visit(add.getLeft()) + visit(add.getRight());
    }

    @Override
    public int visit(Multiply multiply) {
        return visit(multiply.getLeft()) * visit(multiply.getRight());
    }
}

// Example Usage
public class VisitorExample {
    public static void main(String[] args) {
        Expression expression = new Add(new Multiply(new Literal(2), new Literal(3)), new Literal(5));
        Visitor evaluator = new ExpressionEvaluator();
        expression.accept(evaluator);
        System.out.println("Result: " + evaluator.visit(expression)); // This line is redundant, but shows the pattern
    }
}
```