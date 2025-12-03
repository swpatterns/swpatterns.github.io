---
title: "SOA - Dart"
date: 2025-12-03T14:50:47.913-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Dart"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, independent services. Each service encapsulates a specific business function and communicates with others through well-defined interfaces (often APIs). This promotes modularity, reusability, and independent deployment.

The Dart example demonstrates a simplified SOA with `UserService` and `ProductService`. Each service has a clear responsibility: managing user data and product information, respectively. They expose methods for interacting with their data.  A `ServiceClient` orchestrates calls to these services.  Using classes and interfaces is idiomatic Dart for structuring such components, enabling clear separation of concerns and testability.  The use of asynchronous methods (`Future`) reflects Dart's preferred approach for handling I/O and network operations common in SOA.

```dart
// user_service.dart
abstract class UserService {
  Future<String> getUserName(int userId);
}

class DefaultUserService implements UserService {
  final Map<int, String> users = {1: 'Alice', 2: 'Bob'};

  @override
  Future<String> getUserName(int userId) async {
    await Future.delayed(Duration(milliseconds: 50)); // Simulate network latency
    return users[userId] ?? 'Unknown User';
  }
}

// product_service.dart
abstract class ProductService {
  Future<double> getProductPrice(String productId);
}

class DefaultProductService implements ProductService {
  final Map<String, double> products = {'A123': 19.99, 'B456': 29.99};

  @override
  Future<double> getProductPrice(String productId) async {
    await Future.delayed(Duration(milliseconds: 100)); // Simulate network latency
    return products[productId] ?? 0.0;
  }
}

// service_client.dart
class ServiceClient {
  final UserService userService;
  final ProductService productService;

  ServiceClient({required this.userService, required this.productService});

  Future<String> getOrderDetails(int userId, String productId) async {
    final userName = await userService.getUserName(userId);
    final productPrice = await productService.getProductPrice(productId);

    return '$userName ordered product $productId for \$${productPrice.toStringAsFixed(2)}';
  }
}

// main.dart
import 'user_service.dart';
import 'product_service.dart';
import 'service_client.dart';

void main() async {
  final userService = DefaultUserService();
  final productService = DefaultProductService();
  final client = ServiceClient(userService: userService, productService: productService);

  final orderDetails = await client.getOrderDetails(1, 'A123');
  print(orderDetails); // Output: Alice ordered product A123 for $19.99
}
```