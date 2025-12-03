---
title: "Hexagonal Architecture - Go"
date: 2025-12-03T14:09:39.459-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Go"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled, testable software by separating the core application logic from external concerns like databases, UI, and message queues. The core defines "ports" – interfaces that external actors interact with. "Adapters" implement these ports, translating external interactions into core-compatible actions and vice versa.

This Go example demonstrates a simple Hexagonal Architecture for a user service. The `core` package contains the application logic and defines the `UserRepository` port. The `adapters` package provides implementations for in-memory and (mock) external user repositories. The `cmd` package serves as the entry point, using an adapter to interact with the core. The separation allows swapping implementations (e.g., switching databases) without modifying core logic. This aligns with Go’s emphasis on interfaces and composition over inheritance.

```go
// main.go
package main

import (
	"fmt"
	"hexagonal/core"
	"hexagonal/adapters"
)

func main() {
	// Choose an adapter (InMemoryRepository in this case)
	repo := adapters.NewInMemoryUserRepository()

	// Create the user service with the adapter
	userService := core.NewUserService(repo)

	// Interact with the service
	user, err := userService.GetUser(1)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("User: %+v\n", user)

	updatedUser, err := userService.UpdateUser(user.ID, "New Name")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("Updated User: %+v\n", updatedUser)
}

// core/user_service.go
package core

type UserRepository interface {
	GetUser(id int) (*User, error)
	UpdateUser(user *User) (*User, error)
}

type UserService struct {
	repo UserRepository
}

func NewUserService(repo UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) GetUser(id int) (*User, error) {
	return s.repo.GetUser(id)
}

func (s *UserService) UpdateUser(id int, name string) (*User, error) {
	user, err := s.repo.GetUser(id)
	if err != nil {
		return nil, fmt.Errorf("user not found: %w", err)
	}
	user.Name = name
	return s.repo.UpdateUser(user)
}

type User struct {
	ID   int
	Name string
}


// adapters/user_repository.go
package adapters

import "fmt"

type InMemoryUserRepository struct {
	users map[int]*core.User
}

func NewInMemoryUserRepository() *InMemoryUserRepository {
	return &InMemoryUserRepository{
		users: map[int]*core.User{
			1: {ID: 1, Name: "Old Name"},
			2: {ID: 2, Name: "Another Name"},
		},
	}
}

func (r *InMemoryUserRepository) GetUser(id int) (*core.User, error) {
	user, ok := r.users[id]
	if !ok {
		return nil, fmt.Errorf("user with id %d not found", id)
	}
	return user, nil
}

func (r *InMemoryUserRepository) UpdateUser(user *core.User) (*core.User, error) {
	r.users[user.ID] = user
	return user, nil
}
```