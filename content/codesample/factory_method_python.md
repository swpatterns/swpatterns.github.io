---
title: "Factory Method - Python"
date: 2025-12-03T10:56:55.032-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Python"]
---
The Factory Method is a creational design pattern that provides an interface for creating objects but lets subclasses decide which class to instantiate. It promotes loose coupling by allowing the client to work with abstractions rather than concrete implementations.

This Python example defines an abstract `Document` class and concrete `MarkdownDocument` and `HTMLDocument` classes. The `DocumentFactory` abstract class has a `create_document` method that subclasses must implement to return a specific `Document` type. `MarkdownFactory` and `HTMLFactory` provide these implementations.  The client code requests a document through the factory interface without knowing the concrete document type being created. This aligns with Python's dynamic typing and emphasis on interfaces/abstract base classes for flexibility.

```python
from abc import ABC, abstractmethod

class Document(ABC):
    @abstractmethod
    def render(self):
        pass

class MarkdownDocument(Document):
    def render(self):
        return "Rendering as Markdown..."

class HTMLDocument(Document):
    def render(self):
        return "Rendering as HTML..."

class DocumentFactory(ABC):
    @abstractmethod
    def create_document(self):
        pass

class MarkdownFactory(DocumentFactory):
    def create_document(self):
        return MarkdownDocument()

class HTMLFactory(DocumentFactory):
    def create_document(self):
        return HTMLDocument()

def client_code(factory: DocumentFactory):
    document = factory.create_document()
    print(document.render())

if __name__ == "__main__":
    markdown_factory = MarkdownFactory()
    client_code(markdown_factory)

    html_factory = HTMLFactory()
    client_code(html_factory)
```