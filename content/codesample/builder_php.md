---
title: "Builder - PHP"
date: 2025-12-03T10:55:55.391-05:00
draft: false
pattern_usage: ["Builder"]
language: ["PHP"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. The pattern allows for the separation of construction from representation, so the same construction process can create different representations. This is useful when an object has many optional attributes, or when the construction process itself is complex.

The code defines a `Report` class representing the complex object. A `ReportBuilder` class provides a fluent interface to set various report sections (title, header, body, footer). The `build()` method finalizes the report construction.  A `ReportDirector` class orchestrates the building process, potentially using different builders to create different report types. This implementation is idiomatic PHP due to its use of classes, methods, and the fluent interface for configuration, aligning with common object-oriented practices in PHP.

```php
<?php

class Report
{
    private $title;
    private $header;
    private $body;
    private $footer;

    public function __construct(string $title, string $header, string $body, string $footer)
    {
        $this->title = $title;
        $this->header = $header;
        $this->body = $body;
        $this->footer = $footer;
    }

    public function __toString(): string
    {
        return "Report:\nTitle: {$this->title}\nHeader: {$this->header}\nBody: {$this->body}\nFooter: {$this->footer}\n";
    }
}

interface ReportBuilderInterface
{
    public function setTitle(string $title): self;
    public function setHeader(string $header): self;
    public function setBody(string $body): self;
    public function setFooter(string $footer): self;
    public function build(): Report;
}

class ReportBuilder implements ReportBuilderInterface
{
    private $title;
    private $header;
    private $body;
    private $footer;

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function setHeader(string $header): self
    {
        $this->header = $header;
        return $this;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;
        return $this;
    }

    public function setFooter(string $footer): self
    {
        $this->footer = $footer;
        return $this;
    }

    public function build(): Report
    {
        return new Report($this->title, $this->header, $this->body, $this->footer);
    }
}

class ReportDirector
{
    public function constructSimpleReport(ReportBuilder $builder): Report
    {
        return $builder->setTitle('Simple Report')
                       ->setHeader('Report Header')
                       ->setBody('Report Body')
                       ->setFooter('Report Footer')
                       ->build();
    }

    public function constructDetailedReport(ReportBuilder $builder): Report
    {
        return $builder->setTitle('Detailed Report')
                       ->setHeader('Detailed Report Header with more info')
                       ->setBody('Detailed Report Body with extensive data')
                       ->setFooter('Detailed Report Footer with copyright info')
                       ->build();
    }
}

// Usage
$builder = new ReportBuilder();
$director = new ReportDirector();

$simpleReport = $director->constructSimpleReport($builder);
echo $simpleReport . "\n";

$builder = new ReportBuilder(); // Reset builder for a new report
$detailedReport = $director->constructDetailedReport($builder);
echo $detailedReport . "\n";

?>
```