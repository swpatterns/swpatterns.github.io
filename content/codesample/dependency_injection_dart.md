---
title: "Dependency Injection - Dart"
date: 2025-12-03T11:22:16.068-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Dart"]
---
Dependency Injection (DI) is a design pattern that promotes loose coupling by providing dependencies to a class instead of the class creating them itself. This improves testability, maintainability, and reusability.  The code demonstrates DI using constructor injection.  A `DataSource` interface defines a data retrieval contract, with a concrete `RemoteDataSource` implementation. The `Repository` class, instead of creating a `DataSource` itself, receives an instance of it through its constructor. This allows easy swapping of the data source – crucial for testing with mocks or providing different data in various environments. This approach is idiomatic Dart as it leverages interfaces and constructors for clear dependency management and testability, aligning with modern Dart development practices.

```dart
// Define the interface for the data source.
abstract class DataSource {
  Future<String> getData();
}

// Concrete implementation of the data source (e.g., fetching from a remote API).
class RemoteDataSource implements DataSource {
  @override
  Future<String> getData() async {
    await Future.delayed(Duration(seconds: 1)); // Simulate network delay
    return 'Data from the remote source!';
  }
}

// A mock DataSource for testing.
class MockDataSource implements DataSource {
  @override
  Future<String> getData() async {
    return 'Mock data for testing!';
  }
}

// Repository class that depends on a DataSource.
class Repository {
  final DataSource dataSource;

  // Constructor injection: receive the dependency.
  Repository(this.dataSource);

  Future<String> fetchData() async {
    return await dataSource.getData();
  }
}

// Example Usage
void main() async {
  // Inject the real data source.
  final remoteDataSource = RemoteDataSource();
  final repository = Repository(remoteDataSource);
  final data = await repository.fetchData();
  print('Real Data: $data');

  // Inject the mock data source (for testing).
  final mockDataSource = MockDataSource();
  final testRepository = Repository(mockDataSource);
  final testData = await testRepository.fetchData();
  print('Mock Data: $testData');
}
```