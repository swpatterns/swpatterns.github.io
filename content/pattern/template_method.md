---
title: Template Method
date: 2024-02-29T16:23:00Z
draft: false
pattern_types: ["GOF", "behavioral"]
wikipedia: https://en.wikipedia.org/wiki/Template_method
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant AbstractClass
    participant ConcreteClassA
    participant ConcreteClassB

    AbstractClass ->> AbstractClass: templateMethod()
    AbstractClass ->> ConcreteClassA: doSomething()
    activate ConcreteClassA
    ConcreteClassA -->> AbstractClass: Result A
    deactivate ConcreteClassA
    AbstractClass ->> ConcreteClassB: doSomething()
    activate ConcreteClassB
    ConcreteClassB -->> AbstractClass: Result B
    deactivate ConcreteClassB
    AbstractClass -->> AbstractClass: finalize()
    "
code: true
---

The Template Method pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses. It allows one of the algorithm's steps to be overridden by a subclass without changing the algorithm's structure. This promotes code reuse and reduces redundancy by centralizing common logic while providing flexibility for specific variations.

This pattern is particularly useful when you have a process with several steps that are largely the same across different scenarios, but certain steps need to be customized. It’s also valuable when you want to enforce a specific order of operations, ensuring consistency while enabling extension.  The abstract class implements the overall algorithm, while concrete classes provide implementations for the abstract steps.

## Usage

The Template Method pattern is frequently used in scenarios like:

*   **Framework Development:**  Creating the basic structure of a framework where the core logic is defined, and clients fill in the specific details.
*   **Report Generation:**  Generating reports with a common format, but different sections depending on the type of report.
*   **Data Processing Pipelines:** Implementing a pipeline with stages that are consistent but have varying data transformation logic.
*   **Game Development:** Defining the basic flow of a game level, but allowing different levels to have their specific events or behaviors.

## Examples

1.  **Java I/O Streams:** The `InputStream` class in Java employs the Template Method pattern.  The `read()` method is the template method, defining the overall process of reading data.  Subclasses like `FileInputStream` and `ByteArrayInputStream` override the `read()` method to provide the specific implementation for reading from a file or a byte array, respectively. The core logic of handling buffering and error checking remains in the `InputStream` class.

2.  **Django’s Class-Based Views (CBVs):** Django’s CBVs use this pattern extensively. A base class like `View` defines the `as_get_view()`, `as_post_view()` methods (the template method) outlining the request handling process.  Then, different types of views (e.g., `DetailView`, `ListView`) inherit from `View` and override specific methods like `get()` or `post()` to perform tailored actions.  The overall request-response cycle is managed in the base `View` class, ensuring consistency across all views.

3.  **Scikit-learn Estimators:** In the Python machine learning library scikit-learn, estimators (like `LogisticRegression` or `DecisionTreeClassifier`) often follow the Template Method pattern. The `fit()` method is a template method that defines the learning process. Subclasses implement more specific fitting algorithms while relying on the common infrastructure and validation mechanisms defined in the base estimator class.