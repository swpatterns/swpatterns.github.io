
---
title: Anti-Corruption Layer
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "integration", "DDD"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] -- AntiCorruptionLayer : Uses\n[AntiCorruptionLayer] -- [Application Domain] : Translates to\n[Application Domain] -- [Legacy System] : Uses\n[note: Legacy System may represent multiple systems {bg:lightyellow}]"
code: true
---

The Anti-Corruption Layer (ACL) is an architectural pattern used to isolate a core application from problematic or poorly understood external systems (often legacy systems). It acts as a translation layer, preventing the complexities, inconsistencies, and potential errors of the external system from polluting the domain model of the core application. The ACL ensures that the core application interacts with a clean, well-defined interface, shielding it from changes in the external system.

This pattern is crucial when integrating with systems that are difficult to modify, have unreliable data, or use conflicting concepts.  By containing the integration logic within the ACL, the core application remains robust and maintainable, even as the external system evolves.  The ACL focuses on fulfilling the core application's needs, rather than mirroring the external system's structure and behavior precisely.

## Usage

The Anti-Corruption Layer is commonly utilized in the following scenarios:

*   **Legacy System Integration:**  Integrating a modern application with older, monolithic systems where direct access to the database or internal logic is undesirable or impossible.
*   **Third-Party API Wrappers:**  When consuming external APIs that have poorly designed interfaces, inconsistent data formats, or rate limits that need to be managed.
*   **Microservice Communication:**  Acting as a facade or adapter between microservices with differing data models or communication protocols.  This is particularly useful during incremental migration to microservices.
*   **Data Migration:** A temporary layer is used to massage data during influx into a new system.

## Examples

*   **Rails ActiveModel Serializers with Legacy Database:** In Ruby on Rails, when integrating with a legacy database with a convoluted schema, `ActiveModel::Serializers` can form an ACL.  The serializer translates the legacy database records into a clean, simplified JSON representation tailored for the Rails application's API, hiding the database intricacies from the controllers and views.

*   **AWS Lambda with External SOAP Service:**  When exposing a RESTful API via AWS Lambda that needs to interact with an older SOAP web service, the Lambda function itself can act as the ACL. It receives REST requests, translates them into SOAP requests, calls the SOAP service, and then transforms the SOAP response into a JSON format suitable for the API consumer.  This prevents the need for the entire application stack to understand and handle SOAP.
