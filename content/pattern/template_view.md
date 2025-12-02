
---
title: Template View
date: 2024-02-29T16:32:53-00:00
draft: false
pattern_types: ["behavioral", "presentation"]
wikipedia: https://en.wikipedia.org/wiki/Template_method
diagramtype: "class"
diagram: "[View] --|> [TemplateView]\n[TemplateView] ..> [DataSource] : uses\n[TemplateView] ..> [Template] : applies\n[Template] --|> [ConcreteTemplate1]\n[Template] --|> [ConcreteTemplate2]"
code: true
---

The Template View pattern separates the data from how it is presented to the user. It defines a template that outlines the structure of the view, and then concrete view classes fill in the data into the template. This allows for consistent presentation across different data sources or view variations, while still providing flexibility in the specific content displayed.

This pattern is particularly useful in scenarios where you have a consistent layout for displaying data that changes frequently, or when you need to support multiple output formats (e.g., HTML, PDF, XML) from the same data. It promotes code reuse and maintainability by centralizing the presentation logic in the template.

## Usage

The Template View pattern is widely used in modern web development, particularly in server-side rendering frameworks. It's also common in report generation systems, data visualization tools, and any application where the presentation of data needs to be decoupled from the data itself.  It's a core concept in Model-View-Controller (MVC) and similar architectural patterns.

## Examples

1. **Django Templates (Python Web Framework):** Django uses a template engine to separate presentation from Python code. Template files contain placeholders for variables and control structures, and Django renders these templates with data passed from the view. The template defines the overall structure (HTML), while the view provides the specific data to populate it.

2. **Handlebars.js (JavaScript Templating Engine):** Handlebars allows developers to define reusable HTML templates with dynamic content.  You create a base template with placeholders (using double curly braces `{{ }}`) and then provide a data object to the template engine, which replaces the placeholders with the corresponding values. This is a direct implementation of the Template View pattern in a client-side JavaScript context.

3. **Thymeleaf (Java Templating Engine):** Thymeleaf is a server-side Java templating engine that allows embedding natural markup (HTML, XML, etc.) directly into the template files. Like Django and Handlebars, it separates the presentation logic from the application logic, enabling clean and maintainable codebases.
