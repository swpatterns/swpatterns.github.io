---
title: "Interpreter - PHP"
date: 2025-12-03T13:09:00.019-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["PHP"]
---
The Interpreter pattern defines a way to represent a grammar for a language and provides an interpreter to deal with the sentences in that language.  It’s useful when you have a simple language with complex expressions and you want to evaluate those expressions dynamically. This implementation defines a basic calculator language supporting addition and subtraction.  Nodes in the grammar (expressions) are represented as classes implementing an `interpret()` method. The `Context` class holds variables used during interpretation.  The code is designed using simple classes to represent the differing expression types, aligned with PHP’s class-based approach to structure.

```php
<?php

// Context: Stores variables for the interpreter.
class Context {
    private $variables = [];

    public function setVariable(string $name, int $value) {
        $this->variables[$name] = $value;
    }

    public function getVariable(string $name): int {
        return $this->variables[$name] ?? 0; // Return 0 if variable is not set
    }
}

// Expression: Base abstract class for all expressions.
abstract class Expression {
    abstract public function interpret(Context $context): int;
}

// Number: Represents a number in the expression.
class Number extends Expression {
    private $value;

    public function __construct(int $value) {
        $this->value = $value;
    }

    public function interpret(Context $context): int {
        return $this->value;
    }
}

// Addition: Represents an addition operation.
class Addition extends Expression {
    private $left;
    private $right;

    public function __construct(Expression $left, Expression $right) {
        $this->left = $left;
        $this->right = $right;
    }

    public function interpret(Context $context): int {
        return $this->left->interpret($context) + $this->right->interpret($context);
    }
}

// Subtraction: Represents a subtraction operation.
class Subtraction extends Expression {
    private $left;
    private $right;

    public function __construct(Expression $left, Expression $right) {
        $this->left = $left;
        $this->right = $right;
    }

    public function interpret(Context $context): int {
        return $this->left->interpret($context) - $this->right->interpret($context);
    }
}

// Example Usage
$context = new Context();
$context->setVariable('x', 10);
$context->setVariable('y', 5);

$expression = new Addition(new Number(5), new Subtraction(new Number(10), new Number(2)));
$result = $expression->interpret($context);

echo "Result: " . $result . PHP_EOL; // Output: Result: 13

$expression2 = new Subtraction(new Number($context->getVariable('x')), new Number($context->getVariable('y')));
$result2 = $expression2->interpret($context);

echo "Result 2: " . $result2 . PHP_EOL; // Output: Result 2: 5
?>
```