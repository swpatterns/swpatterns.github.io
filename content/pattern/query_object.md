---
title: Query Object
date: 2023-10-27T16:31:00-00:00
draft: false
pattern_types: ["behavioral", "data access"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client]--[Query] : asks for\n[Query]--[Data Source] : retrieves data\n[Data Source]--[Result] : returns"
code: true
---

The Query Object pattern encapsulates complex data retrieval logic into dedicated objects. Instead of scattering database or service queries throughout your application’s logic, you move them into these query objects. This promotes separation of concerns, making your domain models cleaner and more focused on their core responsibilities and enhancing testability.

This pattern is particularly useful when dealing with complex reports, filtered lists, or any data request that doesn’t fit neatly into simple CRUD operations.  It’s a common practice in applications that require flexible and customizable data access without tightly coupling those requirements to the entities themselves.

## Usage

*   **Complex Reporting:** Generating reports that require data from multiple tables or applying intricate filtering and aggregation logic.
*   **Read-Only Data Access:** Scenarios where you need to retrieve information without modifying the underlying data.
*   **API Endpoints:**  Implementing API endpoints that require specific data shaping or filtering before returning a response.
*   **Decoupling Data Access:** Separating data retrieval logic from domain models to improve maintainability and testability.

## Examples

*   **Ruby on Rails - Active Record Queries:** Rails' Active Record provides a query interface that can be seen as a form of Query Objects. You chain methods like `where`, `order`, `limit`, and `joins` onto a model class to build up complex queries without directly writing SQL.  For example: `User.where(active: true).order(created_at: :desc).limit(10)` encapsulates a specific data retrieval request.

*   **Symfony - Doctrine Repository:** In Symfony, Doctrine repositories are often used as Query Objects.  They encapsulate the logic for fetching entities from the database. You can define custom methods within the repository class that execute specific queries, like retrieving users by role or finding the latest posts for a given category.   Example:  `$this->getEntityManager()->createQueryBuilder() ->select('u') ->from(User::class, 'u') ->where('u.role = :role') ->setParameter('role', 'ADMIN') ->getQuery() ->getResult();`