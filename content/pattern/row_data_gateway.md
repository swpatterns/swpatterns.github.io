
---
title: "Row Data Gateway"
date: 2023-10-27T10:30:00-00:00
draft: false
pattern_types: ["creational", "data access"]
wikipedia: "https://en.wikipedia.org/wiki/Gateway_pattern"
diagramtype: "class"
diagram: "[Client] --> [Gateway] : requests data\n[Gateway] --> [DB Table] : retrieves data\n[Gateway] --> [DB Table] : updates data\n[DB Table] -- data -- [Gateway]"
code: true
---

The Row Data Gateway pattern provides an interface to a database table. It encapsulates all the direct database access logic and exposes methods to perform operations on the table rows as objects. The gateway maps rows from one or more tables to objects, effectively presenting a higher-level, object-oriented view of the data.

This pattern is beneficial when working with legacy databases or when a simple, direct mapping between database rows and objects is sufficient. It minimizes the amount of code needed to interact with the database and simplifies access for the client, though it can lead to tight coupling between the application and the database schema.

## Usage

The Row Data Gateway is commonly used in:

*   **Legacy Systems:** Integrating with existing databases with limited or no ORM capabilities.
*   **Simple Data Models:** Applications with straightforward data relationships where the complexity of a full ORM is unnecessary.
*   **Performance-Critical Applications:**  Provides fine-grained control over SQL queries, enabling optimization for specific database systems.
*   **Data migration and ETL processes:** When reading and writing data efficiently to and from various sources.

## Examples

1.  **Ruby on Rails (ActiveRecord without Associations):** Before the widespread adoption of complex ActiveRecord associations, simple ActiveRecord models acted as Row Data Gateways for single tables. Each record instance directly represented a row in the database, and methods like `.find()`, `.create()`, `.update()`, and `.destroy()` translated to specific SQL queries on the corresponding table.

2.  **JDBC in Java:**  Using JDBC directly to interact with a database, you essentially implement a Row Data Gateway manually.  Code directly executes SQL queries and maps the `ResultSet` rows to Java objects. Libraries like Spring JDBC provide a layer of abstraction but still rely on the core principles of this pattern by handling database connections and result set mapping. 

java
public class CustomerGateway {
    private JdbcTemplate jdbcTemplate;

    public CustomerGateway(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Customer getCustomer(int id) {
        String sql = "SELECT * FROM Customers WHERE CustomerID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new CustomerRowMapper());
    }

    // other methods to insert/update/delete customers
}
