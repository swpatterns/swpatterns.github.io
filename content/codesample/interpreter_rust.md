---
title: "Interpreter - Rust"
date: 2025-12-03T13:07:49.568-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Rust"]
---
The Interpreter pattern defines a way to evaluate a language grammar given a representation of that grammar. It allows you to define rules for processing strings or expressions, and then interpret them. This implementation focuses on evaluating simple arithmetic expressions (addition and subtraction) containing integers. The grammar consists of `Expression`, `Number`, and `BinaryOperation`.  Each component implements the `Eval` trait to define the evaluation logic. This approach is naturally suited to Rust’s trait-based polymorphism and enum usage for representing different grammar elements. The code uses a recursive descent approach for evaluating the expression tree defined by the input string, a common technique in interpreters.

```rust
// https://gist.github.com/bardurh/dd7d667e4a56be3c0f4a

trait Eval {
    fn eval(&self) -> i32;
}

#[derive(Debug, PartialEq)]
enum Expression {
    Number(i32),
    BinaryOperation {
        left: Box<dyn Eval>,
        op: char,
        right: Box<dyn Eval>,
    },
}

impl Eval for Expression {
    fn eval(&self) -> i32 {
        match self {
            Expression::Number(n) => *n,
            Expression::BinaryOperation { left, op, right } => {
                left.eval()
                    .checked_op(*op, right.eval())
                    .unwrap_or_else(|| panic!("Arithmetic overflow"))
            }
        }
    }
}

fn parse(input: &str) -> Expression {
    let mut chars = input.chars().peekable();
    parse_expression(&mut chars)
}

fn parse_expression(chars: &mut std::iter::Peekable<std::str::Chars>) -> Expression {
    let left = parse_term(chars);

    loop {
        match chars.peek() {
            Some(&'+') => {
                chars.next();
                let right = parse_term(chars);
                left = Expression::BinaryOperation {
                    left: Box::new(left),
                    op: '+',
                    right: Box::new(right),
                };
            }
            Some(&'-') => {
                chars.next();
                let right = parse_term(chars);
                left = Expression::BinaryOperation {
                    left: Box::new(left),
                    op: '-',
                    right: Box::new(right),
                };
            }
            _ => return left,
        }
    }
}

fn parse_term(chars: &mut std::iter::Peekable<std::str::Chars>) -> Expression {
    let mut num_str = String::new();

    while let Some(&c) = chars.peek() {
        if c.is_digit(10) {
            num_str.push(c);
            chars.next();
        } else {
            break;
        }
    }

    if num_str.is_empty() {
        panic!("Expected a number");
    }

    match num_str.parse::<i32>() {
        Ok(n) => Expression::Number(n),
        Err(_) => panic!("Invalid number"),
    }
}


fn main() {
    let expression = "1+2-3+4";
    let parsed_expression = parse(expression);
    let result = parsed_expression.eval();
    println!("Expression: {}", expression);
    println!("Result: {}", result); // Output: 4

    let expression2 = "10-5+2";
    let parsed_expression2 = parse(expression2);
    let result2 = parsed_expression2.eval();
    println!("Expression: {}", expression2);
    println!("Result: {}", result2); // Output: 7
}
```