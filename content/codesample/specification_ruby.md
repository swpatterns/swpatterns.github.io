---
title: "Specification - Ruby"
date: 2025-12-03T13:53:23.156-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Ruby"]
---
The Specification pattern allows you to define a set of rules (specifications) that an object must satisfy to be considered valid or to perform a specific action. Instead of scattering validation logic throughout your code, you encapsulate it within these reusable specification objects. This promotes cleaner, more maintainable code, especially when dealing with complex validation scenarios.

The Ruby code defines a `Specification` base class and a concrete `EmailFormatSpecification`. The `EmailFormatSpecification` checks if a given string is a valid email address using a regular expression. The `specifies?` method in the specification determines if an object meets the criteria. The example demonstrates how to use this specification to validate an email address, showcasing the pattern's ability to encapsulate and reuse validation rules. This approach aligns with Ruby's emphasis on object-oriented design and the principle of single responsibility.

```ruby
# specification.rb

class Specification
  def initialize(object)
    @object = object
  end

  def specifies?
    raise NotImplementedError, "Subclasses must implement the specifies? method"
  end

  private

  attr_reader :object
end

class EmailFormatSpecification < Specification
  def specifies?
    !!(object =~ /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i)
  end
end

# Example Usage
email = "test@example.com"
spec = EmailFormatSpecification.new(email)

if spec.specifies?
  puts "#{email} is a valid email address."
else
  puts "#{email} is not a valid email address."
end

email = "invalid-email"
spec = EmailFormatSpecification.new(email)

if spec.specifies?
  puts "#{email} is a valid email address."
else
  puts "#{email} is not a valid email address."
end
```