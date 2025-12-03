---
title: "N-tier - Java"
date: 2025-12-03T14:36:00.967-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Java"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This separation improves maintainability, testability, and scalability. A typical N-tier architecture includes a Presentation Tier (UI), a Business Logic Tier (application logic), and a Data Access Tier (database interaction).  This example demonstrates a simple 3-tier structure.  The `Main` class represents the presentation tier, calling methods from the `UserService` (business logic) which in turn uses `UserRepository` (data access). This adheres to Java's object-oriented principles by encapsulating concerns within classes and using interfaces for loose coupling.

```java
// UserRepository.java - Data Access Tier
interface UserRepository {
    User getUserById(int id);
}

class InMemoryUserRepository implements UserRepository {
    private final User user = new User(1, "John Doe");

    @Override
    public User getUserById(int id) {
        if (id == user.getId()) {
            return user;
        }
        return null;
    }
}

// UserService.java - Business Logic Tier
class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(int id) {
        return userRepository.getUserById(id);
    }
}

// User.java - Data Model
record User(int id, String name) {}

// Main.java - Presentation Tier
public class Main {
    public static void main(String[] args) {
        UserRepository userRepository = new InMemoryUserRepository();
        UserService userService = new UserService(userRepository);

        User user = userService.getUser(1);

        if (user != null) {
            System.out.println("User ID: " + user.id() + ", Name: " + user.name());
        } else {
            System.out.println("User not found.");
        }
    }
}
```