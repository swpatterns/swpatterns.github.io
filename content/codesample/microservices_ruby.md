---
title: "Microservices - Ruby"
date: 2025-12-03T14:44:59.787-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Ruby"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often an HTTP resource API. This example demonstrates a simplified order and payment service interaction.  We use Ruby's class-based structure to define each service.  The services communicate via HTTP requests using the `net/http` library, a standard Ruby approach for making web requests.  This avoids tight coupling and allows for independent scaling and development.  The use of simple classes and methods keeps the code concise and readable, aligning with Ruby's emphasis on developer happiness.

```ruby
require 'net/http'
require 'json'

# Order Service
class OrderService
  def self.place_order(item, quantity)
    order_data = { item: item, quantity: quantity, status: 'pending' }
    # In a real app, this would persist to a database
    order_id = rand(1000)
    puts "Order placed: #{order_id} for #{quantity} #{item}"
    order_id
  end
end

# Payment Service
class PaymentService
  def self.process_payment(order_id, amount)
    # Simulate payment processing
    payment_successful = rand(1..2) == 1

    if payment_successful
      puts "Payment processed successfully for order #{order_id}, amount #{amount}"
      return true
    else
      puts "Payment failed for order #{order_id}"
      return false
    end
  end
end

# Orchestrator (Simple example - could be a separate service)
def fulfill_order(item, quantity)
  order_id = OrderService.place_order(item, quantity)
  amount = quantity * 10 # Example price

  if PaymentService.process_payment(order_id, amount)
    puts "Order #{order_id} fulfilled successfully!"
  else
    puts "Order #{order_id} fulfillment failed due to payment issues."
  end
end

# Example Usage
fulfill_order("Widget", 2)
fulfill_order("Gadget", 5)
```