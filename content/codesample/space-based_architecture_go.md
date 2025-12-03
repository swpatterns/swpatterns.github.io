---
title: "Space-Based Architecture - Go"
date: 2025-12-03T14:58:30.597-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Go"]
---
The Space-Based Architecture pattern structures an application as a collection of independent, loosely coupled services (spaces) that communicate via well-defined interfaces. Each space encapsulates specific business functionality and manages its own data. This promotes modularity, scalability, and independent deployment.

The Go code demonstrates this by defining interfaces for communication between spaces (e.g., `OrderService`, `PaymentService`). Concrete implementations (`BasicOrderService`, `DummyPaymentService`) represent individual spaces. The `App` struct orchestrates interactions between these spaces, adhering to dependency injection principles.  Go's interfaces and emphasis on composition make it well-suited for this pattern, allowing for flexible service integration and testability. The use of structs and methods aligns with Go's preferred style for structuring applications.

```go
// spaces.go

package main

import "fmt"

// Define interfaces for communication between spaces
type OrderService interface {
	CreateOrder(orderData map[string]interface{}) (string, error)
	GetOrder(orderID string) (map[string]interface{}, error)
}

type PaymentService interface {
	ProcessPayment(orderID string, amount float64) error
}

// Concrete implementations of spaces
type BasicOrderService struct {
	orders map[string]map[string]interface{}
}

func (o *BasicOrderService) CreateOrder(orderData map[string]interface{}) (string, error) {
	orderID := fmt.Sprintf("order-%d", len(o.orders)+1)
	o.orders[orderID] = orderData
	return orderID, nil
}

func (o *BasicOrderService) GetOrder(orderID string) (map[string]interface{}, error) {
	if order, ok := o.orders[orderID]; ok {
		return order, nil
	}
	return nil, fmt.Errorf("order not found")
}

type DummyPaymentService struct{}

func (d *DummyPaymentService) ProcessPayment(orderID string, amount float64) error {
	fmt.Printf("Processing payment for order %s, amount: %.2f\n", orderID, amount)
	return nil
}

// Application orchestrator
type App struct {
	orderService  OrderService
	paymentService PaymentService
}

func NewApp(orderService OrderService, paymentService PaymentService) *App {
	return &App{
		orderService:  orderService,
		paymentService: paymentService,
	}
}

func (a *App) HandleOrder(orderData map[string]interface{}) (string, error) {
	orderID, err := a.orderService.CreateOrder(orderData)
	if err != nil {
		return "", err
	}

	amount, ok := orderData["amount"].(float64)
	if !ok {
		return "", fmt.Errorf("invalid amount in order data")
	}

	err = a.paymentService.ProcessPayment(orderID, amount)
	if err != nil {
		return "", err
	}

	return orderID, nil
}

func main() {
	// Initialize spaces
	orderService := &BasicOrderService{orders: make(map[string]map[string]interface{})}
	paymentService := &DummyPaymentService{}

	// Create application
	app := NewApp(orderService, paymentService)

	// Example usage
	orderData := map[string]interface{}{
		"customer": "Alice",
		"items":    []string{"Book", "Pen"},
		"amount":   25.0,
	}

	orderID, err := app.HandleOrder(orderData)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Order created with ID:", orderID)
	}
}
```