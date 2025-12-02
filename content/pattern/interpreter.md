---
title: Interpreter
date: 2024-02-29T16:23:00-00:00
draft: false
pattern_types: ["behavioral", "GOF"]
wikipedia: "https://en.wikipedia.org/wiki/Interpreter_pattern"
diagramtype: "class"
diagram: "[Context] -- [AbstractExpression]
[Context] -- [TerminalExpression]
[Context] -- [NonTerminalExpression]
[AbstractExpression] <|-- [TerminalExpression]
[AbstractExpression] <|-- [NonTerminalExpression]
[NonTerminalExpression] ..> [AbstractExpression] : contains"
code: true
---

The Interpreter pattern defines a grammatical representation for a language along with an interpreter that uses this representation to interpret sentences in the language.  Essentially, it allows you to build an interpreter for a simple language without resorting to parsing. It promotes handling requests that are structured as language elements.

This pattern is particularly useful when you have a language with a simple grammar, and you need to execute statements within that language. Common scenarios include evaluating expressions (e.g., mathematical formulas, logical conditions), processing simple command languages (like a text-based game’s commands), or building rule engines. It shines when the grammar's complexity doesn’t warrant the use of full-fledged parsers and lexers.

## Usage

The Interpreter pattern is used in:

*   **SQL Parsers:** Although full SQL parsers exist, simplified versions can use the Interpreter pattern for basic clause evaluations.
*   **Expression Evaluation:** Evaluating complex mathematical or logical expressions without using `eval()`.
*   **Configuration Files:** Interpreting configuration files with a defined syntax.
*   **Rule Engines:** Applying a set of rules based on a defined language to a data set.
*   **Simple Scripting Languages:** Implementation of straightforward scripting used in specific domain contexts.

## Examples

1.  **Python’s `ast` module:** Python's Abstract Syntax Trees (AST) are a lightweight form of interpretation. While not strictly adhering to the traditional Interpreter pattern in a direct, implementation-focused way, it provides a way to represent code as a tree structure that can then be "interpreted" (executed or analyzed) by other code. The `ast` module parses Python source code into an AST, which you can then traverse and evaluate.

    python
    import ast

    expression = ast.parse("2 + 3 * 4")

    def evaluate(node):
        if isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.BinOp):
            left = evaluate(node.left)
            right = evaluate(node.right)
            if isinstance(node.op, ast.Add):
                return left + right
            elif isinstance(node.op, ast.Mult):
                return left * right
        else:
            raise ValueError("Unsupported node type")

    result = evaluate(expression.body[0].value)
    print(result) # Output: 14
    

2.  **JSONPath:** JSONPath is a query language for JSON.  It's implemented using an interpreter that traverses the JSON structure based on the path expression. Libraries like `jsonpath-ng` in Python use the Interpreter pattern to parse and evaluate JSONPath expressions.

    python
    from jsonpath_ng.ext import parse

    json_data = {
        "store": {
            "book": [
                {"category": "reference", "author": "Nigel Rees", "title": "Sayings of the Century", "price": 8.95},
                {"category": "fiction", "author": "Evelyn Waugh", "title": "Sword of Honour", "price": 12.99}
            ]
        }
    }

    jsonpath_expression = parse('$.store.book[?category=="fiction"]..title')
    matches = jsonpath_expression.find(json_data)

    for match in matches:
        print(match.value) # Output: Sword of Honour
    