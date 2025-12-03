---
title: "Monolith - Dart"
date: 2025-12-03T14:28:02.357-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Dart"]
---
The Monolith pattern involves building an application as a single, unified unit. All features and functionalities are tightly coupled and deployed as one. While often criticized for scaling challenges, it offers simplicity in development, testing, and initial deployment. This Dart example showcases a simplistic "Monolith" by containing all business logic—user management and product catalog—within the same `app.dart` file and a single `MyApp` class. There's no separation into microservices or distinct modules. This is a direct reflection of how smaller Dart applications are frequently structured, utilizing classes to encapsulate state and behavior.

```dart
// app.dart
class User {
  String name;
  String email;

  User({required this.name, required this.email});

  String greet() => 'Hello, ${name}!';
}

class Product {
  String name;
  double price;

  Product({required this.name, required this.price});

  String displayPrice() => '\$${price.toStringAsFixed(2)}';
}

class MyApp {
  List<User> users = [];
  List<Product> products = [];

  void addUser(User user) {
    users.add(user);
  }

  void addProduct(Product product) {
    products.add(product);
  }

  List<String> getUserGreetings() {
    return users.map((user) => user.greet()).toList();
  }

  List<String> getProductDetails() {
    return products.map((product) => '${product.name} - ${product.displayPrice()}').toList();
  }
}

void main() {
  final app = MyApp();

  app.addUser(User(name: 'Alice', email: 'alice@example.com'));
  app.addUser(User(name: 'Bob', email: 'bob@example.com'));

  app.addProduct(Product(name: 'Laptop', price: 1200.00));
  app.addProduct(Product(name: 'Mouse', price: 25.00));

  print('User Greetings:');
  for (final greeting in app.getUserGreetings()) {
    print(greeting);
  }

  print('\nProduct Details:');
  for (final detail in app.getProductDetails()) {
    print(detail);
  }
}
```