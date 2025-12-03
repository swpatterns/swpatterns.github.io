---
title: "Extension Object - PHP"
date: 2025-12-03T12:54:42.515-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["PHP"]
---
The Extension Object pattern allows you to add functionality to an existing object without modifying its core class. This is achieved by creating a separate "extension" object that holds the new functionality and operates on the original object. It promotes the Open/Closed Principle by allowing extension without modification.

The PHP example defines a `Document` class with basic properties. The `DocumentFormatter` extension object adds formatting capabilities (e.g., bolding) without altering the `Document` class itself.  The formatter receives a `Document` instance in its constructor and exposes methods that operate on that document. This approach is idiomatic PHP as it leverages loose coupling and allows for flexible, modular code.  It avoids inheritance, which can become rigid, and favors composition.

```php
<?php

class Document
{
    private string $content;

    public function __construct(string $content)
    {
        $this->content = $content;
    }

    public function getContent(): string
    {
        return $this->content;
    }
}

class DocumentFormatter
{
    private Document $document;

    public function __construct(Document $document)
    {
        $this->document = $document;
    }

    public function bold(): string
    {
        return '<b>' . $this->document->getContent() . '</b>';
    }

    public function italic(): string
    {
        return '<i>' . $this->document->getContent() . '</i>';
    }
}

// Example Usage
$doc = new Document("This is some text.");
$formatter = new DocumentFormatter($doc);

echo $formatter->bold() . "\n";
echo $formatter->italic() . "\n";

?>
```