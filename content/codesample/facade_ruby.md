---
title: "Facade - Ruby"
date: 2025-12-03T11:44:51.661-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Ruby"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components, making the system easier to use. This example demonstrates a facade for ordering a pizza. The `PizzaOrderFacade` encapsulates the interactions with the `PizzaMaker`, `PaymentProcessor`, and `DeliveryService` subsystems.  The client only needs to interact with the facade, hiding the complex order process. This implementation is idiomatic Ruby due to its use of clear method names, object-oriented structure, and the principle of "duck typing" allowing flexible interactions between the subsystems.

```ruby
# pizza_maker.rb
class PizzaMaker
  def make_pizza(type, size)
    puts "Making a #{size} #{type} pizza..."
    "#{size} #{type} pizza"
  end
end

# payment_processor.rb
class PaymentProcessor
  def process_payment(amount, card_details)
    puts "Processing payment of $#{amount} with card details..."
    true # Simulate successful payment
  end
end

# delivery_service.rb
class DeliveryService
  def deliver_pizza(address, pizza)
    puts "Delivering #{pizza} to #{address}..."
    true # Simulate successful delivery
  end
end

# pizza_order_facade.rb
class PizzaOrderFacade
  def initialize(pizza_maker, payment_processor, delivery_service)
    @pizza_maker = pizza_maker
    @payment_processor = payment_processor
    @delivery_service = delivery_service
  end

  def order_pizza(type, size, address, card_details)
    pizza = @pizza_maker.make_pizza(type, size)
    if @payment_processor.process_payment(15.00, card_details)
      @delivery_service.deliver_pizza(address, pizza)
      puts "Pizza ordered successfully!"
    else
      puts "Payment failed. Pizza order cancelled."
    end
  end
end

# client.rb
pizza_maker = PizzaMaker.new
payment_processor = PaymentProcessor.new
delivery_service = DeliveryService.new
pizza_order = PizzaOrderFacade.new(pizza_maker, payment_processor, delivery_service)

pizza_order.order_pizza("Pepperoni", "Large", "123 Main St", "1234-5678-9012-3456")
```