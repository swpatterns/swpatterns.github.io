---
title: "Onion Architecture - Dart"
date: 2025-12-03T14:16:05.246-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Dart"]
---
The Onion Architecture aims to achieve separation of concerns by organizing code into concentric layers. The innermost layer represents the core business logic (Entities), followed by Use Cases (interacting with Entities), then Interface Adapters (translating data between Use Cases and external frameworks), and finally, the outermost layer holds frameworks and drivers like databases, UI, or APIs. Dependencies point *inward* – outer layers depend on inner layers, but inner layers have no knowledge of the outer ones. This promotes testability and loose coupling.

The Dart example demonstrates a simplified onion architecture. `entities` define core business models. `use_cases` contain application-specific business rules operating on entities. `interface_adapters` map data between use cases and the external `main` layer, representing a console application for simplicity.  Data transfer objects (DTOs) help decouple entities from presentation. This structure favors composition over inheritance, a common Dart/Flutter practice, and allows for easy swapping of external dependencies (e.g., UI framework) without affecting core logic.

```dart
// entities/user.dart
class User {
  final String id;
  final String name;

  User({required this.id, required this.name});
}

// use_cases/get_user.dart
abstract class GetUserUseCase {
  Future<User?> getUser(String id);
}

class GetUser implements GetUserUseCase {
  final UserRepository userRepository;

  GetUser({required this.userRepository});

  @override
  Future<User?> getUser(String id) async {
    return await userRepository.findById(id);
  }
}

// interface_adapters/user_repository_interface.dart
abstract class UserRepository {
  Future<User?> findById(String id);
}

// interface_adapters/user_repository_impl.dart (Framework/Driver - e.g., a real database)
class UserRepositoryImpl implements UserRepository {
  // Simulate a database
  final Map<String, User> _users = {
    '1': User(id: '1', name: 'Alice'),
    '2': User(id: '2', name: 'Bob'),
  };

  @override
  Future<User?> findById(String id) async {
    await Future.delayed(Duration(milliseconds: 50)); // Simulate DB latency
    return _users[id];
  }
}

// Data Transfer Object (DTO) - simplifies data exchange
class UserDto {
  final String id;
  final String name;

  UserDto({required this.id, required this.name});

  factory UserDto.fromUser(User user) => UserDto(id: user.id, name: user.name);
}

// main.dart (Outer Layer - Frameworks & Drivers)
import 'package:onion_architecture_dart/use_cases/get_user.dart';
import 'package:onion_architecture_dart/interface_adapters/user_repository_impl.dart';
import 'package:onion_architecture_dart/interface_adapters/user_repository_interface.dart';
import 'package:onion_architecture_dart/entities/user.dart';

Future<void> main() async {
  final userRepository = UserRepositoryImpl();
  final getUserUseCase = GetUser(userRepository: userRepository);

  final user = await getUserUseCase.getUser('1');

  if (user != null) {
    final userDto = UserDto.fromUser(user);
    print('User ID: ${userDto.id}, Name: ${userDto.name}');
  } else {
    print('User not found');
  }
}
```