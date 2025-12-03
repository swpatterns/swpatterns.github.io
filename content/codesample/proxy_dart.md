---
title: "Proxy - Dart"
date: 2025-12-03T12:48:49.718-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Dart"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like lazy initialization, access control, or logging. In this Dart example, we have a `RealImage` which is resource-intensive to load. The `ImageProxy` acts as a proxy, delaying the loading of the `RealImage` until it's actually needed (i.e., when `display()` is called). This improves initial application startup time. The implementation uses Dart's class-based OOP and leverages the `display()` method to trigger the actual image loading. It's idiomatic Dart due to its clear class definitions and method overriding.

```dart
// Subject interface
abstract class Image {
  void display();
}

// Real Subject
class RealImage implements Image {
  final String filename;

  RealImage(this.filename) {
    // Simulate a long loading process
    print('Loading image from $filename...');
    // In a real application, this would actually load the image data.
  }

  @override
  void display() {
    print('Displaying image from $filename.');
  }
}

// Proxy
class ImageProxy implements Image {
  final String filename;
  RealImage? _realImage;

  ImageProxy(this.filename);

  @override
  void display() {
    if (_realImage == null) {
      _realImage = RealImage(filename);
    }
    _realImage!.display();
  }
}

// Client
void main() {
  final imageProxy = ImageProxy('high_resolution_image.jpg');
  imageProxy.display(); // Loads the image on first access
  imageProxy.display(); // Displays from cache
}
```