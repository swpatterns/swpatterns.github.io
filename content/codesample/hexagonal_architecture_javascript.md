---
title: "Hexagonal Architecture - JavaScript"
date: 2025-12-03T14:08:07.222-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["JavaScript"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by separating the core business logic from external concerns like databases, UI frameworks, or APIs.  The core interacts with the outside world only through *ports* – interfaces defining needed interactions.  *Adapters* sit between the ports and the actual external technologies, translating requests and responses.  This allows swapping implementations without modifying the core.

This JavaScript example simulates a user service. The `UserService` (core) depends on a `UserRepository` port. Two adapters, `InMemoryUserRepository` and a stub `ExternalUserRepository`, implement this port.  The `ExternalUserRepository` represents a dependency (e.g., a database).  The core doesn’t know *how* users are stored, only that a repository can `getUser` and `createUser`. A simple CLI interaction is provided via an adapter. It showcases how minimal driving (input) and driven (output) adapters can coexist dynamically. This loosely coupled approach fits JavaScript’s flexibility, using simple interfaces to promote testability and maintainability, and leverages the language's prevalent use of dependency injection.

```javascript
// Core Business Logic
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  createUser(name, email) {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }
    return this.userRepository.createUser({ name, email });
  }

  getUser(id) {
    return this.userRepository.getUser(id);
  }
}

// Port (Interface)
class UserRepository {
  getUser(id) {
    throw new Error("Method not implemented.");
  }
  createUser(user) {
    throw new Error("Method not implemented.");
  }
}

// Adapters (Implementations of the Port)
class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
    this.nextId = 1;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  createUser(user) {
    const newUser = { ...user, id: this.nextId++ };
    this.users.push(newUser);
    return newUser;
  }
}

class ExternalUserRepository extends UserRepository {
  //Simulates interacting with an external system like a database
  getUser(id) {
    //In a real implementation this would fetch from the database.
    return Promise.resolve({ id: id, name: `User ${id}`, email: `user${id}@example.com`});
  }
  createUser(user) {
    //In a real implementation this would save to the database.
    return Promise.resolve({...user, id: Math.floor(Math.random() * 1000)});
  }
}

// Driving Adapter (CLI Example)
async function main() {
  const userRepository = new InMemoryUserRepository(); // or new ExternalUserRepository() for different behaviour
  const userService = new UserService(userRepository);

  try {
    const newUser = await userService.createUser("Alice", "alice@example.com");
    console.log("Created user:", newUser);

    const retrievedUser = await userService.getUser(newUser.id);
    console.log("Retrieved user:", retrievedUser);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```