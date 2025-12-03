---
title: "Onion Architecture - Ruby"
date: 2025-12-03T14:15:10.264-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Ruby"]
---
The Onion Architecture aims for loose coupling and high cohesion by organizing code into concentric layers. The innermost layer contains enterprise-wide business rules, completely independent of the outer layers.  Moving outwards, we have Domain Models, Infrastructure (databases, UI, etc.), and finally, interfaces (e.g., Rails controllers) that initiate the process. Dependencies point *inward*; the core doesn't depend on the periphery, ensuring that changes in UI or database don't affect core business logic. This example focuses on the core and a simplified interface layer to illustrate the dependency rule.

```ruby
# core/entities/product.rb
class Product
  attr_reader :id, :name, :price

  def initialize(id, name, price)
    @id = id
    @name = name
    @price = price
  end

  def to_s
    "Product: #{@name}, Price: #{@price}"
  end
end

# core/services/product_service.rb
class ProductService
  def initialize(product_repository)
    @product_repository = product_repository
  end

  def get_product(id)
    @product_repository.find(id)
  end

  def create_product(name, price)
    @product_repository.save(Product.new(UUID.generate, name, price))
  end
end

# core/ports/product_repository.rb
module ProductRepository
  def find(id)
    raise NotImplementedError
  end

  def save(product)
    raise NotImplementedError
  end
end

require 'uuid'

# infrastructure/memory_product_repository.rb
class MemoryProductRepository
  include ProductRepository

  def initialize
    @products = {}
  end

  def find(id)
    @products[id]
  end

  def save(product)
    @products[product.id] = product
  end
end

# interface/product_controller.rb
class ProductController
  def initialize(product_service)
    @product_service = product_service
  end

  def get_product(id)
    product = @product_service.get_product(id)
    if product
      product.to_s
    else
      "Product not found"
    end
  end

  def create_product(name, price)
    @product_service.create_product(name, price)
    "Product created"
  end
end

# Usage (outside the layers - composition root)
repository = MemoryProductRepository.new
service = ProductService.new(repository)
controller = ProductController.new(service)

puts controller.create_product("Laptop", 1200)
puts controller.get_product(repository.instance_variable_get(:@products).keys.first)
```