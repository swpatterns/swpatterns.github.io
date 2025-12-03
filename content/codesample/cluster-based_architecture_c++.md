---
title: "Cluster-based Architecture - C++"
date: 2025-12-03T15:16:44.339-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["C++"]
---
The Cluster-based Architecture pattern organizes components into independent groups ("clusters") to manage complexity and facilitate independent development, deployment, and scaling. Each cluster encapsulates related functionality and exposes a well-defined interface to other clusters. This promotes loose coupling and makes it easier to modify or replace individual clusters without affecting the entire system. The example below represents a simple system with 'Order' and 'Payment' clusters, each responsible for their specific domain. The interfaces are defined as abstract classes and implemented within each cluster, showcasing how they interact via abstraction. This aligns with C++'s emphasis on modularity and encapsulation using classes and interfaces.

```cpp
#include <iostream>
#include <vector>

// Abstract Interface for Order Cluster
class IOrderService {
public:
  virtual void createOrder(int productId, int quantity) = 0;
  virtual int getOrderId() = 0; //Returns the most recent order id
};

// Abstract Interface for Payment Cluster
class IPaymentService {
public:
  virtual bool processPayment(int orderId, double amount) = 0;
};

// Order Cluster Implementation
class OrderService : public IOrderService {
private:
  static int nextOrderId;
  std::vector<int> orderIds;
public:
  void createOrder(int productId, int quantity) override {
    std::cout << "Order: Creating order for product " << productId << ", quantity " << quantity << std::endl;
    orderIds.push_back(nextOrderId++);
  }

  int getOrderId() override {
    return orderIds.back();
  }
};

int OrderService::nextOrderId = 1;

// Payment Cluster Implementation
class PaymentService : public IPaymentService {
public:
  bool processPayment(int orderId, double amount) override {
    std::cout << "Payment: Processing payment of " << amount << " for order " << orderId << std::endl;
    return true; // Simulate successful payment
  }
};

// Client code (glue - minimized for demonstration)
int main() {
  IOrderService* orderSvc = new OrderService();
  IPaymentService* paymentSvc = new PaymentService();

  orderSvc->createOrder(123, 2);
  int orderId = orderSvc->getOrderId();
  
  if (paymentSvc->processPayment(orderId, 29.99)) {
    std::cout << "Transaction complete!" << std::endl;
  }
  else {
    std::cout << "Transaction failed." << std::endl;
  }

  delete orderSvc;
  delete paymentSvc;
  return 0;
}
```