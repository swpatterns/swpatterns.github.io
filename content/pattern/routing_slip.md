
---
title: Routing Slip
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "message"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant Request as R\n  participant Handler1 as H1\n  participant Handler2 as H2\n  participant Handler3 as H3\n  R->>H1: Send Request\n  H1->>H2: Forward Request\n  H2->>H3: Forward Request\n  H3->>H3: Process Request\n  alt Condition for alternative handler\n  H1->>H2:Alternative Forward Request\n  end"
code: true
---

The Routing Slip pattern facilitates the sequential passing of a request through a chain of responsibility. Each handler in the chain examines the request and either processes it or forwards it to the next handler.  Unlike the Chain of Responsibility pattern, the order in which handlers process the request is pre-defined and not based on type or conditions within the handlers themselves; it's a rigid route. This pattern allows complex workflows to be managed without tightly coupling the request to specific handlers.

## Usage

The Routing Slip pattern is commonly used in scenarios requiring a strict sequential processing order. Some use cases include:

*   **Approval Workflows:** Loan applications, expense reports, or similar processes that need to be approved by multiple individuals in a specific order.
*   **Document Processing Pipelines:** Steps like OCR, data extraction, validation, and archival can be orchestrated using a routing slip to ensure each step executes correctly and in the correct sequence.
*   **Order Fulfillment:** Stages like inventory check, payment processing, shipping label generation, and package dispatch can be handled in a stipulated order.
*   **Multi-step Form Processing:**  Each step in a complex form might need to be processed by a different module in a predefined fashion.

## Examples

1.  **Camunda BPMN Engine:**  Camunda uses a similar concept called "Sequence Flow" in BPMN (Business Process Model and Notation) diagrams. A process instance follows a defined sequence of tasks and events, effectively implementing a routing slip to orchestrate the business process. Each element in the process acts as a handler, processing the data and moving it to the next element in the defined flow.

2.  **AWS Step Functions:** AWS Step Functions allow developers to define state machines using JSON.  Each state in the machine represents a handler, and the transitions between states define the routing slip. It allows for complex workflows to be visually defined and executed reliably, ensuring each step is carried out in order.  Conditional branching can also be incorporated, but the fundamental structure maintains sequential processing.

3. **Ruby on Rails Callbacks:** Callbacks in Rails can act as a rudimentary routing slip. For instance, before saving a model, you can define a series of callbacks that are executed in the order they're defined: pre-validation checks, data transformation, auditing, and then finally the save operation.  While limited in flexibility compared to a full-fledged implementation, it demonstrates the core principle of sequential execution.
