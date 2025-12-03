---
title: "Layered Architecture - Java"
date: 2025-12-03T14:03:12.944-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Java"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application easier to maintain, test, and evolve. Common layers include Presentation, Business Logic, and Data Access.  Our Java example demonstrates this with `UserInterface`, `UserService`, and `UserRepository`.  `UserInterface` handles user input/output, `UserService` contains the core business rules related to users, and `UserRepository` interacts with a data source (simulated here with a simple list).  This implementation uses interfaces to further decouple layers, adhering to Java's dependency injection principles and promoting testability. It's a common and well-understood approach in Java enterprise applications.

```java
// User Interface Layer
interface UserInterface {
    void displayUser(User user);
    User getUserInput();
}

class ConsoleUserInterface implements UserInterface {
    @Override
    public void displayUser(User user) {
        System.out.println("User: " + user.getName() + ", Email: " + user.getEmail());
    }

    @Override
    public User getUserInput() {
        // Simulate user input
        return new User("John Doe", "john.doe@example.com");
    }
}

// Business Logic Layer
interface UserService {
    User createUser(User user);
    User getUser(String email);
}

class DefaultUserService implements UserService {
    private final UserRepository userRepository;

    public DefaultUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email);
    }
}

// Data Access Layer
interface UserRepository {
    User save(User user);
    User findByEmail(String email);
}

class InMemoryUserRepository implements UserRepository {
    private final List<User> users = new ArrayList<>();

    @Override
    public User save(User user) {
        users.add(user);
        return user;
    }

    @Override
    public User findByEmail(String email) {
        return users.stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst()
                .orElse(null);
    }
}

// Data Model
class User {
    private final String name;
    private final String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}

// Main Application
public class Main {
    public static void main(String[] args) {
        UserRepository userRepository = new InMemoryUserRepository();
        UserService userService = new DefaultUserService(userRepository);
        UserInterface userInterface = new ConsoleUserInterface();

        User newUser = userInterface.getUserInput();
        User createdUser = userService.createUser(newUser);
        userInterface.displayUser(createdUser);

        User retrievedUser = userService.getUser(newUser.getEmail());
        userInterface.displayUser(retrievedUser);
    }
}

import java.util.ArrayList;
import java.util.List;
```