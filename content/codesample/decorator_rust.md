---
title: "Decorator - Rust"
date: 2025-12-03T11:40:17.137-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Rust"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  This implementation uses Rust's trait objects and the `Box` type to achieve this. We define a `Report` trait with a `display` method.  The `SimpleReport` is the concrete component.  `Decorator` is an abstract decorator that holds a reference to the report it decorates and delegates to it. `DetailedReport` adds extra information by wrapping a `Report` and extending its display functionality. This approach is idiomatic Rust because it leverages traits for polymorphism and `Box` for dynamic dispatch, avoiding concrete inheritance hierarchies.

```rust
// Define the component interface
trait Report {
    fn display(&self) -> String;
}

// Concrete component
struct SimpleReport {
    content: String,
}

impl SimpleReport {
    fn new(content: String) -> Self {
        SimpleReport { content }
    }
}

impl Report for SimpleReport {
    fn display(&self) -> String {
        self.content.clone()
    }
}

// The Decorator abstract class
trait Decorator: Report {
    fn get_component(&self) -> &dyn Report;
}

struct ConcreteDecorator<'a> {
    component: Box<dyn Report>,
    additional_info: String,
}

impl<'a> ConcreteDecorator<'a> {
    fn new(component: Box<dyn Report>, additional_info: String) -> Self {
        ConcreteDecorator { component, additional_info }
    }
}

impl<'a> Report for ConcreteDecorator<'a> {
    fn display(&self) -> String {
        self.component.display() + &self.additional_info
    }
}

// Concrete Decorator
struct DetailedReport<'a> {
    report: Box<dyn Report>,
}

impl<'a> DetailedReport<'a> {
    fn new(report: Box<dyn Report>) -> Self {
        DetailedReport { report }
    }
}

impl<'a> Report for DetailedReport<'a> {
    fn display(&self) -> String {
        format!("Detailed Report:\n{}", self.report.display())
    }
}

fn main() {
    let simple_report = Box::new(SimpleReport::new("This is the base report.".to_string()));

    let detailed_report = DetailedReport::new(simple_report);
    println!("{}", detailed_report.display());

    let decorated_report = ConcreteDecorator::new(Box::new(SimpleReport::new("Another report.".to_string())), " - with extra details!".to_string());
    println!("{}", decorated_report.display());
}
```