---
title: "Visitor - Rust"
date: 2025-12-03T13:43:27.492-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Rust"]
---
The Visitor pattern allows you to define a new operation without modifying the classes on which it operates. It's achieved by moving the operation's logic into a separate "visitor" object, which then traverses the object structure and applies the operation to each element. This is particularly useful when you have a complex object structure and want to add functionality that depends on the specific types within that structure without cluttering those types with conditional logic.

This Rust example defines an `Expr` enum representing arithmetic expressions (numbers and operations). The `Visitor` trait defines a method for each `Expr` variant. Concrete visitors, like `EvalVisitor`, implement the trait to perform specific actions (like evaluating the expression). The `accept` method on `Expr` dispatches to the appropriate visitor method based on the expression's type. This implementation leverages Rust's traits and enums for a type-safe and extensible solution, fitting the language's focus on correctness and composability.

```rust
// Define the Element interface
trait ExprVisitor {
    fn visit_number(&mut self, number: i32);
    fn visit_add(&mut self, left: &Expr, right: &Expr);
    fn visit_multiply(&mut self, left: &Expr, right: &Expr);
}

// Define the Element hierarchy
enum Expr {
    Number(i32),
    Add(Box<Expr>, Box<Expr>),
    Multiply(Box<Expr>, Box<Expr>),
}

// Implement the Accept method
impl Expr {
    fn accept(&self, visitor: &mut dyn ExprVisitor) {
        match self {
            Expr::Number(number) => visitor.visit_number(*number),
            Expr::Add(left, right) => {
                visitor.visit_add(left, right);
            }
            Expr::Multiply(left, right) => {
                visitor.visit_multiply(left, right);
            }
        }
    }
}

// Concrete Visitor: Evaluates the expression
struct EvalVisitor {
    result: i32,
}

impl EvalVisitor {
    fn new() -> Self {
        EvalVisitor { result: 0 }
    }
}

impl ExprVisitor {
    fn visit_number(&mut self, number: i32) {
        self.result = number;
    }

    fn visit_add(&mut self, left: &Expr, right: &Expr) {
        let mut left_visitor = EvalVisitor::new();
        left.accept(&mut left_visitor);
        let mut right_visitor = EvalVisitor::new();
        right.accept(&mut right_visitor);
        self.result = left_visitor.result + right_visitor.result;
    }

    fn visit_multiply(&mut self, left: &Expr, right: &Expr) {
        let mut left_visitor = EvalVisitor::new();
        left.accept(&mut left_visitor);
        let mut right_visitor = EvalVisitor::new();
        right.accept(&mut right_visitor);
        self.result = left_visitor.result * right_visitor.result;
    }
}

fn main() {
    let expression = Expr::Add(
        Box::new(Expr::Number(5)),
        Box::new(Expr::Multiply(Box::new(Expr::Number(2)), Box::new(Expr::Number(3)))),
    );

    let mut evaluator = EvalVisitor::new();
    expression.accept(&mut evaluator);

    println!("Result: {}", evaluator.result); // Output: Result: 11
}
```