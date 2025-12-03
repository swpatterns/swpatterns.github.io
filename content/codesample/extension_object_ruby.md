---
title: "Extension Object - Ruby"
date: 2025-12-03T12:54:30.250-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Ruby"]
---
The Extension Object pattern allows you to add new functionality to existing classes without modifying their original source code, using techniques like monkey patching or reopening classes. This is particularly useful when dealing with third-party libraries or core Ruby classes where direct modification isn't feasible or desirable. The example extends the `String` class with a `to_camel_case` method.  Ruby's open class system makes this pattern very natural and idiomatic. Reopening a class is a common practice, and defining methods within the reopened class directly adds functionality as if it were originally part of the class.

```ruby
# frozen_string_literal: true

class String
  def to_camel_case
    return self if empty?

    words = self.split('_')
    camel_cased = words.shift.downcase
    words.each do |word|
      camel_cased += word.capitalize
    end
    camel_cased
  end
end

# Example Usage:
string1 = "some_property_name"
string2 = "another_example"
string3 = "alreadyCamelCase"

puts string1.to_camel_case  # Output: somePropertyName
puts string2.to_camel_case  # Output: anotherExample
puts string3.to_camel_case  # Output: alreadyCamelCase

```