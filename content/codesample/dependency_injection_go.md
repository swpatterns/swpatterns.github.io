---
title: "Dependency Injection - Go"
date: 2025-12-03T11:20:38.091-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Go"]
---
Dependency Injection (DI) is a design pattern where a component receives its dependencies from external sources rather than creating them itself. This promotes loose coupling, making the component more testable, reusable, and maintainable.  Our Go example defines an interface for a data store, allowing different implementations (e.g., in-memory, database) to be swapped easily.  The `UserService` receives the data store as a dependency through its constructor. This is a common form of DI in Go – interface-based dependency injection. The use of interfaces aligns with Go's preference for composition and decoupling, furthering code flexibility and testability through mocking.

```go
// main.go
package main

import "fmt"

// DataStore interface defines the methods for data access.
type DataStore interface {
	GetUser(id int) (string, error)
}

// InMemoryDataStore is a concrete implementation of DataStore.
type InMemoryDataStore struct {
	users map[int]string
}

func NewInMemoryDataStore() *InMemoryDataStore {
	return &InMemoryDataStore{
		users: map[int]string{
			1: "Alice",
			2: "Bob",
		},
	}
}

func (d *InMemoryDataStore) GetUser(id int) (string, error) {
	user, ok := d.users[id]
	if !ok {
		return "", fmt.Errorf("user with ID %d not found", id)
	}
	return user, nil
}

// UserService depends on DataStore.
type UserService struct {
	store DataStore
}

// NewUserService creates a new UserService with a given DataStore.
func NewUserService(store DataStore) *UserService {
	return &UserService{store: store}
}

// GetUserName retrieves a user's name from the DataStore.
func (s *UserService) GetUserName(id int) (string, error) {
	return s.store.GetUser(id)
}

func main() {
	// Inject the dependency.
	store := NewInMemoryDataStore()
	service := NewUserService(store)

	userName, err := service.GetUserName(1)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("User Name:", userName)
	}
}
```