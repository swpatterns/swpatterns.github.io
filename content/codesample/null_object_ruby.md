---
title: "Null Object - Ruby"
date: 2025-12-03T13:48:33.740-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Ruby"]
---
The Null Object pattern provides a substitute for an object that would otherwise be null or undefined. This avoids null checks throughout the code, simplifying logic and reducing the risk of `NoMethodError` exceptions.  The null object implements the expected interface but has a default or "do nothing" behavior.  In Ruby, this is naturally implemented using a class with methods that return sensible defaults (like an empty string or zero) instead of raising errors when called on a nil object. This example demonstrates a `NullCustomer` that responds to customer methods without requiring a real customer object to always exist.

```ruby
# frozen_string_literal: true

# Define the Customer interface
class Customer
  def name
    raise NotImplementedError
  end

  def address
    raise NotImplementedError
  end

  def reward_points
    raise NotImplementedError
  end
end

# Concrete Customer implementation
class RealCustomer < Customer
  attr_reader :name, :address, :reward_points

  def initialize(name, address, reward_points)
    @name = name
    @address = address
    @reward_points = reward_points
  end
end

# Null Customer implementation
class NullCustomer < Customer
  def name
    ""
  end

  def address
    ""
  end

  def reward_points
    0
  end
end

# Example Usage
def print_customer_details(customer)
  puts "Name: #{customer.name}"
  puts "Address: #{customer.address}"
  puts "Reward Points: #{customer.reward_points}"
end

# Using a real customer
real_customer = RealCustomer.new("Alice", "123 Main St", 100)
print_customer_details(real_customer)

# Using a null customer
null_customer = NullCustomer.new
print_customer_details(null_customer)

def get_customer(id)
  # Simulate database lookup
  if id == 1
    RealCustomer.new("Bob", "456 Oak Ave", 50)
  else
    NullCustomer.new
  end
end

customer = get_customer(2)
print_customer_details(customer) # No need to check if customer is nil
```