---
title: "Clean Architecture - Dart"
date: 2025-12-03T14:20:11.559-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Dart"]
---
Clean Architecture aims to create systems independent of frameworks, databases, UI, and any external agency. It achieves this by organizing code into concentric layers: Entities (core business logic), Use Cases (application-specific logic), Interface Adapters (presenters, controllers, gateways), and Frameworks & Drivers (UI, databases). Dependencies point inwards – outer layers depend on inner layers, not the reverse. This makes the system testable, maintainable, and adaptable.

The Dart example below demonstrates a simplified Clean Architecture. `entities/user.dart` defines the core `User` entity. `use_cases/login.dart` contains the login use case, depending only on the entity. `interface_adapters/login_controller.dart` adapts the use case to a simple API. A `console_app.dart` represents the “Frameworks & Drivers” layer, handling user input and output in console format.  Dart’s strong typing and support for both OOP and functional paradigms make it well-suited for this structure. Dependency Injection is implied through constructor parameters, adhering to the dependency inversion principle.

```dart
// entities/user.dart
class User {
  final String username;
  final String password;

  User(this.username, this.password);

  bool isValidPassword(String password) {
    return this.password == password;
  }
}

// use_cases/login.dart
abstract class LoginUseCase {
  Future<User?> execute(String username, String password);
}

class LoginUseCaseImpl implements LoginUseCase {
  final List<User> users;

  LoginUseCaseImpl(this.users);

  @override
  Future<User?> execute(String username, String password) async {
    await Future.delayed(Duration.zero); // Simulate async operation
    for (final user in users) {
      if (user.username == username && user.isValidPassword(password)) {
        return user;
      }
    }
    return null;
  }
}


// interface_adapters/login_controller.dart
abstract class LoginController {
  Future<String> login(String username, String password);
}

class LoginControllerImpl implements LoginController {
  final LoginUseCase loginUseCase;

  LoginControllerImpl(this.loginUseCase);

  @override
  Future<String> login(String username, String password) async {
    final user = await loginUseCase.execute(username, password);
    if (user != null) {
      return 'Login successful for ${user.username}';
    } else {
      return 'Login failed';
    }
  }
}

// console_app.dart (Frameworks & Drivers)
import 'dart:io';

import 'package:clean_architecture_dart/entities/user.dart';
import 'package:clean_architecture_dart/use_cases/login.dart';
import 'package:clean_architecture_dart/interface_adapters/login_controller.dart';

void main() async {
  final users = [User('user1', 'pass1'), User('user2', 'pass2')];
  final loginUseCase = LoginUseCaseImpl(users);
  final loginController = LoginControllerImpl(loginUseCase);

  print('Enter username:');
  final username = stdin.readLineSync() ?? '';

  print('Enter password:');
  final password = stdin.readLineSync() ?? '';

  final result = await loginController.login(username, password);
  print(result);
}
```