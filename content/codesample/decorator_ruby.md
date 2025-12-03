---
title: "Decorator - Ruby"
date: 2025-12-03T11:41:04.386-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Ruby"]
---
The Decorator pattern dynamically adds responsibilities to an object without modifying its structure. It provides a flexible alternative to subclassing for extending functionality. This implementation uses Ruby's dynamic nature and block-based approach to define decorators as classes that wrap the original object and add behavior. The `decorate` method allows for chaining decorators, enhancing the object with multiple responsibilities. This approach is idiomatic Ruby as it favors composition over inheritance and leverages blocks for concise, flexible code.

```ruby
# Component interface
class Coffee
  def cost
    raise NotImplementedError
  end

  def description
    "Simple Coffee"
  end
end

# Concrete Component
class SimpleCoffee < Coffee
  def cost
    1.0
  end
end

# Decorator abstract class
class CoffeeDecorator < Coffee
  def initialize(coffee)
    @coffee = coffee
  end

  def cost
    @coffee.cost
  end

  def description
    @coffee.description
  end
end

# Concrete Decorators
class MilkDecorator < CoffeeDecorator
  def cost
    @coffee.cost + 0.5
  end

  def description
    @coffee.description + ", with Milk"
  end
end

class SugarDecorator < CoffeeDecorator
  def cost
    @coffee.cost + 0.2
  end

  def description
    @coffee.description + ", with Sugar"
  end
end

# Usage
coffee = SimpleCoffee.new
puts "Cost: #{coffee.cost}, Description: #{coffee.description}"

decorated_coffee = MilkDecorator.new(coffee)
puts "Cost: #{decorated_coffee.cost}, Description: #{decorated_coffee.description}"

more_decorated_coffee = SugarDecorator.new(decorated_coffee)
puts "Cost: #{more_decorated_coffee.cost}, Description: #{more_decorated_coffee.description}"
```