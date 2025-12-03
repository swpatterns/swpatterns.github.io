---
title: "Interpreter - Swift"
date: 2025-12-03T13:08:20.463-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Swift"]
---
The Interpreter pattern defines a way to evaluate a language, usually a simple one, by defining a class for each expression in the language. This allows for the building of more complex expressions by composing simpler ones. The code implements a basic arithmetic expression interpreter that can evaluate addition and subtraction expressions consisting of integers.  The `Expression` protocol defines the `evaluate` method, and concrete classes like `Number` and `Operation` implement it to handle specific parts of the expression. This approach fits Swift's protocol-oriented programming paradigm well, using protocols to define the common interface and classes to provide specific implementations. The use of an enum for operations also keeps the code concise and readable, aligning with Swift's safety and clarity features.

```swift
// Defines the interface for all expressions
protocol Expression {
    func evaluate() -> Int
}

// Represents a number in the expression
class Number: Expression {
    let value: Int

    init(value: Int) {
        self.value = value
    }

    func evaluate() -> Int {
        return value
    }
}

// Represents an operation (addition or subtraction)
class Operation: Expression {
    let left: Expression
    let right: Expression
    let operatorType: ArithmeticOperation

    enum ArithmeticOperation {
        case add
        case subtract
    }

    init(left: Expression, right: Expression, operatorType: ArithmeticOperation) {
        self.left = left
        self.right = right
        self.operatorType = operatorType
    }

    func evaluate() -> Int {
        switch operatorType {
        case .add:
            return left.evaluate() + right.evaluate()
        case .subtract:
            return left.evaluate() - right.evaluate()
        }
    }
}

// Example usage
let number1 = Number(value: 10)
let number2 = Number(value: 5)
let addition = Operation(left: number1, right: number2, operatorType: .add)
let subtraction = Operation(left: addition, right: Number(value: 2), operatorType: .subtract)

let result = subtraction.evaluate()
print("Result: \(result)") // Output: Result: 13
```