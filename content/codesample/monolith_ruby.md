---
title: "Monolith - Ruby"
date: 2025-12-03T14:27:18.771-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Ruby"]
---
The Monolith pattern represents an architectural style where an application is built as a single, unified unit. All functionalities are tightly coupled and deployed together. This contrasts with microservices, which decompose an application into independently deployable services. This Ruby example showcases a basic monolith by encapsulating user management and product catalog operations within a single `Shop` class. While simple, it illustrates the core idea of a single codebase handling all aspects of the application. Ruby's flexible class structure allows for easy organization of related functionalities within the monolith, though it can lead to a large and complex codebase over time.

```ruby
# shop.rb
class Shop
  def initialize
    @users = []
    @products = {}
  end

  # User Management
  def add_user(user)
    @users << user
  end

  def get_user(username)
    @users.find { |u| u.username == username }
  end

  # Product Catalog
  def add_product(product)
    @products[product.id] = product
  end

  def get_product(id)
    @products[id]
  end

  def list_products
    @products.values
  end
end

class User
  attr_accessor :username
  def initialize(username)
    @username = username
  end
end

class Product
  attr_accessor :id, :name, :price
  def initialize(id, name, price)
    @id = id
    @name = name
    @price = price
  end
end

# Example Usage
shop = Shop.new
user1 = User.new("Alice")
user2 = User.new("Bob")
shop.add_user(user1)
shop.add_user(user2)

product1 = Product.new(1, "Shirt", 25)
product2 = Product.new(2, "Pants", 50)
shop.add_product(product1)
shop.add_product(product2)

puts "Usernames: #{@users.map(&:username)}"
puts "Products:"
shop.list_products.each do |product|
  puts "- #{product.name} ($#{product.price})"
end
```