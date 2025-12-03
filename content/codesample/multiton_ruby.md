---
title: "Multiton - Ruby"
date: 2025-12-03T11:10:44.635-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Ruby"]
---
The Multiton pattern ensures that only a limited number of instances of a class can exist. Unlike a Singleton which restricts to just one instance, a Multiton allows a specified quantity. This example uses a class variable `@instances` to store the created instances and a class method `instance` to manage their creation, limiting the count to a predefined `MAX_INSTANCES`.  The implementation is idiomatic Ruby due to its use of class variables for shared state, and class methods for controlled instance access, leveraging Ruby's dynamic nature and meta-programming capabilities. It avoids explicit locking mechanisms, relying on Ruby's inherent thread safety for simple instance creation.

```ruby
# multiton.rb
class Multiton
  MAX_INSTANCES = 3
  @@instances = []

  private_class_method :new

  def self.instance(key)
    instance = @@instances.find { |i| i.key == key }
    unless instance
      if @@instances.length < MAX_INSTANCES
        instance = new(key)
        @@instances << instance
      else
        raise "Maximum number of instances reached (#{MAX_INSTANCES})"
      end
    end
    instance
  end

  def initialize(key)
    @key = key
  end

  attr_reader :key
end

# Example Usage
begin
  instance1 = Multiton.instance("A")
  instance2 = Multiton.instance("B")
  instance3 = Multiton.instance("C")

  puts "Instance 1 key: #{instance1.key}"
  puts "Instance 2 key: #{instance2.key}"
  puts "Instance 3 key: #{instance3.key}"

  instance4 = Multiton.instance("D") # Raises an exception
rescue => e
  puts "Error: #{e.message}"
end
```