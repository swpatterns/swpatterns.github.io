---
title: "SOA - Java"
date: 2025-12-03T14:46:19.105-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Java"]
---
Service-Oriented Architecture (SOA) is a design pattern where application components are designed as services with well-defined interfaces and loose coupling. This allows for reusability, independent deployment, and easier integration with other systems. This Java example demonstrates a simplified SOA approach using interfaces and concrete implementations for a 'PaymentService'.  The `PaymentProcessor` acts as a client, interacting with the service through the interface, not the specific implementation. This promotes decoupling.  The use of interfaces is a core Java principle for abstraction and dependency injection, fitting the language's object-oriented nature.  A real-world SOA would involve more complex communication (e.g., message queues, web services) and service discovery.

```java
// Payment Service Interface
interface PaymentService {
    boolean processPayment(double amount, String creditCardNumber);
}

// Concrete implementation: Credit Card Payment Service
class CreditCardPaymentService implements PaymentService {
    @Override
    public boolean processPayment(double amount, String creditCardNumber) {
        // Simulate credit card processing logic
        System.out.println("Processing credit card payment of " + amount);
        return true; // Assume success for simplicity
    }
}

// Concrete implementation: PayPal Payment Service
class PayPalPaymentService implements PaymentService {
    @Override
    public boolean processPayment(double amount, String accountNumber) {
        // Simulate PayPal processing logic
        System.out.println("Processing PayPal payment of " + amount + " to account " + accountNumber);
        return true; // Assume success for simplicity
    }
}

// Payment Processor (Client)
class PaymentProcessor {
    private final PaymentService paymentService;

    public PaymentProcessor(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public boolean makePayment(double amount, String paymentInfo) {
        if (paymentInfo.startsWith("CC-")) {
            return paymentService.processPayment(amount, paymentInfo.substring(3));
        } else {
            // Assume PayPal if not a credit card
            PayPalPaymentService paypalService = new PayPalPaymentService();
            return paypalService.processPayment(amount, paymentInfo);
        }
    }
}

// Main Application
public class SOAExample {
    public static void main(String[] args) {
        // Choose a payment service
        PaymentService creditCardService = new CreditCardPaymentService();

        // Inject the service into the processor
        PaymentProcessor processor = new PaymentProcessor(creditCardService);

        // Make a payment
        boolean success = processor.makePayment(100.00, "CC-1234567890");
        System.out.println("Payment successful: " + success);

        success = processor.makePayment(50.00, "PayPal-user@example.com");
        System.out.println("Payment successful: " + success);
    }
}
```