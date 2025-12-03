---
title: "Monolith - Python"
date: 2025-12-03T14:24:33.685-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Python"]
---
The Monolith pattern structures an application as a single, self-contained unit. All functionalities, including UI, business logic, and data access, are tightly coupled and deployed as one. This simplicity aids initial development and debugging but can gradually lead to complexity, making scaling and independent deployments challenging.

The provided Python example simulates a monolithic e-commerce application. All components – `Product`, `ShoppingCart`, `OrderProcessing`, and a basic `main` function driving interactions – are defined within the same script.  This reflects the core idea of a single codebase handling all concerns.  While a real-world monolith would likely be split across modules within a larger project, this concise example demonstrates the architectural principle. Python's flexible nature allows for easy formulation of such a structure, emphasizing the all-in-one design.

```python
class Product:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price

    def __repr__(self):
        return f"Product(id={self.id}, name='{self.name}', price={self.price})"


class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, product, quantity):
        self.items.append({"product": product, "quantity": quantity})

    def total_price(self):
        return sum(item["product"].price * item["quantity"] for item in self.items)

    def __repr__(self):
        return f"ShoppingCart(items={self.items})"


class OrderProcessing:
    def __init__(self, shopping_cart):
        self.shopping_cart = shopping_cart

    def process_order(self, shipping_address, payment_info):
        total = self.shopping_cart.total_price()
        print(f"Processing order for total: {total}")
        print(f"Shipping to: {shipping_address}")
        print(f"Payment info: {payment_info}")
        self.shopping_cart.items = []  # Clear cart after processing
        return True


def main():
    product1 = Product(1, "Shirt", 20)
    product2 = Product(2, "Pants", 30)

    cart = ShoppingCart()
    cart.add_item(product1, 2)
    cart.add_item(product2, 1)

    print(f"Current Cart: {cart}")

    order_processor = OrderProcessing(cart)
    order_success = order_processor.process_order("123 Main St", "Visa****1234")

    if order_success:
        print("Order processed successfully!")
        print(f"Updated Cart: {cart}")  # Cart should be empty


if __name__ == "__main__":
    main()
```