
---
title: HMVC
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "web"]
wikipedia: "https://en.wikipedia.org/wiki/Hierarchical_model%E2%80%93view%E2%80%93controller"
diagramtype: "class"
diagram: "[View] --|> [Controller] : handles\n[Controller] --|> [Model] : uses\n[Page] --|> [Controller] : contains\n[Page] --|> [View] : renders\n[Page] --|> [Model] : uses"
code: true
---

HMVC (Hierarchical Model-View-Controller) is a web application design pattern that structures a web application into three interconnected parts: the Model (data), the View (user interface), and the Controller (application logic).  It expands on the traditional MVC pattern by allowing views to *be* controllers, and controllers to contain other controllers and views, creating a hierarchical structure. This allows for modularity and reusability of UI components and their associated logic.

HMVC is particularly useful for building complex web applications with many interconnected views and controllers. It promotes code organization, simplifies maintenance, and enables the creation of reusable UI widgets or "portlets" that can be easily integrated into different parts of the application.  The hierarchical nature allows for a more natural representation of complex page layouts and interactions.

## Usage

*   **Web Portals/Dashboards:** HMVC is often used in web portals and dashboards where multiple independent widgets (each with their own Model, View, and Controller) are combined to create a single page.
*   **Large-Scale Web Applications:** When dealing with applications that have a significant number of pages and intricate user interfaces, organizing the codebase using HMVC can dramatically improve maintainability.
*   **Content Management Systems (CMS):** CMS platforms can leverage HMVC to allow developers to create and manage reusable content blocks and page templates.
*   **Dynamic Sections within a Page:** When a page is comprised of dynamically loaded or interactive sections, each section can be developed as a self-contained HMVC component.

## Examples

*   **CodeIgniter:** The CodeIgniter PHP framework natively supports HMVC through its "Widgets" or "Modules" feature. Developers can create self-contained modules representing a specific set of functionality, with their own models, views, and controllers.  These modules can be easily integrated into different areas of the application.
*   **Symfony's Form Component:** While not a strict HMVC implementation, Symfony’s form component exhibits HMVC principles.  The form itself can be considered a mini-controller managing input and validation (Controller).  The form's template (`.html.twig`) is the view (View), and the underlying Form object and associated data are the model. These components are seamlessly integrated into larger controllers to build complex forms.
*   **Laravel's Livewire:**  Livewire pieces together components using a MVC-inspired structure. A Livewire component has a model (component data), a view (Blade templates), and a controller (the component class with its methods).  These components can then be nested within other components, creating an HMVC-like hierarchy.
