---
title: "Microservices - Dart"
date: 2025-12-03T14:45:58.896-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Dart"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often a RESTful API. This example demonstrates a simplified implementation with two microservices: `product_service` and `order_service`. They communicate via HTTP requests.  Dart's asynchronous capabilities (`async`/`await`) and its support for HTTP clients make it well-suited for this pattern.  The use of separate functions to represent service endpoints and a simple data model keeps the code clean and focused, aligning with Dart's emphasis on readability and maintainability.

```dart
// product_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class Product {
  final String id;
  final String name;
  final double price;

  Product({required this.id, required this.name, required this.price});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      price: json['price'].toDouble(),
    );
  }
}

Future<Product> getProduct(String id) async {
  final response = await http.get(Uri.parse('http://localhost:8081/products/$id'));
  if (response.statusCode == 200) {
    return Product.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load product');
  }
}

// order_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class Order {
  final String orderId;
  final String productId;
  final int quantity;

  Order({required this.orderId, required this.productId, required this.quantity});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      orderId: json['orderId'],
      productId: json['productId'],
      quantity: json['quantity'],
    );
  }
}

Future<void> createOrder(Order order) async {
  final response = await http.post(
    Uri.parse('http://localhost:8082/orders'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode(order),
  );
  if (response.statusCode != 201) {
    throw Exception('Failed to create order');
  }
}

// main.dart
import 'package:microservices_dart/product_service.dart';
import 'package:microservices_dart/order_service.dart';

void main() async {
  try {
    final product = await getProduct('123');
    print('Product: ${product.name}, Price: ${product.price}');

    final order = Order(orderId: '456', productId: product.id, quantity: 2);
    await createOrder(order);
    print('Order created successfully!');
  } catch (e) {
    print('Error: $e');
  }
}
```