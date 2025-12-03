---
title: "Onion Architecture - JavaScript"
date: 2025-12-03T14:12:30.835-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["JavaScript"]
---
The Onion Architecture aims to achieve a loose coupling between business logic and infrastructure concerns like databases or UI frameworks. It structures the application in concentric layers: Domain (core business rules), Application (use cases orchestrating domain models), and Infrastructure (external implementations like data access). Dependencies point *inward* – infrastructure knows about application and domain, but domain knows nothing of infrastructure. This allows changes in infrastructure without impacting core business logic.

Here, we’ll represent a simplified system with a user service using this structure.  The Domain layer defines a User entity. The Application layer defines a UserService that uses the User entity to perform business logic (like creating a user). The Infrastructure layer provides a concrete implementation for user storage (here, an in-memory repository; in a real app, this could be a database). Dependency Injection is used to couple the layers.  This aligns with JavaScript’s flexible nature, allowing clear separation of concerns and testability.

```javascript
// Domain Layer
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  isValid() {
    return this.name && this.email;
  }
}

// Application Layer
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  createUser(name, email) {
    const user = new User(Math.random(), name, email);
    if (user.isValid()) {
      this.userRepository.save(user);
      return user;
    }
    return null;
  }

  getUserById(id) {
    return this.userRepository.getById(id);
  }
}

// Infrastructure Layer
class InMemoryUserRepository {
  constructor() {
    this.users = [];
  }

  save(user) {
    this.users.push(user);
  }

  getById(id) {
    return this.users.find(user => user.id === id) || null;
  }
}

// Composition Root (Entry Point)
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

// Example Usage
const newUser = userService.createUser("John Doe", "john.doe@example.com");
if (newUser) {
  console.log("Created User:", newUser);
}

const retrievedUser = userService.getUserById(newUser.id);
if (retrievedUser) {
  console.log("Retrieved User:", retrievedUser);
}
```