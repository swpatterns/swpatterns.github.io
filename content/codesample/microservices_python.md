---
title: "Microservices - Python"
date: 2025-12-03T14:41:24.661-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Python"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often an HTTP resource API. This example demonstrates a simplified order and customer service.  The `OrderService` handles order creation, while `CustomerService` manages customer details. They communicate via HTTP requests using the `requests` library. This approach aligns with Python's flexibility and ease of use for building APIs, leveraging its web frameworks (like Flask, used here) for service implementation and standard libraries for communication.

```python
# order_service.py
from flask import Flask, request, jsonify

app = Flask(__name__)

orders = {}
order_id_counter = 1

@app.route('/orders', methods=['POST'])
def create_order():
    global order_id_counter
    customer_id = request.json.get('customer_id')
    if not customer_id:
        return jsonify({'error': 'Customer ID is required'}), 400

    order_id = order_id_counter
    order_id_counter += 1
    orders[order_id] = {'customer_id': customer_id, 'items': request.json.get('items', [])}
    return jsonify({'order_id': order_id}), 201

@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    if order_id in orders:
        return jsonify(orders[order_id])
    return jsonify({'error': 'Order not found'}), 404

if __name__ == '__main__':
    app.run(port=5000)


# customer_service.py
from flask import Flask, jsonify

app = Flask(__name__)

customers = {
    1: {'name': 'Alice', 'email': 'alice@example.com'},
    2: {'name': 'Bob', 'email': 'bob@example.com'}
}

@app.route('/customers/<int:customer_id>')
def get_customer(customer_id):
    if customer_id in customers:
        return jsonify(customers[customer_id])
    return jsonify({'error': 'Customer not found'}), 404

if __name__ == '__main__':
    app.run(port=5001)
```