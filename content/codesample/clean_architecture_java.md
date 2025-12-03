---
title: "Clean Architecture - Java"
date: 2025-12-03T14:16:24.901-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Java"]
---
The Clean Architecture pattern aims to create systems independent of frameworks, databases, UI, and any external agency. It achieves this through layered architecture with an "inward rule" – dependencies point only inwards. The core business logic (Entities and Use Cases) resides in the inner layers, while outer layers (Interface Adapters & Frameworks and Drivers) contain implementation details. This promotes testability, maintainability, and flexibility.

The provided Java example demonstrates a simplified Clean Architecture for a user data management system. The `entities` package contains the `User` entity. `usecases` define the core business logic like `RegisterUser`.  The `interfaceadapters` package features a `UserPresenter` which adapts data for presentation, and a `UserGateway` interface defining data access.  Finally, `frameworks` includes a concrete `UserRepository` implementation using an in-memory data store and a simple CLI `Main` class acting as the driver. Dependency Injection is used to decouple layers. This structure aligns with Java's packaging conventions and OOP principles, enhancing readability and scalability.

```java
// entities/User.java
package entities;

public class User {
    private final String username;
    private final String email;

    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

// usecases/RegisterUser.java
package usecases;

import entities.User;
import interfaces.UserGateway;

public class RegisterUser {
    private final UserGateway userGateway;

    public RegisterUser(UserGateway userGateway) {
        this.userGateway = userGateway;
    }

    public boolean register(String username, String email) {
        User newUser = new User(username, email);
        return userGateway.saveUser(newUser);
    }
}

// interfaceadapters/UserPresenter.java
package interfaceadapters;

import entities.User;

public class UserPresenter {
    public static String presentUser(User user) {
        return "Username: " + user.getUsername() + ", Email: " + user.getEmail();
    }
}

// interfaces/UserGateway.java
package interfaces;

import entities.User;

public interface UserGateway {
    boolean saveUser(User user);
    User getUserByUsername(String username);
}

// frameworks/UserRepository.java
package frameworks;

import entities.User;
import interfaces.UserGateway;
import java.util.HashMap;
import java.util.Map;

public class UserRepository implements UserGateway {
    private final Map<String, User> users = new HashMap<>();

    @Override
    public boolean saveUser(User user) {
        if (users.containsKey(user.getUsername())) {
            return false;
        }
        users.put(user.getUsername(), user);
        return true;
    }

    @Override
    public User getUserByUsername(String username) {
        return users.get(username);
    }
}

// frameworks/Main.java
package frameworks;

import usecases.RegisterUser;

public class Main {
    public static void main(String[] args) {
        UserRepository userRepository = new UserRepository();
        RegisterUser registerUser = new RegisterUser(userRepository);

        boolean registered = registerUser.register("john.doe", "john.doe@example.com");
        if (registered) {
            System.out.println("User registered successfully!");
        } else {
            System.out.println("User registration failed.");
        }
    }
}
```