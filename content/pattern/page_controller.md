
---
title: Page Controller
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "web"]
wikipedia: ""
diagramtype: "sequence"
diagram: sequenceDiagram
    participant Client
    participant PageController
    participant View
    participant DataService
    Client->>PageController: Request Page
    PageController->>DataService: Fetch Data
    DataService-->>PageController: Data
    PageController->>View: Render Page with Data
    View-->>PageController: Rendered Page
    PageController-->>Client: Rendered Page
code: true
---

The Page Controller pattern is a simple and straightforward approach to handling user requests in web applications. It centralizes request handling logic within a controller, which is responsible for determining which data needs to be fetched, preparing the data, selecting the appropriate view, and rendering the final response. This promotes separation of concerns by isolating presentation logic from business logic and data access.

This pattern is particularly useful for applications with a relatively simple structure or when rapid development is prioritized. It's often a starting point for more complex architectures like MVC.  The controller acts as a mediator, preventing direct coupling between the user interface and underlying data sources.

## Usage

The Page Controller pattern is commonly used:

*   **Simple Web Applications:** Where the complexity of the application doesn't warrant a full-blown MVC framework.
*   **Rapid Prototyping:**  Quickly building and testing web interfaces with minimal overhead.
*   **Initial Stages of Development:**  As a foundation that can be refactored into a more structured architecture later.
*   **Small Websites:**  Static or dynamically generated sites with relatively few pages and data interactions.

## Examples

*   **PHP (Early Web Development):** Classic PHP websites often used a Page Controller pattern where each requested page (e.g., `about.php`, `contact.php`) corresponds to a controller script that fetches data (potentially from a database) and includes a view template to render the HTML.  This was a common practice before the widespread adoption of more elaborate frameworks.

*   **Ruby on Rails (Initial Setup):** While Rails is an MVC framework, the initial setup often resembles a Page Controller approach when creating basic routes and controller actions. Each action directly handles data retrieval and view rendering without significant model interaction Initially, a controller action might fetch all data needed for a view and pass it directly, eventually refactor to utilize models. This allows rapid development before introducing more abstraction.



