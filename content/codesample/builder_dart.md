---
title: "Builder - Dart"
date: 2025-12-03T10:56:29.227-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Dart"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step-by-step. It allows the same construction process to create different representations of the object. This is useful when an object has many optional parameters or complex dependencies.

The Dart implementation uses a dedicated `Builder` class with setter methods for each part of the object being built. A separate `Director` class (optional, but good practice) orchestrates the building process.  The `build()` method in the builder returns the final constructed object. This approach is idiomatic Dart as it leverages classes and methods for structured object creation, and the fluent interface provided by the setters enhances readability.  Immutability is encouraged by returning a new instance of the object in the `build()` method.

```dart
// Product class
class Computer {
  final String cpu;
  final String ram;
  final String storage;
  final String gpu;
  final String monitor;

  Computer({
    required this.cpu,
    required this.ram,
    required this.storage,
    this.gpu = 'Integrated',
    this.monitor = 'None',
  });

  @override
  String toString() {
    return 'Computer(cpu: $cpu, ram: $ram, storage: $storage, gpu: $gpu, monitor: $monitor)';
  }
}

// Builder class
class ComputerBuilder {
  String _cpu = '';
  String _ram = '';
  String _storage = '';
  String _gpu = 'Integrated';
  String _monitor = 'None';

  ComputerBuilder setCpu(String cpu) {
    _cpu = cpu;
    return this;
  }

  ComputerBuilder setRam(String ram) {
    _ram = ram;
    return this;
  }

  ComputerBuilder setStorage(String storage) {
    _storage = storage;
    return this;
  }

  ComputerBuilder setGpu(String gpu) {
    _gpu = gpu;
    return this;
  }

  ComputerBuilder setMonitor(String monitor) {
    _monitor = monitor;
    return this;
  }

  Computer build() {
    return Computer(
      cpu: _cpu,
      ram: _ram,
      storage: _storage,
      gpu: _gpu,
      monitor: _monitor,
    );
  }
}

// Director (optional)
class ComputerDirector {
  final ComputerBuilder builder;

  ComputerDirector(this.builder);

  void constructBasicComputer() {
    builder
      .setCpu('Intel i5')
      .setRam('8GB')
      .setStorage('512GB SSD');
  }

  void constructGamingComputer() {
    builder
      .setCpu('Intel i7')
      .setRam('16GB')
      .setStorage('1TB SSD')
      .setGpu('Nvidia RTX 3070')
      .setMonitor('27" 144Hz');
  }
}

void main() {
  ComputerDirector director = ComputerDirector(ComputerBuilder());

  director.constructBasicComputer();
  Computer basicComputer = director.builder.build();
  print('Basic Computer: $basicComputer');

  director.constructGamingComputer();
  Computer gamingComputer = director.builder.build();
  print('Gaming Computer: $gamingComputer');

  //Directly using the builder
  Computer anotherComputer = ComputerBuilder()
    .setCpu('AMD Ryzen 5')
    .setRam('12GB')
    .setStorage('1TB HDD')
    .build();
  print('Another Computer: $anotherComputer');
}
```