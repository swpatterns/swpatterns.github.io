---
title: "Adapter - Dart"
date: 2025-12-03T11:29:44.752-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Dart"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. In this Dart example, we have a `LegacyPrinter` with a `printLegacy()` method and a `ModernPrinter` interface expecting `printModern()`. The `PrinterAdapter` adapts the `LegacyPrinter` to fulfill the `ModernPrinter` interface, enabling a `ModernPrintingService` to work with it. This follows Dart's use of interfaces (implemented by `implements`) and class composition to achieve adaptation.

```dart
// The target interface that clients can work with.
abstract class ModernPrinter {
  void printModern(String text);
}

// The legacy class with an incompatible interface.
class LegacyPrinter {
  void printLegacy(String text) {
    print('Legacy Printer: Printing - $text');
  }
}

// The adapter class that makes the legacy class compatible.
class PrinterAdapter implements ModernPrinter {
  final LegacyPrinter legacyPrinter;

  PrinterAdapter(this.legacyPrinter);

  @override
  void printModern(String text) {
    legacyPrinter.printLegacy(text);
  }
}

// Client code that uses the modern interface
class ModernPrintingService {
  void printDocument(ModernPrinter printer, String document) {
    print('Modern Printing Service: Preparing document...');
    printer.printModern(document);
    print('Modern Printing Service: Document printed.');
  }
}

void main() {
  final legacyPrinter = LegacyPrinter();
  final adapter = PrinterAdapter(legacyPrinter);
  final printingService = ModernPrintingService();

  printingService.printDocument(adapter, 'Hello, Adapted World!');
}
```