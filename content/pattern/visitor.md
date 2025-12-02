
---
title: Visitor
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "GOF"]
wikipedia: "https://en.wikipedia.org/wiki/Visitor_pattern"
diagramtype: "class"
diagram: "[Visitor] --|> [AbstractVisitor]\n[Element] ..> [Visitor] : accept(Visitor)\n[ConcreteElementA] --|> [Element]\n[ConcreteElementB] --|> [Element]\n[ConcreteVisitorA] --|> [AbstractVisitor]\n[ConcreteVisitorB] --|> [AbstractVisitor]\n[ConcreteElementA] ..> [ConcreteVisitorA] : accept()\n[ConcreteElementB] ..> [ConcreteVisitorB] : accept()"
code: true
---

The Visitor pattern allows you to add new operations to a hierarchy of objects without modifying the objects themselves. This is achieved by encapsulating the operations in separate "visitor" classes, which can then traverse the object hierarchy and apply their specific logic to each element.  It promotes the Open/Closed Principle by allowing extension without modification of the core data structures.

## Usage

The Visitor pattern is frequently used when:
* You need to perform many different, unrelated operations on a complex object structure. 
* The object structure is relatively stable, but the operations you need to perform are likely to change.
* You want to avoid "bloating" the element classes with numerous operation methods.
* You need to group related operations together.

## Examples

1. **Compilers:** In a compiler, a visitor can be used to perform different passes over the abstract syntax tree (AST).  For example, one visitor might check for type errors, another might generate intermediate code, and a third might optimize the code.  The AST nodes themselves (e.g., `Expression`, `Statement`, `Identifier`) remain unchanged when new analysis or code generation phases are added.

2. **XML Processing:** Libraries that process XML or similar document structures often use the Visitor pattern. A visitor can represent an action to be performed on each node type in the document (e.g., printing the node's value, validating its attributes, transforming it to a different format).  The XML node classes (e.g., `Element`, `Attribute`, `Text`) aren't modified when a new processing rule is introduced.  The visitor's `visit()` methods handle the specifics of each node type.
