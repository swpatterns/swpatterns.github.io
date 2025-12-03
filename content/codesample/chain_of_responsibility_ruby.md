---
title: "Chain of Responsibility - Ruby"
date: 2025-12-03T12:58:59.348-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Ruby"]
---
The Chain of Responsibility pattern is a behavioral design pattern that allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, allowing multiple objects a chance to handle the request.

The Ruby implementation uses a linked list-like structure where each handler has a `next_handler` attribute. The `handle_request` method checks if the handler can process the request; if not, it delegates to the `next_handler`.  This leverages Ruby's flexible message passing and avoids tight coupling. The use of a base `Handler` class and a clear `handle_request` interface promotes extensibility and readability, fitting Ruby's object-oriented nature.

```ruby
# frozen_string_literal: true

# Handler base class
class Handler
  def initialize(next_handler = nil)
    @next_handler = next_handler
  end

  def handle_request(request)
    if can_handle?(request)
      handle(request)
    elsif @next_handler
      @next_handler.handle_request(request)
    else
      "Request cannot be handled."
    end
  end

  private

  def can_handle?(request)
    raise NotImplementedError, "Subclasses must implement can_handle?"
  end

  def handle(request)
    raise NotImplementedError, "Subclasses must implement handle"
  end
end

# Concrete handlers
class ConcreteHandlerA < Handler
  def can_handle?(request)
    request.type == 'A'
  end

  def handle(request)
    "Handler A processed request #{request.type}"
  end
end

class ConcreteHandlerB < Handler
  def can_handle?(request)
    request.type == 'B'
  end

  def handle(request)
    "Handler B processed request #{request.type}"
  end
end

# Request class
class Request
  attr_reader :type

  def initialize(type)
    @type = type
  end
end

# Client code
class Client
  def initialize(handler)
    @handler = handler
  end

  def send_request(request)
    @handler.handle_request(request)
  end
end

# Usage Example
handler_b = ConcreteHandlerB.new
handler_a = ConcreteHandlerA.new(handler_b)

client = Client.new(handler_a)

puts client.send_request(Request.new('A'))
puts client.send_request(Request.new('B'))
puts client.send_request(Request.new('C'))
```