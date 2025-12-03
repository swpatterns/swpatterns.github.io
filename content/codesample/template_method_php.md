---
title: "Template Method - PHP"
date: 2025-12-03T13:39:57.473-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["PHP"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and avoids duplication.

The PHP example defines an abstract `Report` class with a `displayReport()` template method. This method outlines the report generation process (title, data, footer).  Subclasses like `HtmlReport` and `PlainTextReport` implement the abstract `getData()` method to provide specific data formatting, customizing the report's content while maintaining the overall structure defined in the base class. This leverages PHP's abstract classes and method overriding for a clean and object-oriented implementation.

```php
<?php

abstract class Report {
  abstract protected function getData();

  public function displayReport() {
    $this->displayTitle();
    $data = $this->getData();
    $this->displayData($data);
    $this->displayFooter();
  }

  protected function displayTitle() {
    echo "<h1>Report Title</h1>\n";
  }

  abstract protected function displayData($data);

  protected function displayFooter() {
    echo "<p>Copyright 2023</p>\n";
  }
}

class HtmlReport extends Report {
  protected function getData() {
    return "<ul><li>Item 1</li><li>Item 2</li></ul>";
  }

  protected function displayData($data) {
    echo $data . "\n";
  }
}

class PlainTextReport extends Report {
  protected function getData() {
    return "Item 1\nItem 2\n";
  }

  protected function displayData($data) {
    echo $data . "\n";
  }
}

// Usage
$htmlReport = new HtmlReport();
$htmlReport->displayReport();

$plainTextReport = new PlainTextReport();
$plainTextReport->displayReport();

?>
```