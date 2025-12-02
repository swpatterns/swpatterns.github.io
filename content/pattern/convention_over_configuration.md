
---
title: Convention over Configuration
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "idiomatic"]
wikipedia: https://en.wikipedia.org/wiki/Convention_over_Configuration
diagramtype: "sequence"
diagram: """
sequenceDiagram
    participant Developer
    participant Framework

    Developer->>Framework: Develops application
    activate Framework
    Framework-->>Developer: Assumes default behaviors unless explicitly configured
    Developer->>Framework: Configures specific needs (optional)
    Framework-->>Developer: Applies configurations
    deactivate Framework
"""
code: true
---

Convention over Configuration (CoC) is an architectural and programming philosophy that aims to reduce the number of decisions that developers need to make, gaining simplicity. Instead of developers specifying every configuration detail, the software framework or library provides sensible defaults and requires developers to explicitly deviate from those defaults only when necessary. This minimizes boilerplate code, speeds up development, and improves consistency.

CoC promotes a clear and predictable structure, making code easier to understand and maintain. By reducing the need for extensive configuration, it lowers the cognitive load on developers, allowing them to focus on the unique aspects of their application rather than wrestling with framework intricacies. It also fosters better collaboration as developers have a shared understanding of how the system is supposed to operate.

## Usage

Convention over Configuration is widely used in modern frameworks and libraries to streamline development workflows. Common scenarios include:

*   **Web Application Frameworks:** Defining default routes based on controller and action names, naming conventions for models and views, and automatic data binding.
*   **ORM (Object-Relational Mapping) Tools:**  Mapping class names to database table names, property names to column names, and using primary keys based on naming patterns.
*   **Build Tools:** Applying default build processes, directory structures, and dependency resolution strategies.
*   **Testing Frameworks:** Expecting test methods to follow specific naming patterns, and automatically discovering tests.
*   **Logging Frameworks:** Adopting a predetermined log format and output destinations by default.

## Examples

*   **Ruby on Rails:** Rails heavily utilizes CoC.  For example, it assumes your database tables are named after your models (e.g., a `User` model corresponds to a `users` table) and uses a standard directory structure for controllers, models, views, and helpers.  Developers only need to explicitly configure deviations from these conventions.
*   **Django (Python Web Framework):** Django follows a similar approach. It encourages developers to organize their projects according to a specific structure and relies on defaults for settings, URLs, and template paths. This reduces the amount of configuration needed to get a basic web application up and running.
*   **Spring Boot (Java Framework)**: Spring Boot simplifies application development by embracing CoC. It automatically configures Spring based on the dependencies present in the project's classpath and provides sensible defaults for common tasks like database connection settings and web server configuration.  Developers can override these defaults when required using application properties or YAML files.
*   **Laravel (PHP Framework):** Laravel uses conventions throughout its architecture. Database migrations, Eloquent ORM relationships, and routing are all based on predefined patterns. This leads to consistent and predictable code, making it easier for developers to work on large projects.
