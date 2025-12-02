
---
title: Application Controller
date: 2024-02-29T17:38:00Z
draft: false
pattern_types: ["behavioral", "web"]
wikipedia: ""
diagramtype: "sequence"
diagram: "participant Application\nparticipant Controller\nparticipant View\nApplication->>Controller: Request\nController->>Controller: Handle Request\nController->>Application: Update Model\nController->>View: Select View\nView->>Controller: Return View\nController->>Application: Return Response"
code: true
---

The Application Controller pattern centralizes request handling logic within a dedicated controller class. It receives all incoming requests, coordinates the necessary actions to fulfill those requests (potentially involving multiple other objects or components), updates the application model, selects the appropriate view for the response, and ultimately returns that response to the client.  This pattern aims to decouple the presentation layer from the business logic and improve maintainability by consolidating request processing.

## Usage

This pattern is commonly used in web applications, particularly in Model-View-Controller (MVC) architectures, to manage user interactions and orchestrate the application's response. It's suitable where a single entry point for requests simplifies routing and control flow.  It aids in managing complex workflows, handling authentication/authorization centrally, and providing a clear separation of concerns. It can also be used in desktop applications with a GUI, though its application is strongest in web contexts.

## Examples

* **Ruby on Rails:** Rails is a classic example of the Application Controller pattern.  Every request in a Rails application is routed to a controller action. The controller then interacts with models to retrieve or update data, and finally renders a view. The `ApplicationController` class serves as the base for all other controllers, encapsulating common application-level logic.
* **Spring MVC (Java):** In Spring MVC, the `DispatcherServlet` acts as the Application Controller. It receives all incoming requests, maps them to the appropriate controller based on configuration, and then orchestrates the execution of the controller method.  The controller handles the business logic and returns a model and view, which the `DispatcherServlet` uses to render the final response.
