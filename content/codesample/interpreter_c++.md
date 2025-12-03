---
title: "Interpreter - C++"
date: 2025-12-03T13:06:36.587-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["C++"]
---
The Interpreter pattern defines a way to represent a grammar for a language and provides an interpreter to deal with sentences in that language. It's useful when you need to evaluate a language's expressions, like simple arithmetic or logical statements. This example demonstrates interpreting simple arithmetic expressions ("1+2", "3-4") with only addition and subtraction. Each operation and number is represented by a separate class implementing a common `Expression` interface. The interpreter recursively evaluates the expression tree. This C++ implementation leans towards an object-oriented approach, which is standard for managing complex structures like grammars in the language.

```cpp
#include <iostream>
#include <string>
#include <memory>

// Forward declaration
class Expression;

// Visitor pattern: allows operations on Expression tree
class Interpreter {
public:
  virtual int interpret(std::shared_ptr<Expression> expression) = 0;
};

// Expression Interface
class Expression {
public:
  virtual int interpret(Interpreter* interpreter) = 0;
};

// Terminal Expression: Numbers
class Number : public Expression {
private:
  int value;
public:
  Number(int value) : value(value) {}
  int interpret(Interpreter* interpreter) override { return value; }
};

// Non-Terminal Expression: Addition
class Addition : public Expression {
private:
  std::shared_ptr<Expression> left;
  std::shared_ptr<Expression> right;
public:
  Addition(std::shared_ptr<Expression> left, std::shared_ptr<Expression> right)
      : left(left), right(right) {}
  int interpret(Interpreter* interpreter) override {
    return interpreter->interpret(left) + interpreter->interpret(right);
  }
};

// Non-Terminal Expression: Subtraction
class Subtraction : public Expression {
private:
  std::shared_ptr<Expression> left;
  std::shared_ptr<Expression> right;
public:
  Subtraction(std::shared_ptr<Expression> left, std::shared_ptr<Expression> right)
      : left(left), right(right) {}
  int interpret(Interpreter* interpreter) override {
    return interpreter->interpret(left) - interpreter->interpret(right);
  }
};

// Concrete Interpreter
class ArithmeticInterpreter : public Interpreter {
public:
  int interpret(std::shared_ptr<Expression> expression) override {
    return expression->interpret(this);
  }
};

int main() {
  // Example expression: 1 + 2 - 3
  std::shared_ptr<Expression> expression =
      std::make_shared<Subtraction>(
          std::make_shared<Addition>(
              std::make_shared<Number>(1),
              std::make_shared<Number>(2)),
          std::make_shared<Number>(3));

  ArithmeticInterpreter interpreter;
  int result = interpreter.interpret(expression);
  std::cout << "Result: " << result << std::endl; // Output: Result: 0

  return 0;
}
```