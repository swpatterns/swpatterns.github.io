---
title: "Layered Architecture - Go"
date: 2025-12-03T14:05:21.597-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Go"]
---
The Layered Architecture pattern organizes an application into distinct layers, each performing a specific role. This promotes separation of concerns, making the application more maintainable and testable. Layers typically include Presentation (UI), Business Logic, Data Access, and potentially others like External Services. Each layer only interacts with the layers directly below it.

This Go example demonstrates a simple layered architecture for a user service. The `domain` layer contains core business logic (user struct & validation).  The `service` layer orchestrates these domain operations and potentially includes application-specific rules. The `repository` layer handles data access (in this case, a simple in-memory user store).  The `main` function represents the Presentation layer, interacting with the service. This structure leverages Go's package system for clear separation, and interfaces for decoupling layers enabling testability and future adaptability.

```go
// main.go - Presentation Layer
package main

import (
	"fmt"
	"log"

	"github.com/your-username/layered-go/service"
	"github.com/your-username/layered-go/repository"
)

func main() {
	userRepo := repository.NewUserRepository()
	userService := service.NewUserService(userRepo)

	// Create a user (Presentation -> Service -> Repository)
	user, err := userService.CreateUser("Alice", "alice@example.com")
	if err != nil {
		log.Fatalf("Error creating user: %v", err)
	}
	fmt.Printf("Created User: %+v\n", user)

	// Get a user (Presentation -> Service -> Repository)
	retrievedUser, err := userService.GetUser(user.ID)
	if err != nil {
		log.Fatalf("Error getting user: %v", err)
	}
	fmt.Printf("Retrieved User: %+v\n", retrievedUser)
}
```

```go
// domain/user.go - Domain Layer
package domain

import "fmt"

type User struct {
	ID        int
	Name      string
	Email     string
}

func (u *User) Validate() error {
	if u.Name == "" {
		return fmt.Errorf("name is required")
	}
	if u.Email == "" {
		return fmt.Errorf("email is required")
	}
	return nil
}
```

```go
// service/user_service.go - Service Layer
package service

import (
	"github.com/your-username/layered-go/domain"
	"github.com/your-username/layered-go/repository"
)

type UserService struct {
	userRepository repository.UserRepository
}

func NewUserService(repo repository.UserRepository) *UserService {
	return &UserService{userRepository: repo}
}

func (s *UserService) CreateUser(name string, email string) (*domain.User, error) {
	user := &domain.User{Name: name, Email: email}
	if err := user.Validate(); err != nil {
		return nil, err
	}
	return s.userRepository.Save(user)
}

func (s *UserService) GetUser(id int) (*domain.User, error) {
	return s.userRepository.FindByID(id)
}
```

```go
// repository/user_repository.go - Data Access Layer
package repository

import (
	"fmt"
	"github.com/your-username/layered-go/domain"
)

type UserRepository interface {
	Save(user *domain.User) (*domain.User, error)
	FindByID(id int) (*domain.User, error)
}

type InMemoryUserRepository struct {
	users map[int]*domain.User
	nextID int
}

func NewUserRepository() *InMemoryUserRepository {
	return &InMemoryUserRepository{
		users:   make(map[int]*domain.User),
		nextID: 1,
	}
}

func (r *InMemoryUserRepository) Save(user *domain.User) (*domain.User, error) {
	user.ID = r.nextID
	r.users[r.nextID] = user
	r.nextID++
	return user, nil
}

func (r *InMemoryUserRepository) FindByID(id int) (*domain.User, error) {
	user, ok := r.users[id]
	if !ok {
		return nil, fmt.Errorf("user not found with id %d", id)
	}
	return user, nil
}
```