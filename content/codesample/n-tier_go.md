---
title: "N-tier - Go"
date: 2025-12-03T14:38:24.746-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Go"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application more maintainable, testable, and scalable. A typical N-tier architecture includes a presentation tier (UI), a business logic tier, and a data access tier.

This Go example demonstrates a simple 3-tier architecture for managing user data. The `main.go` file represents the presentation tier, handling user interaction (in this case, just printing). The `user_service.go` file contains the business logic for creating and retrieving users. Finally, `user_repository.go` handles the data access, interacting with an in-memory user store.  Using interfaces (`UserRepository`) allows for easy swapping of data storage mechanisms without affecting higher tiers, a key benefit of the pattern. This structure aligns with Go's emphasis on composability and clear interfaces.

```go
// main.go
package main

import (
	"fmt"
)

func main() {
	repo := &InMemoryUserRepository{users: make(map[int]string)}
	service := &UserService{repo: repo}

	userID := service.CreateUser("Alice")
	userName := service.GetUser(userID)

	fmt.Printf("User ID: %d, Name: %s\n", userID, userName)
}

// user_service.go
package main

type UserService struct {
	repo UserRepository
}

func (s *UserService) CreateUser(name string) int {
	return s.repo.Save(name)
}

func (s *UserService) GetUser(id int) string {
	return s.repo.Get(id)
}

// user_repository.go
package main

type UserRepository interface {
	Save(name string) int
	Get(id int) string
}

type InMemoryUserRepository struct {
	users map[int]string
	nextID int
}

func (r *InMemoryUserRepository) Save(name string) int {
	r.nextID++
	r.users[r.nextID] = name
	return r.nextID
}

func (r *InMemoryUserRepository) Get(id int) string {
	return r.users[id]
}
```