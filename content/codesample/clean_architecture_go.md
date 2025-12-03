---
title: "Clean Architecture - Go"
date: 2025-12-03T14:18:16.100-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Go"]
---
Clean Architecture aims to create systems independent of frameworks, databases, UI, and external agencies. It achieves this through layering: Entities (core business rules), Use Cases (application-specific logic), Interface Adapters (converts data between layers), and Frameworks & Drivers (UI, databases, etc.). Dependencies point inward; inner layers know nothing of outer layers. This promotes testability, maintainability, and flexibility.

The Go example demonstrates a simplified Clean Architecture centered around a user profile use case.  `entities` define the core User struct. `usecases` define the business logic for retrieving a user. `interfaces` define interfaces for data access (UserRepo) and presentation (UserPresenter).  `main` (frameworks & drivers) implements a CLI driver and mocks the repository for this simple case. This design leverages Go's interfaces for dependency inversion and separates concerns, aligning with its focus on explicit dependencies and simplicity.

```go
// main.go - Frameworks & Drivers Layer
package main

import "fmt"

// Interfaces
type UserRepo interface {
	GetUser(id int) (User, error)
}

type UserPresenter interface {
	PresentUser(user User) string
}

// Entities
type User struct {
	ID    int
	Name  string
	Email string
}

// Use Cases
type GetUserProfile struct {
	userRepo    UserRepo
	userPresenter UserPresenter
}

func NewGetUserProfile(repo UserRepo, presenter UserPresenter) *GetUserProfile {
	return &GetUserProfile{userRepo: repo, userPresenter: presenter}
}

func (u *GetUserProfile) GetUser(id int) (string, error) {
	user, err := u.userRepo.GetUser(id)
	if err != nil {
		return "", err
	}
	return u.userPresenter.PresentUser(user), nil
}

// Implementations (for this example, in main for brevity)

type InMemoryUserRepo struct {
	users map[int]User
}

func NewInMemoryUserRepo() *InMemoryUserRepo {
	return &InMemoryUserRepo{users: map[int]User{
		1: {ID: 1, Name: "John Doe", Email: "john.doe@example.com"},
	}}
}

func (r *InMemoryUserRepo) GetUser(id int) (User, error) {
	user, ok := r.users[id]
	if !ok {
		return User{}, fmt.Errorf("user not found")
	}
	return user, nil
}

type CLIUserPresenter struct{}

func (p *CLIUserPresenter) PresentUser(user User) string {
	return fmt.Sprintf("User ID: %d, Name: %s, Email: %s", user.ID, user.Name, user.Email)
}

func main() {
	repo := NewInMemoryUserRepo()
	presenter := &CLIUserPresenter{}
	useCase := NewGetUserProfile(repo, presenter)

	profile, err := useCase.GetUser(1)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println(profile)
}
```