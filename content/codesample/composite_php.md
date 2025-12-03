---
title: "Composite - PHP"
date: 2025-12-03T11:37:32.712-05:00
draft: false
pattern_usage: ["Composite"]
language: ["PHP"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It's useful when you have hierarchical structures where you want to perform the same operation on both individual elements and groups of elements.  Here, we represent a file system structure, with files and directories. Both files and directories 'display' themselves (their names/contents), but directories can contain other files or directories. The code utilizes interfaces for common operations and implements a tree-like structure through composition rather than inheritance, fundamental to the Composite pattern. This fits PHP’s flexible typing and interface-oriented approach.

```php
<?php

interface FileSystemNode {
  public function display(int $indent = 0): void;
}

class File implements FileSystemNode {
  private string $name;

  public function __construct(string $name) {
    $this->name = $name;
  }

  public function display(int $indent = 0): void {
    echo str_repeat(" ", $indent) . "- " . $this->name . "\n";
  }
}

class Directory implements FileSystemNode {
  private string $name;
  private array $children = [];

  public function __construct(string $name) {
    $this->name = $name;
  }

  public function add(FileSystemNode $node): void {
    $this->children[] = $node;
  }

  public function display(int $indent = 0): void {
    echo str_repeat(" ", $indent) . "+ " . $this->name . "\n";
    foreach ($this->children as $child) {
      $child->display($indent + 2);
    }
  }
}

// Example usage:
$root = new Directory("Root");
$root->add(new File("file1.txt"));

$subdir = new Directory("Subdirectory");
$subdir->add(new File("file2.txt"));
$subdir->add(new File("file3.txt"));

$root->add($subdir);
$root->add(new File("file4.txt"));

$root->display();

?>
```