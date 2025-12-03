---
title: "Module - Ruby"
date: 2025-12-03T12:51:16.318-05:00
draft: false
pattern_usage: ["Module"]
language: ["Ruby"]
---
The Module pattern in Ruby provides a way to encapsulate related methods and constants, creating namespaces and avoiding naming conflicts. It's akin to static classes in other languages, but with more flexibility.  This implementation defines a `StringExtensions` module containing a method to check if a string is a valid email address.  The module is then mixed into the `String` class using `include`, effectively adding the `valid_email?` method to all string objects. This is a common Ruby idiom for extending built-in classes without modifying their core definition, promoting code organization and reusability.

```ruby
# frozen_string_literal: true

module StringExtensions
  refine do
    def valid_email?(regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i)
      match?(regex)
    end
  end
end

String.include StringExtensions

# Example Usage:
puts "test@example.com".valid_email? # Output: true
puts "invalid-email".valid_email?    # Output: false
puts "another.test@sub.example.co.uk".valid_email? # Output: true
```