---
title: "Publish-Subscribe - Ruby"
date: 2025-12-03T15:30:04.977-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Ruby"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) from message receivers (subscribers). Publishers don’t know *who* is receiving messages, and subscribers don’t need to know *where* messages come from.  A central message broker (in this case, a simple Ruby hash) manages subscriptions.

This Ruby implementation uses a hash to store subscribers for each topic. Publishers call `publish` with a topic and message, iterating through subscribers to notify them.  Subscribers register with `subscribe` providing a topic and a callback.  The use of blocks for callbacks is idiomatic Ruby, enabling concise and flexible event handling.  The `topics` hash acts as the central registry, and the structure promotes code readability and ease of maintenance.

```ruby
class Event
  attr_reader :topic, :data

  def initialize(topic, data)
    @topic = topic
    @data = data
  end
end

class PubSub
  def initialize
    @topics = {}
  end

  def subscribe(topic, &callback)
    @topics[topic] ||= []
    @topics[topic] << callback
  end

  def publish(topic, data)
    @topics[topic].each do |callback|
      callback.call(Event.new(topic, data))
    end
  end
end

# Example Usage:

pub_sub = PubSub.new

pub_sub.subscribe("user.created") do |event|
  puts "User created! Topic: #{event.topic}, Data: #{event.data}"
end

pub_sub.subscribe("user.created") do |event|
  puts "Sending welcome email to: #{event.data[:email]}"
end

pub_sub.subscribe("order.placed") do |event|
  puts "New Order! Order ID: #{event.data[:order_id]}"
end

pub_sub.publish("user.created", { username: "john_doe", email: "john.doe@example.com" })
pub_sub.publish("order.placed", { order_id: "12345", total: 100.00 })
```