---
title: "Microkernel - Dart"
date: 2025-12-03T14:24:00.205-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Dart"]
---
The Microkernel pattern aims to build an application with a minimal core (the microkernel) and extend functionality through plug-ins or modules. This fosters modularity, extensibility, and isolation.

The Dart code demonstrates a simple microkernel architecture for processing different types of data. The `Microkernel` class defines the core interface – `process()`.  Concrete `Plugin` classes implement this interface to handle specific data types. The kernel dynamically loads and registers these plugins, delegating processing to them based on the data type. This approach aligns with Dart’s emphasis on strong typing and interfaces, promoting loose coupling and testability. Using a `Map` for plugin registration is a common and efficient Dart practice for this kind of dispatch.

```dart
// microkernel.dart
abstract class Microkernel {
  void registerPlugin(String type, Function plugin);
  dynamic process(String type, dynamic data);
}

// Plugin interface
abstract class Plugin {
  dynamic execute(dynamic data);
}

// Concrete plugins
class TextPlugin implements Plugin {
  @override
  String execute(dynamic data) {
    return 'Text Plugin: Uppercasing - ${data.toString().toUpperCase()}';
  }
}

class NumberPlugin implements Plugin {
  @override
  int execute(dynamic data) {
    return (data as int) * 2;
  }
}

class MicrokernelImpl implements Microkernel {
  final plugins = <String, Plugin>{};

  @override
  void registerPlugin(String type, Function plugin) {
    plugins[type] = plugin as Plugin();
  }

  @override
  dynamic process(String type, dynamic data) {
    return plugins[type]?.execute(data);
  }
}

// Usage
void main() {
  final microkernel = MicrokernelImpl();

  microkernel.registerPlugin('text', (dynamic data) => TextPlugin());
  microkernel.registerPlugin('number', (dynamic data) => NumberPlugin());

  print(microkernel.process('text', 'hello'));
  print(microkernel.process('number', 10));
  print(microkernel.process('unknown', 42)); // Returns null
}
```