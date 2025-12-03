---
title: "Memento - Ruby"
date: 2025-12-03T13:22:05.851-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Ruby"]
---
The Memento pattern captures and externalizes an object’s internal state so that the object can be restored to this state later, even if the object itself is modified or destroyed. This allows for "undo" operations or saving/restoring progress without violating encapsulation. My Ruby implementation uses a `Memento` class to hold the state, an `Originator` class whose state is saved and restored, and a `Caretaker` class to manage Mementos without accessing the originator's state directly. It leverages Ruby's open classes and simple object construction for conciseness, fitting the language’s dynamic and expressive nature.

```ruby
# frozen_string_literal: true

# Memento: Holds the state of the Originator.
class Memento
  attr_reader :state

  def initialize(state)
    @state = state
  end
end

# Originator: Contains the state to be saved and restored.
class Originator
  attr_accessor :state

  def initialize(initial_state)
    @state = initial_state
  end

  def create_memento
    Memento.new(@state)
  end

  def restore_memento(memento)
    @state = memento.state
  end
end

# Caretaker: Manages Mementos without accessing the Originator’s state.
class Caretaker
  attr_accessor :memento

  def initialize
    @memento = nil
  end

  def save_memento(originator)
    @memento = originator.create_memento
  end

  def restore_memento(originator)
    originator.restore_memento(@memento) if @memento
  end
end

# Example usage:
if __FILE__ == $0
  originator = Originator.new("Initial State")
  caretaker = Caretaker.new
  
  puts "Initial State: #{originator.state}"
  
  caretaker.save_memento(originator)
  
  originator.state = "New State"
  puts "New State: #{originator.state}"
  
  caretaker.restore_memento(originator)
  puts "Restored State: #{originator.state}"
end
```