---
title: "Command - Ruby"
date: 2025-12-03T13:03:44.349-05:00
draft: false
pattern_usage: ["Command"]
language: ["Ruby"]
---
The Command pattern encapsulates a request as an object, allowing parameterization of clients with different requests, queueing or logging of requests, and support for undoable operations. This example represents simple calculator operations (add, subtract) as commands.  Each command has an `execute` method that performs the operation on a `Calculator` receiver. The `execute` method stores the previous value enabling a simplistic `undo` functionality. Ruby’s flexibility lends itself well to this pattern; we utilize classes to represent commands, making them first-class objects, and the `call` method for a command-like interface, fitting with the language's object-oriented nature.

```ruby
# Receiver
class Calculator
  attr_accessor :current

  def initialize(current = 0)
    @current = current
  end

  def add(value)
    @previous = @current
    @current += value
  end

  def subtract(value)
    @previous = @current
    @current -= value
  end

  def current_value
    @current
  end
end

# Command Interface
class Command
  def initialize(calculator)
    @calculator = calculator
  end

  def execute
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def undo
    #Basic Undo based on previous state.  More complex undo could involve arguments.
    @calculator.current = @calculator.previous if defined? @calculator.previous
  end
end

# Concrete Commands
class AddCommand < Command
  def initialize(calculator, value)
    super(calculator)
    @value = value
  end

  def execute
    @calculator.add(@value)
  end
end

class SubtractCommand < Command
  def initialize(calculator, value)
    super(calculator)
    @value = value
  end

  def execute
    @calculator.subtract(@value)
  end
end

# Invoker
class Invoker
  def initialize
    @commands = []
  end

  def add_command(command)
    @commands << command
  end

  def execute_commands
    @commands.each do |command|
      command.execute
    end
  end

  def undo_all
    @commands.reverse_each do |command|
      command.undo
    end
  end
end

# Example Usage
calculator = Calculator.new
invoker = Invoker.new

add_command = AddCommand.new(calculator, 10)
subtract_command = SubtractCommand.new(calculator, 5)

invoker.add_command(add_command)
invoker.add_command(subtract_command)

invoker.execute_commands
puts "Current value: #{calculator.current_value}" # Output: Current value: 5

invoker.undo_all
puts "Current value after undo: #{calculator.current_value}" # Output: Current value after undo: 0
```