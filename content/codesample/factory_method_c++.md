---
title: "Factory Method - C++"
date: 2025-12-03T10:57:51.400-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["C++"]
---
The Factory Method is a creational design pattern that provides an interface for creating objects but lets subclasses decide which class to instantiate. It promotes loose coupling by abstracting the object creation process. This example demonstrates a `Document` base class and concrete document types like `PDFDocument` and `WordDocument`. The `DocumentFactory` provides a method to create documents, and subclasses like `PDFDocumentFactory` and `WordDocumentFactory` override this method to return specific document types. This adheres to C++'s principles of polymorphism and abstraction through virtual functions and inheritance.

```cpp
#include <iostream>
#include <string>

// Product
class Document {
public:
  virtual void open() = 0;
  virtual void save() = 0;
  virtual ~Document() = default;
};

// Concrete Products
class PDFDocument : public Document {
public:
  void open() override {
    std::cout << "Opening PDF document." << std::endl;
  }
  void save() override {
    std::cout << "Saving PDF document." << std::endl;
  }
};

class WordDocument : public Document {
public:
  void open() override {
    std::cout << "Opening Word document." << std::endl;
  }
  void save() override {
    std::cout << "Saving Word document." << std::endl;
  }
};

// Creator
class DocumentFactory {
public:
  virtual Document* createDocument() = 0;
  virtual ~DocumentFactory() = default;
};

// Concrete Creators
class PDFDocumentFactory : public DocumentFactory {
public:
  Document* createDocument() override {
    return new PDFDocument();
  }
};

class WordDocumentFactory : public DocumentFactory {
public:
  Document* createDocument() override {
    return new WordDocument();
  }
};

// Client
int main() {
  DocumentFactory* pdfFactory = new PDFDocumentFactory();
  Document* pdfDoc = pdfFactory->createDocument();
  pdfDoc->open();
  pdfDoc->save();
  delete pdfDoc;
  delete pdfFactory;

  DocumentFactory* wordFactory = new WordDocumentFactory();
  Document* wordDoc = wordFactory->createDocument();
  wordDoc->open();
  wordDoc->save();
  delete wordDoc;
  delete wordFactory;

  return 0;
}
```