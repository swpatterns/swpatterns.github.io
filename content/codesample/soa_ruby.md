---
title: "SOA - Ruby"
date: 2025-12-03T14:49:48.330-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Ruby"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a specific business function and communicates with others through well-defined interfaces (often APIs). This promotes modularity, reusability, and independent deployment.

This Ruby example demonstrates a simplified SOA with two services: `UserService` and `ProductService`. They communicate via method calls, representing API interactions.  Each service has a clear responsibility.  The `Client` class orchestrates these services to fulfill a user request.  Using classes and methods for service definition and interaction is idiomatic Ruby, leveraging its object-oriented nature for encapsulation and modularity.  The focus is on defining interfaces (methods) rather than tightly coupling implementation details.

```ruby
# app/services/user_service.rb
class UserService
  def get_user_details(user_id)
    # Simulate fetching user details from a database
    { id: user_id, name: "Alice", email: "alice@example.com" }
  end
end

# app/services/product_service.rb
class ProductService
  def get_product_details(product_id)
    # Simulate fetching product details from a database
    { id: product_id, name: "Awesome Widget", price: 29.99 }
  end
end

# app/client.rb
class Client
  def initialize(user_service, product_service)
    @user_service = user_service
    @product_service = product_service
  end

  def get_user_and_product(user_id, product_id)
    user_details = @user_service.get_user_details(user_id)
    product_details = @product_service.get_product_details(product_id)

    { user: user_details, product: product_details }
  end
end

# main.rb
user_service = UserService.new
product_service = ProductService.new
client = Client.new(user_service, product_service)

result = client.get_user_and_product(123, 456)
puts result
```