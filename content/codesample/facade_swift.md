---
title: "Facade - Swift"
date: 2025-12-03T11:44:35.986-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Swift"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components, making the system easier to use. This example demonstrates a Facade for ordering a pizza. The `PizzaOrderFacade` encapsulates the interactions with the `PizzaMaker`, `PaymentProcessor`, and `DeliveryService` subsystems.  The client only needs to interact with the Facade, hiding the complex order process. This implementation is idiomatic Swift by utilizing classes and methods for encapsulation and clear API definition, and leveraging optionals for potential failure states.

```swift
// Subsystem classes
class PizzaMaker {
    func makePizza(type: String) -> String {
        "Making a \(type) pizza..."
    }
}

class PaymentProcessor {
    func processPayment(amount: Double, cardDetails: String) -> Bool {
        print("Processing payment of $\(amount) with card details: \(cardDetails)")
        return true // Simulate successful payment
    }
}

class DeliveryService {
    func deliverPizza(address: String, pizzaDetails: String) -> Bool {
        print("Delivering \(pizzaDetails) to \(address)")
        return true // Simulate successful delivery
    }
}

// Facade class
class PizzaOrderFacade {
    private let pizzaMaker = PizzaMaker()
    private let paymentProcessor = PaymentProcessor()
    private let deliveryService = DeliveryService()

    func orderPizza(type: String, address: String, cardDetails: String) -> Bool {
        let pizzaDetails = pizzaMaker.makePizza(type: type)
        let paymentSuccessful = paymentProcessor.processPayment(amount: 15.0, cardDetails: cardDetails)
        
        if paymentSuccessful {
            let deliverySuccessful = deliveryService.deliverPizza(address: address, pizzaDetails: pizzaDetails)
            return deliverySuccessful
        } else {
            print("Payment failed. Pizza order cancelled.")
            return false
        }
    }
}

// Client code
let facade = PizzaOrderFacade()
let orderSuccessful = facade.orderPizza(type: "Pepperoni", address: "123 Main St", cardDetails: "4111-1234-5678-9012")

if orderSuccessful {
    print("Pizza order completed successfully!")
}
```