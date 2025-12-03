---
title: "Extension Object - C++"
date: 2025-12-03T12:53:11.140-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["C++"]
---
The Extension Object pattern allows you to extend the functionality of an existing class without modifying its code directly. This is achieved by creating a separate "extension" class that holds the new functionality and collaborates with the original class. The original class remains untouched, adhering to the Open/Closed Principle.

This C++ example demonstrates this by adding a 'format' capability to a simple 'Document' class using an 'HtmlFormatter' extension. The `Document` class doesn't know about HTML formatting; it simply accepts an `Formatter` object and delegates the formatting task. This keeps the `Document` class focused on its core responsibility and allows for easy addition of other formatters (e.g., `PlainTextFormatter`) without altering `Document`.  The use of polymorphism via the base `Formatter` class is a standard C++ approach for achieving extensibility.

```cpp
#include <iostream>
#include <string>

// Original class - Document
class Document {
public:
  Document(const std::string& content) : content_(content) {}

  std::string getContent() const { return content_; }

  std::string format(class Formatter& formatter) const {
    return formatter.format(content_);
  }

private:
  std::string content_;
};

// Extension Interface - Formatter
class Formatter {
public:
  virtual std::string format(const std::string& content) = 0;
  virtual ~Formatter() = default;
};

// Extension Class - HtmlFormatter
class HtmlFormatter : public Formatter {
public:
  std::string format(const std::string& content) override {
    return "<html><body><p>" + content + "</p></body></html>";
  }
};

// Client Code
int main() {
  Document doc("This is the document content.");
  HtmlFormatter htmlFormatter;

  std::string formattedDocument = doc.format(htmlFormatter);
  std::cout << formattedDocument << std::endl;

  return 0;
}
```