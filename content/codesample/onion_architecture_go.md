---
title: "Onion Architecture - Go"
date: 2025-12-03T14:14:02.949-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Go"]
---
The Onion Architecture aims to achieve independence from frameworks, databases, and UI by structuring an application in concentric layers. The core business logic resides in the innermost layer (Entities), with dependencies pointing outwards. Outward layers represent infrastructure concerns like data access (Repositories) and presentation (Handlers).  This promotes testability and maintainability as business rules aren’t coupled to external details. 

The Go example demonstrates a simplified Onion Architecture. `domain` defines the core entities and business logic (services). `infrastructure` contains database repositories. `application` (or interfaces layer) defines interfaces for interacting with the domain, and implements use cases using the domain services and an interface-based repository. `main` handles request parsing, calls a use case, and presents the output—acting as the outermost layer and a starting point. This separation and dependency inversion are idiomatic in Go through interface usage.

```go
// main.go - Outermost Layer (Presentation/Interface)
package main

import "fmt"

// UseCase defines the interface for our application logic.
type UseCase interface {
	ProcessOrder(userID string, itemID string, quantity int) error
}

// handler is a simple struct to hold the use case.
type handler struct {
	useCase UseCase
}

// NewHandler creates a new handler with the given use case.
func NewHandler(useCase UseCase) *handler {
	return &handler{useCase: useCase}
}

// ProcessOrderRequest represents the input to the process order endpoint.
type ProcessOrderRequest struct {
	UserID   string
	ItemID   string
	Quantity int
}

// ProcessOrder handles the process order request.
func (h *handler) ProcessOrder(req ProcessOrderRequest) error {
	return h.useCase.ProcessOrder(req.UserID, req.ItemID, req.Quantity)
}

func main() {
	// Assemble the layers (dependency injection)
	// In a real app, the repository would be configured through DI as well
	useCase := NewOrderService(NewOrderRepository()) 
	h := NewHandler(useCase)

	// Simulate a request
	req := ProcessOrderRequest{UserID: "user123", ItemID: "item456", Quantity: 2}

	// Process the order
	err := h.ProcessOrder(req)
	if err != nil {
		fmt.Println("Error processing order:", err)
		return
	}

	fmt.Println("Order processed successfully!")
}


// domain/entities.go - Core (Entities)
package domain

// OrderItem represents an item in an order.
type OrderItem struct {
	ItemID   string
	Quantity int
}

// Order represents the core order entity.
type Order struct {
	OrderID  string
	UserID   string
	Items    []OrderItem
}

// domain/services.go - Core (Services)
package domain

// OrderService is responsible for the order-related business logic.
type OrderService interface {
	ProcessOrder(userID string, itemID string, quantity int) error
}

type orderService struct {
  orderRepository OrderRepository
}

func NewOrderService(orderRepository OrderRepository) OrderService {
    return &orderService{orderRepository: orderRepository}
}

func (s *orderService) ProcessOrder(userID string, itemID string, quantity int) error {
    // Business Logic: Validations, calculations, etc.
    if quantity <= 0 {
        return fmt.Errorf("invalid quantity: %d", quantity)
    }

    // Create order item
    orderItem := OrderItem{ItemID: itemID, Quantity: quantity}

    // Create order
    order := Order{
        OrderID:  "order-" + userID + "-" + itemID, //Simple order ID
        UserID:   userID,
        Items:    []OrderItem{orderItem},
    }
    
    // Persist the order
    return s.orderRepository.Save(order)
}


// domain/repositories.go - Core (Repository Interface)
package domain

import "fmt"

// OrderRepository defines the interface for interacting with order data.
type OrderRepository interface {
	Save(order Order) error
}

// infrastructure/order_repository.go - Infrastructure (Data Access)
package infrastructure

import "fmt"
import "github.com/yourusername/onionarch/domain" // Replace with your module path

// OrderRepositoryImpl is a concrete implementation of the OrderRepository interface.
type OrderRepositoryImpl struct {
	// Database connection or other data store
}

// NewOrderRepository creates a new OrderRepositoryImpl.
func NewOrderRepository() domain.OrderRepository {
	return &OrderRepositoryImpl{}
}

// Save saves an order to the data store.
func (r *OrderRepositoryImpl) Save(order domain.Order) error {
	// Simulate database saving.
	fmt.Printf("Saving order to database: %+v\n", order)
	return nil
}
```