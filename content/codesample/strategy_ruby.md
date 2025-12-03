---
title: "Strategy - Ruby"
date: 2025-12-03T13:35:22.251-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Ruby"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it.  Here, we define different shipping cost calculation strategies (e.g., for ground, air). The `ShippingContext` class accepts a strategy object and delegates the cost calculation to it. This avoids hardcoding shipping logic within the `ShippingContext` and makes it easy to add new shipping methods without modification. It utilizes Ruby's duck typing and block passing to achieve a flexible strategy implementation that aligns with the language’s dynamic nature.

```ruby
# Strategy interface (can be implicit in Ruby due to duck typing)
module ShippingStrategy
  def calculate_cost(package)
    raise NotImplementedError, "Subclasses must implement calculate_cost"
  end
end

# Concrete strategies
class GroundShipping
  include ShippingStrategy
  def calculate_cost(package)
    package.weight * 0.5
  end
end

class AirShipping
  include ShippingStrategy
  def calculate_cost(package)
    package.weight * 1.5 + 10 # Add a base fee for air shipping
  end
end

class FreeShipping
  include ShippingStrategy
  def calculate_cost(package)
    0
  end
end

# Context
class ShippingContext
  attr_reader :shipping_strategy

  def initialize(shipping_strategy)
    @shipping_strategy = shipping_strategy
  end

  def set_strategy(strategy)
    @shipping_strategy = strategy
  end

  def calculate_shipping_cost(package)
    shipping_strategy.calculate_cost(package)
  end
end

# Simple Package class for demonstration
class Package
  attr_reader :weight

  def initialize(weight)
    @weight = weight
  end
end

# Example usage
package = Package.new(10)

ground_shipping = GroundShipping.new
shipping = ShippingContext.new(ground_shipping)
puts "Ground Shipping Cost: #{shipping.calculate_shipping_cost(package)}"

air_shipping = AirShipping.new
shipping.set_strategy(air_shipping)
puts "Air Shipping Cost: #{shipping.calculate_shipping_cost(package)}"

free_shipping = FreeShipping.new
shipping.set_strategy(free_shipping)
puts "Free Shipping Cost: #{shipping.calculate_shipping_cost(package)}"
```