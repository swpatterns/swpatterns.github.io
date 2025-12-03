---
title: "Microservices - C++"
date: 2025-12-03T14:42:58.432-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["C++"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often a RESTful API. This example simulates two microservices: `UserService` and `OrderService`, communicating over a simple HTTP interface using a basic in-memory data store for demonstration.  A `ServiceClient` class abstracts the HTTP communication.  This approach leverages C++'s ability to create well-defined classes and interfaces, and the use of standard libraries like `iostream` and a simplified HTTP client demonstrates a practical, albeit basic, implementation suitable for resource-constrained environments or when full-fledged frameworks are undesirable.

```cpp
 #include <iostream>
 #include <string>
 #include <vector>
 #include <sstream>
 #include <map>

 // Simplified HTTP Client (for demonstration)
 class ServiceClient {
 public:
  std::string get(const std::string& url) {
    // In a real implementation, this would make an HTTP GET request.
    // For simplicity, we simulate a response.
    if (url == "http://user-service/users/123") {
      return "{\"user_id\": \"123\", \"username\": \"john.doe\"}";
    } else if (url == "http://order-service/orders/user/123") {
      return "[{\"order_id\": \"456\", \"item\": \"Book\"}, {\"order_id\": \"789\", \"item\": \"Pen\"}]";
    }
    return "{}"; // Default empty response
  }
 };

 // UserService Microservice
 class UserService {
 public:
  std::string getUser(int userId) {
    // In a real implementation, this would fetch from a database.
    std::stringstream ss;
    ss << "{\"user_id\": \"" << userId << "\", \"username\": \"user_" << userId << "\" }";
    return ss.str();
  }
 };

 // OrderService Microservice
 class OrderService {
 public:
  std::vector<std::string> getOrders(int userId) {
    // In a real implementation, this would fetch from a database.
    if (userId == 123) {
      return {"{\"order_id\": \"456\", \"item\": \"Book\"}",
              "{\"order_id\": \"789\", \"item\": \"Pen\"}"};
    }
    return {};
  }
 };

 int main() {
  UserService userService;
  OrderService orderService;
  ServiceClient client;

  // Simulate a client application using the microservices
  int userId = 123;

  // Get user information
  std::string userJson = client.get("http://user-service/users/" + std::to_string(userId));
  std::cout << "User: " << userJson << std::endl;

  // Get orders for the user
  std::string ordersJson = client.get("http://order-service/orders/user/" + std::to_string(userId));
  std::cout << "Orders: " << ordersJson << std::endl;

  return 0;
 }
 ```