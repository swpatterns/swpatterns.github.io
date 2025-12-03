---
title: "Layered Architecture - Dart"
date: 2025-12-03T14:07:16.069-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Dart"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application easier to maintain, test, and evolve. Common layers include Presentation (UI), Business Logic (domain), and Data Access (persistence).  Requests flow unidirectionally, typically from the Presentation layer down to the Data Access layer. This example demonstrates a simple layered structure for a hypothetical user management system. Dart's ability to handle both OOP and functional programming makes it suitable; this implements it using classes and interfaces for clear separation.

```dart
// lib/presentation/user_presenter.dart
abstract class UserPresenter {
  void displayUsers(List<User> users);
  void displayError(String message);
}

// lib/domain/user.dart
class User {
  final String id;
  final String name;

  User({required this.id, required this.name});
}

// lib/domain/user_use_case.dart
abstract class UserUseCase {
  Future<List<User>> getUsers();
}

// lib/data/user_repository.dart
abstract class UserRepository {
  Future<List<User>> fetchUsers();
}

// lib/data/user_repository_impl.dart
class UserRepositoryImpl implements UserRepository {
  // Simulate a data source (e.g., API call, database).
  @override
  Future<List<User>> fetchUsers() async {
    await Future.delayed(const Duration(milliseconds: 500)); // Simulate delay
    return [
      User(id: '1', name: 'Alice'),
      User(id: '2', name: 'Bob'),
    ];
  }
}

// lib/domain/user_use_case_impl.dart
class UserUseCaseImpl implements UserUseCase {
  final UserRepository userRepository;

  UserUseCaseImpl({required this.userRepository});

  @override
  Future<List<User>> getUsers() async {
    return userRepository.fetchUsers();
  }
}

// lib/presentation/user_presenter_impl.dart
class UserPresenterImpl implements UserPresenter {
  @override
  void displayUsers(List<User> users) {
    print('Displaying users:');
    for (var user in users) {
      print('${user.name} (ID: ${user.id})');
    }
  }

  @override
  void displayError(String message) {
    print('Error: $message');
  }
}

// lib/main.dart
import 'package:layered_architecture/presentation/user_presenter.dart';
import 'package:layered_architecture/domain/user_use_case.dart';
import 'package:layered_architecture/data/user_repository.dart';
import 'package:layered_architecture/data/user_repository_impl.dart';
import 'package:layered_architecture/domain/user_use_case_impl.dart';
import 'package:layered_architecture/presentation/user_presenter_impl.dart';

void main() async {
  // Assemble the layers
  final userRepository = UserRepositoryImpl();
  final userUseCase = UserUseCaseImpl(userRepository: userRepository);
  final userPresenter = UserPresenterImpl();

  // Interact through the presentation layer
  try {
    final users = await userUseCase.getUsers();
    userPresenter.displayUsers(users);
  } catch (e) {
    userPresenter.displayError(e.toString());
  }
}
```