---
title: "Prototype - Ruby"
date: 2025-12-03T11:03:51.357-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Ruby"]
---
The Prototype pattern creates new objects by cloning an existing object, known as the prototype. This avoids the complexity of creating new objects from scratch, especially when object creation is expensive or requires complex initialization.  The code defines a `Product` class with a `clone` method to create replicas. A `ProductFactory` manages these prototypes, retrieving them by name and allowing clients to produce new objects based on these templates. This Ruby implementation leverages `Object#dup` for shallow copying, fitting the language's dynamic nature and emphasis on object manipulation.  It's a flexible alternative to `new` when object initialization is complex.

```ruby
# product.rb
class Product
  attr_accessor :name, :price

  def initialize(name, price)
    @name = name
    @price = price
  end

  def clone
    dup # Ruby's built-in duplication method
  end

  def to_s
    "Product: {Name: #{@name}, Price: #{@price}}"
  end
end

# product_factory.rb
class ProductFactory
  def initialize
    @prototypes = {}
  end

  def register_prototype(name, product)
    @prototypes[name] = product
  end

  def get_prototype(name)
    @prototypes[name].clone if @prototypes[name]
  end
end

# client.rb
factory = ProductFactory.new

product_a = Product.new("Laptop", 1200)
product_b = Product.new("Mouse", 25)

factory.register_prototype("laptop", product_a)
factory.register_prototype("mouse", product_b)

laptop_clone = factory.get_prototype("laptop")
mouse_clone = factory.get_prototype("mouse")

puts laptop_clone
puts mouse_clone
```