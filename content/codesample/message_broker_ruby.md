---
title: "Message Broker - Ruby"
date: 2025-12-03T15:09:45.541-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Ruby"]
---
The Message Broker pattern decouples application components by allowing them to communicate via messages, without direct dependencies. A central message broker receives messages from publishers and routes them to appropriate subscribers. This promotes scalability, flexibility, and fault tolerance. My Ruby implementation uses a simple hash-based "broker" to store subscribers and their associated topics.  Publishers send messages to the broker, which then iterates through subscribers, delivering messages to those interested in the published topic. This utilizes Ruby’s flexible hash structure and `each` method for efficient subscriber notification, fitting its functional style for message distribution.

```ruby
# message_broker.rb

class MessageBroker
  def initialize
    @subscribers = {} # topic => [subscriber_procs]
  end

  def subscribe(topic, &subscriber)
    (@subscribers[topic] ||= []) << subscriber
  end

  def publish(topic, message)
    @subscribers[topic]&.each { |subscriber| subscriber.call(message) }
  end
end

# Example Usage:

# Create a broker instance
broker = MessageBroker.new

# Define some subscribers
subscriber1 = ->(message) { puts "Subscriber 1 received: #{message}" }
subscriber2 = ->(message) { puts "Subscriber 2 received: #{message}" }

# Subscribe them to topics
broker.subscribe("news", &subscriber1)
broker.subscribe("news", &subscriber2)
broker.subscribe("weather", &subscriber1)

# Publish some messages
broker.publish("news", "Breaking news: Ruby is awesome!")
broker.publish("weather", "It's sunny today.")
broker.publish("sports", "No subscribers for this topic.")
```