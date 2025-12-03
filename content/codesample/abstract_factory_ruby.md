---
title: "Abstract Factory - Ruby"
date: 2025-12-03T10:50:58.728-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Ruby"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's useful when you need to create different "flavors" of objects that work together, and you want to decouple the client code from the specific implementations.

This Ruby implementation defines an `AbstractFactory` with a method for each product type. Concrete factories (`ConcreteFactory1`, `ConcreteFactory2`) implement this interface to produce specific product families (`ProductA1`, `ProductB1` vs. `ProductA2`, `ProductB2`). The client code interacts with the factory interface, not the concrete factories, promoting loose coupling and allowing for easy addition of new product families.  Ruby's duck typing and flexible method definitions make this pattern a natural fit.

```ruby
# Abstract Factory
class AbstractFactory
  def create_product_a
    raise NotImplementedError
  end

  def create_product_b
    raise NotImplementedError
  end
end

# Concrete Factory 1
class ConcreteFactory1 < AbstractFactory
  def create_product_a
    ProductA1.new
  end

  def create_product_b
    ProductB1.new
  end
end

# Concrete Factory 2
class ConcreteFactory2 < AbstractFactory
  def create_product_a
    ProductA2.new
  end

  def create_product_b
    ProductB2.new
  end
end

# Products
class ProductA1
  def operation_a
    "Product A1 operation"
  end
end

class ProductA2
  def operation_a
    "Product A2 operation"
  end
end

class ProductB1
  def operation_b
    "Product B1 operation"
  end
end

class ProductB2
  def operation_b
    "Product B2 operation"
  end
end

# Client Code
factory1 = ConcreteFactory1.new
product_a1 = factory1.create_product_a
product_b1 = factory1.create_product_b

puts product_a1.operation_a
puts product_b1.operation_b

factory2 = ConcreteFactory2.new
product_a2 = factory2.create_product_a
product_b2 = factory2.create_product_b

puts product_a2.operation_a
puts product_b2.operation_b
```