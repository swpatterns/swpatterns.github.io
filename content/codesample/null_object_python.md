---
title: "Null Object - Python"
date: 2025-12-03T13:45:55.063-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Python"]
---
The Null Object pattern provides a substitute for an object that would otherwise be null or undefined. Instead of checking for `None` everywhere, you call methods on the null object, and it gracefully handles them by doing nothing or returning default values. This simplifies code and avoids `NullPointerException`-like errors.

The Python example defines a `NullCustomer` class that inherits from a `Customer` base class.  `NullCustomer` overrides methods to return default, "no-op" values (e.g., an empty string for name, 0 for credit limit). A factory function `get_customer` returns either a real `Customer` or a `NullCustomer` based on a customer ID. This avoids `if customer is not None:` checks throughout the calling code. Python's duck typing and flexible method overriding make this a natural fit.

```python
class Customer:
    def __init__(self, name, credit_limit):
        self.name = name
        self.credit_limit = credit_limit

    def get_name(self):
        return self.name

    def get_credit_limit(self):
        return self.credit_limit

    def is_valid(self):
        return self.credit_limit > 0


class NullCustomer(Customer):
    def __init__(self):
        super().__init__("", 0)

    def get_name(self):
        return ""

    def get_credit_limit(self):
        return 0

    def is_valid(self):
        return False


def get_customer(customer_id):
    """Factory method to return a Customer or a NullCustomer."""
    if customer_id > 0:
        return Customer(f"Customer {customer_id}", 1000 + customer_id)
    else:
        return NullCustomer()


if __name__ == "__main__":
    customer1 = get_customer(123)
    customer2 = get_customer(0)

    print(f"Customer 1 Name: {customer1.get_name()}")
    print(f"Customer 1 Credit Limit: {customer1.get_credit_limit()}")
    print(f"Customer 1 is valid: {customer1.is_valid()}")

    print(f"Customer 2 Name: {customer2.get_name()}")
    print(f"Customer 2 Credit Limit: {customer2.get_credit_limit()}")
    print(f"Customer 2 is valid: {customer2.is_valid()}")
```