---
title: "Observer - Ruby"
date: 2025-12-03T13:26:39.254-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Ruby"]
---
The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. A subject (observable) maintains a list of observers and notifies them of any state changes. This promotes loose coupling as subjects don't need to know concrete observer classes.

This Ruby implementation utilizes the `Observer` module from the standard library, providing a clean and concise way to establish the observation relationship.  Observers register themselves with the subject using `observe`. The subject then calls `notify_observers` with the changed data, which is passed to each observer's `update` method.  Ruby’s flexibility allows for simple and readable observer registration and notification.  The use of a hash to store observers is a common Ruby practice.

```ruby
module Subject
  def observe(observer)
    @observers ||= []
    @observers << observer
  end

  def notify_observers(data)
    @observers&.each { |observer| observer.update(data) }
  end
end

class Data
  include Subject

  attr_accessor :value

  def initialize(value)
    @value = value
  end

  def set_value(new_value)
    @value = new_value
    notify_observers(@value)
  end
end

class ConcreteObserver
  def update(data)
    puts "Observer received update: #{data}"
  end
end

# Example Usage
data = Data.new(10)
observer1 = ConcreteObserver.new
observer2 = ConcreteObserver.new

data.observe(observer1)
data.observe(observer2)

data.set_value(20)
data.set_value(30)
```