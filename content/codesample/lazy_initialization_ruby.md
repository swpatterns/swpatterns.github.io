---
title: "Lazy Initialization - Ruby"
date: 2025-12-03T11:18:11.823-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Ruby"]
---
The Lazy Initialization pattern delays the creation of an object until it's actually needed, improving performance if the object is rarely used. This avoids unnecessary resource consumption during program startup. Our Ruby implementation uses a simple instance variable and a conditional assignment within a getter method.  The object is initialized only upon the first call to the getter. This aligns with Ruby’s dynamic nature and the principle of “lazy loading,” enhancing efficiency by deferring operations until absolutely necessary. The use of `||=` is concise and idiomatic Ruby for ensuring initialization only happens once.

```ruby
# lazy_initialization.rb

class ExpensiveObject
  def initialize
    puts "Initializing ExpensiveObject..."
    # Simulate a time-consuming operation
    sleep(2)
    @data = "Data from ExpensiveObject"
  end

  def data
    @data
  end
end

class LazyLoadedClass
  def expensive_object
    @expensive_object ||= ExpensiveObject.new
  end

  def use_object
    object = expensive_object
    puts "Using object: #{object.data}"
  end
end

# Example usage
lazy_object = LazyLoadedClass.new
puts "Before use..."
lazy_object.use_object # Initializes ExpensiveObject here
puts "After first use..."
lazy_object.use_object # Uses the existing object - doesn't re-initialize
```