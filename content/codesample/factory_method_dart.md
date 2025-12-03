---
title: "Factory Method - Dart"
date: 2025-12-03T11:00:12.200-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Dart"]
---
The Factory Method pattern is a creational pattern that lets a class defer instantiation to subclasses. It defines an interface for creating an object, but lets subclasses alter the type of objects that will be created. This promotes loose coupling and extensibility, allowing you to add new product types without modifying the core creating class.

This Dart example showcases a `Document` abstract class and concrete implementations `MarkdownDocument` and `HtmlDocument`. The `DocumentFactory` class uses a factory method, `createDocument()`, to determine which concrete document type to instantiate based on a provided type string. This design is idiomatic Dart as it leverages abstract classes and factory constructors to manage object creation and maintain flexibility, a common approach in Dart's object-oriented structure.

```dart
abstract class Document {
  String getContent();
}

class MarkdownDocument implements Document {
  final String content;
  MarkdownDocument(this.content);

  @override
  String getContent() => 'Markdown: $content';
}

class HtmlDocument implements Document {
  final String content;
  HtmlDocument(this.content);

  @override
  String getContent() => 'HTML: $content';
}

class DocumentFactory {
  Document createDocument(String type, String content) {
    switch (type) {
      case 'markdown':
        return MarkdownDocument(content);
      case 'html':
        return HtmlDocument(content);
      default:
        throw ArgumentError('Unsupported document type: $type');
    }
  }
}

void main() {
  final factory = DocumentFactory();

  final markdownDoc = factory.createDocument('markdown', 'This is markdown content.');
  print(markdownDoc.getContent());

  final htmlDoc = factory.createDocument('html', '<h1>This is HTML content.</h1>');
  print(htmlDoc.getContent());

  // Should throw an error
  // factory.createDocument('pdf', 'Some PDF content');
}
```