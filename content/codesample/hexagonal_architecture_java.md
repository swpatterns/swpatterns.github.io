---
title: "Hexagonal Architecture - Java"
date: 2025-12-03T14:07:31.036-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Java"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by separating core business logic from external concerns like databases, UI, or messaging systems. This separation is achieved through defining *ports* (interfaces defining how the core interacts with the outside world) and *adapters* (implementations that connect the core to specific technologies).  The core, being agnostic to the implementation details of adapters, is easily testable and adaptable to different infrastructures.  This example simulates a simple user service, with ports for user storage and adapters for an in-memory implementation.

```java
// Core Business Logic (Independent of Frameworks/Drivers)
interface UserService {
    User getUser(String userId);
    void createUser(User user);
}

interface UserRepository {
    User findById(String id);
    void save(User user);
}

class DefaultUserService implements UserService {
    private final UserRepository userRepository;

    public DefaultUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUser(String userId) {
        return userRepository.findById(userId);
    }

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }
}

class User {
    String id;
    String name;

    public User(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() { return id; }
    public String getName() { return name; }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}

// Adapters (Implementations for Specific Technologies)
class InMemoryUserRepository implements UserRepository {
    private final Map<String, User> users = new HashMap<>();

    @Override
    public User findById(String id) {
        return users.get(id);
    }

    @Override
    public void save(User user) {
        users.put(user.getId(), user);
    }
}

// Application (Wiring)
public class HexagonalApp {

    public static void main(String[] args) {
        // Configure Adapters
        UserRepository userRepository = new InMemoryUserRepository();

        // Wire Core with Adapters
        UserService userService = new DefaultUserService(userRepository);

        // Use the service
        User user1 = new User("123", "Alice");
        userService.createUser(user1);
        System.out.println(userService.getUser("123"));
    }
}
```