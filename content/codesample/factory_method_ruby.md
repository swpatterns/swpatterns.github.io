---
title: "Factory Method - Ruby"
date: 2025-12-03T10:59:26.492-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Ruby"]
---
The Factory Method pattern is a creational design pattern that defines an interface for creating an object, but lets subclasses decide which class to instantiate. This promotes loose coupling between the object creator and the concrete objects created.  The code demonstrates this with a `Document` class and concrete `MarkdownDocument` and `HTMLDocument` subclasses. A `DocumentFactory` class provides a `create_document` method. Subclasses like `MarkdownDocumentFactory` and `HTMLDocumentFactory` override this method to return instances of their respective document types. This aligns with Ruby's dynamic nature and utilizes inheritance effectively for customization.

```ruby
# document.rb
class Document
  def open
    raise NotImplementedError, "Subclasses must implement the 'open' method"
  end
end

class MarkdownDocument < Document
  def open
    puts "Opening Markdown document..."
  end
end

class HTMLDocument < Document
  def open
    puts "Opening HTML document..."
  end
end

# document_factory.rb
class DocumentFactory
  def create_document(type)
    raise NotImplementedError, "Subclasses must implement the 'create_document' method"
  end
end

class MarkdownDocumentFactory < DocumentFactory
  def create_document
    MarkdownDocument.new
  end
end

class HTMLDocumentFactory < DocumentFactory
  def create_document
    HTMLDocument.new
  end
end

# client.rb
class Client
  def initialize(factory)
    @factory = factory
  end

  def create_and_open
    document = @factory.create_document
    document.open
  end
end

# Usage:
markdown_factory = MarkdownDocumentFactory.new
client1 = Client.new(markdown_factory)
client1.create_and_open

html_factory = HTMLDocumentFactory.new
client2 = Client.new(html_factory)
client2.create_and_open
```