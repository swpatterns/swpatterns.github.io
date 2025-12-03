---
title: "Interpreter - Ruby"
date: 2025-12-03T13:08:38.815-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Ruby"]
---
The Interpreter pattern defines a way to evaluate a language, a simple one or a complex one. It’s useful when you have to embed logic into an application that can change during runtime. This example defines an interpreter for simple arithmetic expressions with integers, using addition and subtraction.  The expression is represented as a string which is then parsed into an Abstract Syntax Tree (AST) of `Expression` objects.  Each `Expression` object knows how to evaluate itself, using the recursive structure of the tree.  The implementation is Ruby-centric, heavily leveraging the open nature of Ruby classes to extend functionality and create the language’s grammar. The use of `class_eval` is an example of dynamic metaprogramming common in Ruby.

```ruby
# Define the Expression class
class Expression
  def evaluate(context = {})
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# Terminal Expression: Numbers
class Number < Expression
  def initialize(value)
    @value = value
  end

  def evaluate
    @value
  end
end

# Non-Terminal Expression: Addition
class Addition < Expression
  def initialize(left, right)
    @left = left
    @right = right
  end

  def evaluate
    @left.evaluate + @right.evaluate
  end
end

# Non-Terminal Expression: Subtraction
class Subtraction < Expression
  def initialize(left, right)
    @left = left
    @right = right
  end

  def evaluate
    @left.evaluate - @right.evaluate
  end
end
# Parser
class Parser
  def self.parse(expression_string)
    expression_string.gsub!(/\s+/,"") #Remove spaces
    if expression_string.include?("+")
      parts = expression_string.split("+")
      left = parse(parts[0])
      right = parse(parts[1])
      Addition.new(left, right)
    elsif expression_string.include?("-")
      parts = expression_string.split("-")
      left = parse(parts[0])
      right = parse(parts[1])
      Subtraction.new(left, right)
    else
      Number.new(expression_string.to_i)
    end
  end
end

# Example Usage
expression = Parser.parse("2 + 3 - 1")
result = expression.evaluate
puts "Result: #{result}" # Output: Result: 4

expression = Parser.parse("10 - 5 + 2")
result = expression.evaluate
puts "Result: #{result}" # Output: Result: 7
```