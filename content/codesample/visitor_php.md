---
title: "Visitor - PHP"
date: 2025-12-03T13:44:43.477-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["PHP"]
---
The Visitor pattern allows you to define a new operation without modifying the classes of the objects on which it operates. It's achieved by moving the operation to a separate "visitor" class that accepts different object types as input. This promotes the Open/Closed Principle.

The code defines a `Component` interface (representing elements in a structure) and concrete components like `Text` and `Image`.  A `Visitor` interface declares `visit` methods for each component type.  Concrete visitors, like `MarkdownVisitor`, implement these methods to perform specific operations. The `Client` code accepts a visitor and calls the `accept` method on each component, which then delegates to the appropriate `visit` method in the visitor. This is idiomatic PHP due to its interface-based approach and reliance on polymorphism.

```php
<?php

interface Component {
    public function accept(Visitor $visitor);
}

class Text implements Component {
    private string $content;

    public function __construct(string $content) {
        $this->content = $content;
    }

    public function getContent(): string {
        return $this->content;
    }

    public function accept(Visitor $visitor): void {
        $visitor->visitText($this);
    }
}

class Image implements Component {
    private string $url;

    public function __construct(string $url) {
        $this->url = $url;
    }

    public function getUrl(): string {
        return $this->url;
    }

    public function accept(Visitor $visitor): void {
        $visitor->visitImage($this);
    }
}

interface Visitor {
    public function visitText(Text $text): string;
    public function visitImage(Image $image): string;
}

class MarkdownVisitor implements Visitor {
    public function visitText(Text $text): string {
        return "**" . $text->getContent() . "**";
    }

    public function visitImage(Image $image): string {
        return "![Image]($" . $image->getUrl() . ")";
    }
}

class HtmlVisitor implements Visitor {
    public function visitText(Text $text): string {
        return "<p>" . $text->getContent() . "</p>";
    }

    public function visitImage(Image $image): string {
        return "<img src='" . $image->getUrl() . "' alt='Image'>";
    }
}


// Client code
class Document {
    private array $components = [];

    public function addComponent(Component $component): void {
        $this->components[] = $component;
    }

    public function render(Visitor $visitor): string {
        $result = "";
        foreach ($this->components as $component) {
            $result .= $component->accept($visitor) . "\n";
        }
        return $result;
    }
}

$document = new Document();
$document->addComponent(new Text("Hello, world!"));
$document->addComponent(new Image("https://example.com/image.jpg"));

$markdownVisitor = new MarkdownVisitor();
echo "Markdown:\n" . $document->render($markdownVisitor) . "\n";

$htmlVisitor = new HtmlVisitor();
echo "HTML:\n" . $document->render($htmlVisitor) . "\n";

?>
```