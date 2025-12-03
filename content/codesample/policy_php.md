---
title: "Policy - PHP"
date: 2025-12-03T13:58:11.858-05:00
draft: false
pattern_usage: ["Policy"]
language: ["PHP"]
---
The Policy pattern encapsulates complex business logic or rules into separate classes, allowing for flexibility and maintainability. Instead of embedding these rules directly within an object, the object delegates the decision-making to a Policy object. This promotes the Single Responsibility Principle and makes it easier to modify or add new policies without altering the core object's code.

In this PHP example, a `DiscountPolicy` interface defines the contract for applying discounts. Concrete policies like `FixedAmountDiscountPolicy` and `PercentageDiscountPolicy` implement this interface. The `ShoppingCart` class doesn't *know* how discounts are calculated; it simply uses a `DiscountPolicy` to determine the final price. This adheres to PHP's interface-based programming and dependency injection principles, making the code testable and extensible.

```php
<?php

interface DiscountPolicy {
    public function calculateDiscount(float $total): float;
}

class FixedAmountDiscountPolicy implements DiscountPolicy {
    private float $discountAmount;

    public function __construct(float $discountAmount) {
        $this->discountAmount = $discountAmount;
    }

    public function calculateDiscount(float $total): float {
        return min($this->discountAmount, $total);
    }
}

class PercentageDiscountPolicy implements DiscountPolicy {
    private float $discountPercentage;

    public function __construct(float $discountPercentage) {
        $this->discountPercentage = $discountPercentage;
    }

    public function calculateDiscount(float $total): float {
        return $total * ($this->discountPercentage / 100);
    }
}

class ShoppingCart {
    private array $items;
    private DiscountPolicy $discountPolicy;

    public function __construct(DiscountPolicy $discountPolicy) {
        $this->items = [];
        $this->discountPolicy = $discountPolicy;
    }

    public function addItem(string $item, float $price): void {
        $this->items[] = ['item' => $item, 'price' => $price];
    }

    public function calculateTotal(): float {
        $total = array_sum(array_column($this->items, 'price'));
        $discount = $this->discountPolicy->calculateDiscount($total);
        return $total - $discount;
    }
}

// Example Usage
$fixedDiscount = new FixedAmountDiscountPolicy(10.0);
$cart1 = new ShoppingCart($fixedDiscount);
$cart1->addItem("Shirt", 25.0);
$cart1->addItem("Pants", 40.0);
echo "Cart 1 Total: " . $cart1->calculateTotal() . PHP_EOL; // Output: Cart 1 Total: 55

$percentageDiscount = new PercentageDiscountPolicy(20.0);
$cart2 = new ShoppingCart($percentageDiscount);
$cart2->addItem("Shoes", 80.0);
$cart2->addItem("Hat", 20.0);
echo "Cart 2 Total: " . $cart2->calculateTotal() . PHP_EOL; // Output: Cart 2 Total: 80
```