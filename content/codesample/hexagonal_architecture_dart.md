---
title: "Hexagonal Architecture - Dart"
date: 2025-12-03T14:11:40.655-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Dart"]
---
The Hexagonal Architecture (Ports and Adapters) aims to create loosely coupled software by isolating the core application logic from external concerns like databases, UI frameworks, or message queues. This is achieved through defining ports (interfaces) that the core application uses to interact with the outside world, and adapters that implement these ports to connect to specific technologies. Our Dart example demonstrates this by separating a `UserRepository` port from its `FirebaseUserAdapter` implementation, allowing the core `UserService` to remain independent of Firebase. The use of interfaces and dependency injection promotes testability and flexibility. This style is very idiomatic to Dart because of its strong support for interfaces and is often integrated with dependency injection frameworks like get_it.

```dart
// core_domain/user_service.dart
abstract class UserService {
  Future<String> getUserName(int userId);
}

// core_domain/user_repository.dart
abstract class UserRepository {
  Future<String> fetchUserName(int userId);
}

// infrastructure/firebase_user_adapter.dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';
import '../core_domain/user_repository.dart';

class FirebaseUserAdapter implements UserRepository {
  final FirebaseDatabase _database = FirebaseDatabase.instance;

  @override
  Future<String> fetchUserName(int userId) async {
    final snapshot = await _database.ref('users/$userId').child('name').get();
    return snapshot.value as String? ?? 'Unknown User';
  }
}

// application/user_service_implementation.dart
import '../core_domain/user_service.dart';
import '../core_domain/user_repository.dart';

class UserServiceImpl implements UserService {
  final UserRepository _userRepository;

  UserServiceImpl(this._userRepository);

  @override
  Future<String> getUserName(int userId) async {
    return _userRepository.fetchUserName(userId);
  }
}

// main.dart
import 'package:firebase_core/firebase_core.dart';
import 'application/user_service_implementation.dart';
import 'infrastructure/firebase_user_adapter.dart';

async void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  final userRepository = FirebaseUserAdapter();
  final userService = UserServiceImpl(userRepository);

  final userName = await userService.getUserName(123);
  print('User Name: $userName');
}
```