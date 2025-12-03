---
title: "Dependency Injection - JavaScript"
date: 2025-12-03T11:19:28.558-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["JavaScript"]
---
Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. This promotes loose coupling, making code more testable, reusable, and maintainable. Our JavaScript example uses constructor injection – dependencies are provided through the class constructor.  A `UserService` class depends on a `UserRepository` to fetch user data. Instead of `UserService` instantiating `UserRepository`, we pass an instance of it in when creating `UserService`.  This is idiomatic JavaScript as it leverages the flexibility of passing functions as arguments and doesn’t enforce strict class hierarchies, favoring composition.  It is well-suited for testing, allowing us to mock the `UserRepository` easily.

```javascript
// UserRepository interface/abstract class (defines what a repository should do)
class UserRepository {
  getUserById(id) {
    throw new Error("Method 'getUserById' must be implemented.");
  }
}

// Concrete implementation of UserRepository (e.g., using a database)
class DatabaseUserRepository extends UserRepository {
  constructor() {
    super();
    // Simulate database connection
    this.users = {
      1: { id: 1, name: "Alice" },
      2: { id: 2, name: "Bob" },
    };
  }

  getUserById(id) {
    return this.users[id];
  }
}

// UserService class - depends on UserRepository
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getUserName(id) {
    const user = this.userRepository.getUserById(id);
    if (user) {
      return user.name;
    } else {
      return "User not found";
    }
  }
}

// Usage: Inject the dependency
const userRepository = new DatabaseUserRepository();
const userService = new UserService(userRepository);

console.log(userService.getUserName(1)); // Output: Alice
console.log(userService.getUserName(3)); // Output: User not found

// For testing, you can easily inject a mock UserRepository:
class MockUserRepository extends UserRepository {
  getUserById(id) {
    return { id: id, name: "Mock User" };
  }
}

const mockRepository = new MockUserRepository();
const userServiceWithMock = new UserService(mockRepository);
console.log(userServiceWithMock.getUserName(5)); // Output: Mock User

```