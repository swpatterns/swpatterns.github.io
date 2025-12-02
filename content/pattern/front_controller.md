
---
title: Front Controller
date: 2024-02-29T16:53:22-00:00
draft: false
pattern_types: ["behavioral", "web application"]
wikipedia: "https://en.wikipedia.org/wiki/Front_Controller"
diagramtype: "class"
diagram: "[Client] -- Request --> [FrontController]\n[FrontController] -- Route --> [HandlerA]\n[FrontController] -- Route --> [HandlerB]\n[HandlerA] -- Response --> [View]\n[HandlerB] -- Response --> [View]\n[View] -- Render --> [Client]\n[note: All requests pass through the FrontController {bg:lightskyblue}]"
code: true
---

The Front Controller pattern provides a centralized entry point for all requests coming into a web application. Instead of having each servlet or controller directly handle requests, all requests are initially dispatched to a single controller – the Front Controller. This controller then determines the appropriate handler to process the request, promoting a consistent application flow and simplifying management of complexity.

This pattern enables centralized processing of tasks common to all requests, such as authentication, authorization, logging, and input validation.  It decouples the request handling logic from the actual request processing, making the system more maintainable and extensible.  By managing the routing and preprocessing, the Front Controller can promote a cleaner separation of concerns and improve the overall architecture of a web application.

## Usage

The Front Controller pattern is commonly used in:

*   **Modern Web Frameworks:**  Frameworks like Spring MVC, Ruby on Rails, and Django utilize a front controller as the core of their request handling mechanism.
*   **Large-Scale Web Applications:** Applications with numerous functionalities and complicated routing needs benefit from the centralized control provided by this pattern.
*   **Security Management:**  Implementing security checks and policies is streamlined since all incoming requests are intercepted by a single point.
*   **Mobile Application Backends:** The same principle applies to handling requests from mobile clients through an API gateway acting as a front controller.

## Examples

*   **Spring MVC (Java):** In Spring MVC, `DispatcherServlet` acts as the Front Controller. It receives all incoming requests, maps them to specific controllers based on configuration, and then renders the appropriate view.  It also handles exception mapping, locale resolution, and other cross-cutting concerns.
*   **Ruby on Rails (Ruby):** Rails uses `application.rb` and routing configurations (`routes.rb`) to define a front controller, which directs requests to the appropriate controller actions. The `ActionDispatch` middleware stack serves as the implementation details of the Front Controller, handling various request phases.
*   **Apache HTTP Server with mod\_rewrite:** While not a framework, Apache's `mod_rewrite` module can be configured to act as a simple Front Controller. It intercepts all requests and rewrites them based on certain rules before sending them to the appropriate handler (e.g., a PHP script or a static file).
