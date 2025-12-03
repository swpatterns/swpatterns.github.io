---
title: "Service Locator - Dart"
date: 2025-12-03T11:26:09.726-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Dart"]
---
The Service Locator pattern provides a centralized way to access services within an application. Instead of a component directly creating or finding its dependencies, it asks a locator to provide them. This promotes loose coupling and makes testing easier because dependencies can be swapped out. In Dart, this is often implemented as a simple class with a map to store services, accessed via string keys. The code utilizes a singleton pattern for the locator itself, a common practice in Dart for global points of access.

```dart
// service_locator.dart

import 'package:flutter/foundation.dart';

abstract class Service {}

class AnalyticsService implements Service {
  void trackEvent(String eventName) {
    print('Tracking event: $eventName');
  }
}

class ConfigurationService implements Service {
  String get apiUrl => 'https://example.com/api';
}


class ServiceLocator {
  static final ServiceLocator _instance = ServiceLocator._internal();

  factory ServiceLocator() {
    return _instance;
  }

  ServiceLocator._internal();

  final Map<String, Service> _services = {};

  void register<T extends Service>(String key, T service) {
    _services[key] = service;
  }

  T get<T extends Service>(String key) {
    final service = _services[key];
    if (service == null) {
      throw ArgumentError('Service not found with key: $key');
    }
    return service as T;
  }

  void unregister(String key) {
    _services.remove(key);
  }
}

// Example Usage (in main.dart or another file)
void main() {
  final locator = ServiceLocator();
  locator.register<AnalyticsService>('analytics', AnalyticsService());
  locator.register<ConfigurationService>('config', ConfigurationService());

  final analytics = locator.get<AnalyticsService>('analytics');
  analytics.trackEvent('App Started');

  final config = locator.get<ConfigurationService>('config');
  print('API URL: ${config.apiUrl}');
}
```