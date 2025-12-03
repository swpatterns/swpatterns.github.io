---
title: "N-tier - Dart"
date: 2025-12-03T14:40:50.775-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Dart"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application more maintainable, testable, and scalable. A typical N-tier architecture includes a presentation tier (UI), a business logic tier (application logic), and a data access tier (database interaction).

This Dart example demonstrates a simple 3-tier architecture for managing user data. The `User` class represents the data model. The `UserService` class encapsulates the business logic for user operations. Finally, the `UserRepository` class handles the data access, simulating database interaction with a simple in-memory list.  The separation into these classes, using Dart's class-based structure, is idiomatic.  Dependency Injection is used to loosely couple the tiers, making testing easier.  Asynchronous operations (`Future`) are used for data access, reflecting common Dart practices.

```dart
// lib/models/user.dart
class User {
  final String id;
  final String name;
  final String email;

  User({required this.id, required this.name, required this.email});
}

// lib/repositories/user_repository.dart
abstract class UserRepository {
  Future<User> getUserById(String id);
  Future<List<User>> getAllUsers();
  Future<User> createUser(User user);
}

class InMemoryUserRepository implements UserRepository {
  final List<User> _users = [
    User(id: '1', name: 'Alice', email: 'alice@example.com'),
    User(id: '2', name: 'Bob', email: 'bob@example.com'),
  ];

  @override
  Future<User> getUserById(String id) async {
    await Future.delayed(Duration(milliseconds: 50)); // Simulate DB delay
    return _users.firstWhere((user) => user.id == id);
  }

  @override
  Future<List<User>> getAllUsers() async {
    await Future.delayed(Duration(milliseconds: 50));
    return List.unmodifiable(_users);
  }

  @override
  Future<User> createUser(User user) async {
    await Future.delayed(Duration(milliseconds: 50));
    _users.add(user);
    return user;
  }
}

// lib/services/user_service.dart
abstract class UserService {
  Future<User> getUser(String id);
  Future<List<User>> getAllUsers();
  Future<User> createUser(String name, String email);
}

class DefaultUserService implements UserService {
  final UserRepository userRepository;

  DefaultUserService({required this.userRepository});

  @override
  Future<User> getUser(String id) async {
    return userRepository.getUserById(id);
  }

  @override
  Future<List<User>> getAllUsers() async {
    return userRepository.getAllUsers();
  }

  @override
  Future<User> createUser(String name, String email) async {
    final newUser = User(id: 'new-${_users.length}', name: name, email: email);
    return userRepository.createUser(newUser);
  }
}

// lib/main.dart
import 'package:n_tier_example/services/user_service.dart';
import 'package:n_tier_example/repositories/user_repository.dart';

void main() async {
  final userRepository = InMemoryUserRepository();
  final userService = DefaultUserService(userRepository: userRepository);

  final users = await userService.getAllUsers();
  print('All Users:');
  for (var user in users) {
    print('${user.name} (${user.email})');
  }

  final newUser = await userService.createUser('Charlie', 'charlie@example.com');
  print('\nCreated User: ${newUser.name} (${newUser.email})');

  final alice = await userService.getUser('1');
  print('\nUser Alice: ${alice.name} (${alice.email})');
}
```