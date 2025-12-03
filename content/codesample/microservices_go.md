---
title: "Microservices - Go"
date: 2025-12-03T14:43:37.138-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Go"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often a RESTful API. This example demonstrates a simplified order and payment service. The `order` service handles order creation and the `payment` service processes payments. They communicate via HTTP requests. This fits idiomatic Go through its emphasis on simplicity, concurrency (though not explicitly shown here for brevity), and clear interfaces.  The use of HTTP handlers and structs for data transfer aligns with Go's standard library and common web development practices.

```go
// main.go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// Order Service
type Order struct {
	ID     int    `json:"id"`
	ItemID int    `json:"item_id"`
	Amount int    `json:"amount"`
}

var orders = []Order{}

func createOrderHandler(w http.ResponseWriter, r *http.Request) {
	var newOrder Order
	if err := json.NewDecoder(r.Body).Decode(&newOrder); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newOrder.ID = len(orders) + 1
	orders = append(orders, newOrder)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newOrder)
}

// Payment Service
func processPaymentHandler(w http.ResponseWriter, r *http.Request) {
	orderIDStr := r.URL.Query().Get("order_id")
	amountStr := r.URL.Query().Get("amount")

	orderID, err := strconv.Atoi(orderIDStr)
	if err != nil {
		http.Error(w, "Invalid order ID", http.StatusBadRequest)
		return
	}

	amount, err := strconv.Atoi(amountStr)
	if err != nil {
		http.Error(w, "Invalid amount", http.StatusBadRequest)
		return
	}

	// Simulate payment processing
	paymentSuccessful := true // In a real app, this would depend on external factors

	if paymentSuccessful {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Payment processed successfully for order ID:", orderID, "amount:", amount)
	} else {
		http.Error(w, "Payment failed", http.StatusInternalServerError)
	}
}

func main() {
	// Order Service Routes
	http.HandleFunc("/orders", createOrderHandler)

	// Payment Service Routes
	http.HandleFunc("/payments/process", processPaymentHandler)

	fmt.Println("Order service listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```