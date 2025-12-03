---
title: "State - Ruby"
date: 2025-12-03T13:30:51.233-05:00
draft: false
pattern_usage: ["State"]
language: ["Ruby"]
---
The State pattern is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It avoids using many conditional statements based on the object's state by encapsulating each state into separate classes. The context object delegates the work to a state object, which determines how to handle the request.

This Ruby implementation defines a `Context` (Traffic Light) and several `State` classes (Red, Yellow, Green). Each state class implements a `handle` method which defines the behavior for that state.  The `Context` holds an instance of the current `State` and delegates the action (stopping or going) to it. Using classes for each state promotes maintainability and avoids large, complex conditional blocks. This is very Ruby-like, leveraging the language's class-based structure for clear separation of concerns and polymorphism.

```ruby
# frozen_string_literal: true

# Define the State interface
module State
  def handle
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# Concrete State classes
class Red
  include State
  def handle
    puts "Traffic light is RED. STOP!"
  end
end

class Yellow
  include State
  def handle
    puts "Traffic light is YELLOW. Prepare to stop!"
  end
end

class Green
  include State
  def handle
    puts "Traffic light is GREEN. GO!"
  end
end

# The Context
class TrafficLight
  attr_accessor :current_state

  def initialize
    @current_state = Red.new # Initial state
  end

  def change_state(state)
    @current_state = state
  end

  def drive
    @current_state.handle
  end
end

# Usage
traffic_light = TrafficLight.new
traffic_light.drive # Output: Traffic light is RED. STOP!
traffic_light.change_state(Green.new)
traffic_light.drive # Output: Traffic light is GREEN. GO!
traffic_light.change_state(Yellow.new)
traffic_light.drive # Output: Traffic light is YELLOW. Prepare to stop!
```