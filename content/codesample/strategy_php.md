---
title: "Strategy - PHP"
date: 2025-12-03T13:35:41.896-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["PHP"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it.  This implementation uses an interface `PaymentStrategy` to define a common method for making payments. Concrete strategies like `CreditCardPayment` and `PayPalPayment` implement this interface with specific payment logic. A `ShoppingCart` class accepts a `PaymentStrategy` via dependency injection and uses it to process the payment, without needing to know the specifics of *how* the payment is made. This fits PHP’s flexible type system and encourages loose coupling through interfaces.

```php
<?php

/**
 * Payment Strategy Interface
 */
interface PaymentStrategy
{
    public function pay(float $amount): bool;
}

/**
 * Concrete Strategy: Credit Card Payment
 */
class CreditCardPayment implements PaymentStrategy
{
    private string $cardNumber;
    private string $cvv;

    public function __construct(string $cardNumber, string $cvv)
    {
        $this->cardNumber = $cardNumber;
        $this->cvv = $cvv;
    }

    public function pay(float $amount): bool
    {
        // Simulate credit card processing
        echo "Paid $amount using Credit Card ($this->cardNumber)\n";
        return true;
    }
}

/**
 * Concrete Strategy: PayPal Payment
 */
class PayPalPayment implements PaymentStrategy
{
    private string $email;

    public function __construct(string $email)
    {
        $this->email = $email;
    }

    public function pay(float $amount): bool
    {
        // Simulate PayPal processing
        echo "Paid $amount using PayPal ($this->email)\n";
        return true;
    }
}

/**
 * Context: Shopping Cart
 */
class ShoppingCart
{
    private PaymentStrategy $paymentStrategy;

    public function __construct(PaymentStrategy $paymentStrategy)
    {
        $this->paymentStrategy = $paymentStrategy;
    }

    public function setPaymentStrategy(PaymentStrategy $paymentStrategy): void
    {
        $this->paymentStrategy = $paymentStrategy;
    }

    public function checkout(float $amount): bool
    {
        return $this->paymentStrategy->pay($amount);
    }
}

// Usage
$cart = new ShoppingCart(new CreditCardPayment("1234-5678-9012-3456", "123"));
$cart->checkout(100.00);

$cart->setPaymentStrategy(new PayPalPayment("user@example.com"));
$cart->checkout(50.00);

?>
```