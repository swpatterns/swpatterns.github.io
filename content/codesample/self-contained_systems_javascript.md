---
title: "Self-contained Systems - JavaScript"
date: 2025-12-03T14:28:44.503-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["JavaScript"]
---
The Self-Contained Systems pattern aims to minimize dependencies between software components, creating modules with well-defined interfaces and internal implementations. This promotes modularity, testability, and reusability.  The example below demonstrates this by encapsulating order processing logic within a single `OrderProcessor` class. It handles order validation and processing internally, exposing only `processOrder` and `getOrderStatus`.  This style leverages JavaScript's class-based structure to contain the system, aligning with modern JavaScript practices for creating organized, maintainable code. No external state is required for processing--everything needed is passed to the `processOrder` function.

```javascript
/**
 * OrderProcessor Class - A self-contained system for handling orders.
 */
class OrderProcessor {
  constructor() {
    this.orders = {};
    this.orderIdCounter = 1;
  }

  /**
   * Processes a new order.
   * @param {object} orderData - Data for the order (e.g., items, customer info).
   * @returns {number} - The order ID.
   * @throws {Error} - If order data is invalid.
   */
  processOrder(orderData) {
    if (!orderData || !orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw new Error("Invalid order data provided.");
    }

    const orderId = this.orderIdCounter++;
    this.orders[orderId] = {
      ...orderData,
      status: 'pending'
    };
    return orderId;
  }

  /**
   * Gets the status of an order.
   * @param {number} orderId - The ID of the order.
   * @returns {string | undefined} - The order status, or undefined if the order is not found.
   */
  getOrderStatus(orderId) {
    return this.orders[orderId]?.status;
  }

  /**
   * Updates the status of an order (internal method).
   * @param {number} orderId - The ID of the order.
   * @param {string} newStatus - The new status to set.
   */
  updateOrderStatus(orderId, newStatus) {
    if (this.orders[orderId]) {
      this.orders[orderId].status = newStatus;
    }
  }
}

// Example usage
const processor = new OrderProcessor();
const orderId = processor.processOrder({ items: [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }] });
console.log(`Order ID: ${orderId}`);
console.log(`Order Status: ${processor.getOrderStatus(orderId)}`);

processor.updateOrderStatus(orderId, 'shipped');
console.log(`Order Status: ${processor.getOrderStatus(orderId)}`);
```