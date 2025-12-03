---
title: "Mediator - Ruby"
date: 2025-12-03T13:17:14.798-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Ruby"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by preventing objects from referring to each other explicitly, and lets the interactions be varied independently of the objects.  Here, we mediate communication between `Colleague` objects representing different parts of a chatroom (e.g., User, System). The `Chatroom` class acts as the Mediator, handling message delivery. This implementation leverages Ruby's duck typing and flexible messaging. The Mediator pattern is well-suited to Ruby's emphasis on behavioral patterns which often benefit from this kind of reduced coupling.

```ruby
# Define the Colleague interface
module Colleague
  def receive_message(message)
    raise NotImplementedError
  end
end

# Concrete Colleague: User
class User
  include Colleague
  attr_reader :name

  def initialize(name, mediator)
    @name = name
    @mediator = mediator
  end

  def send_message(message)
    @mediator.send_message(@name, message)
  end

  def receive_message(message)
    puts "#{@name} received: #{message}"
  end
end

# Concrete Colleague: System
class System
  include Colleague
  def initialize(mediator)
    @mediator = mediator
  end

  def send_system_message(message)
    @mediator.send_message("System", message)
  end

  def receive_message(message)
    puts "System received: #{message}"
  end
end

# The Mediator interface
module Mediator
  def send_message(sender, message)
    raise NotImplementedError
  end
end

# Concrete Mediator: Chatroom
class Chatroom
  def initialize
    @users = []
    @system = System.new(self)
  end

  def register_user(user)
    @users << user
  end

  def send_message(sender, message)
    @users.each do |user|
      if user.name != sender
        user.receive_message("#{sender}: #{message}")
      end
    end
    @system.receive_message("#{sender}: #{message}") # System also receives all messages
  end
end

# Usage
chatroom = Chatroom.new
alice = User.new("Alice", chatroom)
bob = User.new("Bob", chatroom)
chatroom.register_user(alice)
chatroom.register_user(bob)

alice.send_message("Hello, Bob!")
bob.send_message("Hi, Alice! How are you?")
chatroom.send_message("System", "Welcome to the chatroom!")
```