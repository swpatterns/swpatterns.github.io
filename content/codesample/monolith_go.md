---
title: "Monolith - Go"
date: 2025-12-03T14:26:17.381-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Go"]
---
The Monolith pattern structures an application as a single, unified unit. All functionalities, from database interactions to UI logic, reside within the same codebase and are typically deployed as a single process. This example models a simple e-commerce application where product management, user accounts, and order processing are all integrated into a single `main.go` file. This is typical of Go’s encouragement of simple, self-contained executables.  While not scalable in the same way as microservices, a monolith demonstrates simplicity in initial development and deployment, leveraging Go's built-in concurrency features for internal parallelism.

```go
// main.go

package main

import (
	"fmt"
)

// Product represents an item for sale.
type Product struct {
	ID    int
	Name  string
	Price float64
}

// User represents a customer.
type User struct {
	ID    int
	Name  string
	Email string
}

// Order represents a customer's purchase.
type Order struct {
	ID     int
	UserID int
	Items  []Product
	Total  float64
}

var (
	products = []Product{
		{ID: 1, Name: "Laptop", Price: 1200},
		{ID: 2, Name: "Mouse", Price: 25},
	}
	users = []User{
		{ID: 1, Name: "Alice", Email: "alice@example.com"},
		{ID: 2, Name: "Bob", Email: "bob@example.com"},
	}
	orders = []Order{}
)

// addProduct adds a new product to the system.
func addProduct(name string, price float64) {
	newID := len(products) + 1
	products = append(products, Product{ID: newID, Name: name, Price: price})
	fmt.Printf("Product %s added with ID %d\n", name, newID)
}

// createOrder creates a new order for a user.
func createOrder(userID int, productIDs []int) {
	orderItems := []Product{}
	total := 0.0

	for _, productID := range productIDs {
		for _, product := range products {
			if product.ID == productID {
				orderItems = append(orderItems, product)
				total += product.Price
			}
		}
	}

	newOrderID := len(orders) + 1
	orders = append(orders, Order{ID: newOrderID, UserID: userID, Items: orderItems, Total: total})
	fmt.Printf("Order %d created for User %d with a total of $%.2f\n", newOrderID, userID, total)
}

func main() {
	addProduct("Keyboard", 75.00)
	createOrder(1, []int{1, 2, 3})
	createOrder(2, []int{2})

    fmt.Println("\nProducts:")
    for _, p := range products {
        fmt.Printf("ID: %d, Name: %s, Price: %.2f\n", p.ID, p.Name, p.Price)
    }

    fmt.Println("\nOrders:")
    for _, o := range orders {
        fmt.Printf("ID: %d, UserID: %d, Total: %.2f\n", o.ID, o.UserID, o.Total)
    }
}
```