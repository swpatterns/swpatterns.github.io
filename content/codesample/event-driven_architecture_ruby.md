---
title: "Event-Driven Architecture - Ruby"
date: 2025-12-03T14:54:45.515-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Ruby"]
---
The Event-Driven Architecture (EDA) decouples components by allowing them to communicate through events. Components (event producers) emit events without knowing who will handle them, and other components (event consumers) subscribe to events they're interested in. This promotes scalability and flexibility.

This Ruby implementation uses a simple event emitter and listener system. The `EventEmitter` class holds a list of subscribers (callbacks) for each event type.  `emit` triggers all subscribers for a given event.  The example demonstrates emitting and handling a "user.created" event.  Using blocks (procs) as event handlers is a very Ruby-esque approach, leveraging the language's first-class function capabilities for concise and flexible event handling.  The `EventEmitter` itself is a simple class, keeping the core logic focused and readable.

```ruby
class EventEmitter
  def initialize
    @subscribers = {}
  end

  def subscribe(event_name, &callback)
    @subscribers[event_name] ||= []
    @subscribers[event_name] << callback
  end

  def emit(event_name, data = {})
    @subscribers[event_name]&.each { |callback| callback.call(data) }
  end
end

# Example Usage
emitter = EventEmitter.new

emitter.subscribe("user.created") do |user_data|
  puts "User created: #{user_data[:username]}"
  puts "Sending welcome email..."
end

emitter.subscribe("user.created") do |user_data|
  puts "Updating user statistics..."
end

emitter.emit("user.created", { username: "john.doe", email: "john.doe@example.com" })

emitter.subscribe("order.placed") do |order_data|
  puts "Order placed: #{order_data[:order_id]}"
end

emitter.emit("order.placed", { order_id: "12345", total: 100.00 })
```