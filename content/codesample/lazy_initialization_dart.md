---
title: "Lazy Initialization - Dart"
date: 2025-12-03T11:18:49.549-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Dart"]
---
The Lazy Initialization pattern delays the creation of an expensive object until its first use. This improves performance, especially if the object is not always needed. In Dart, this is commonly achieved using the `lazySet` or similar techniques within a class. The example below demonstrates this with a potentially resource-intensive `DatabaseConnection` class. The connection is not established until `connection` is accessed for the first time. This fits Dart's style by using getter-based access and concise syntax for initialization checks within the getter.

```dart
class DatabaseConnection {
  final String databaseUrl;

  DatabaseConnection(this.databaseUrl);

  // Simulate an expensive database connection process
  Future<String> establishConnection() async {
    print('Establishing database connection to $databaseUrl...');
    await Future.delayed(Duration(seconds: 2)); // Simulate delay
    print('Database connection established.');
    return 'Connected to $databaseUrl';
  }
}

class DataService {
  final String dbUrl;
  String? _connectionString;

  DataService(this.dbUrl);

  Future<String> get connection async {
    if (_connectionString == null) {
      final connection = DatabaseConnection(dbUrl);
      _connectionString = await connection.establishConnection();
    }
    return _connectionString!;
  }

  Future<void> fetchData() async {
    final conn = await connection;
    print('Fetching data using connection: $conn');
  }
}

void main() async {
  final service = DataService('mongodb://localhost:27017/mydatabase');

  // Connection is not established yet
  print('Service created, connection lazy-loaded.');
  
  // Connection established when accessed for the first time
  await service.fetchData();

  // Subsequent accesses use the existing connection
  await service.fetchData();
}
```