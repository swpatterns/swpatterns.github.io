
---
title: "Materialized View"
date: 2023-10-27T14:35:00-00:00
draft: false
pattern_types: ["behavioral", "performance"]
wikipedia: "https://en.wikipedia.org/wiki/Materialized_view"
diagramtype: "class"
diagram: "[Client] -- \"queries\" -> [MaterializedView] : reads data\n[MaterializedView] -- \"based on\" -> [SourceData] : periodic refresh\n[SourceData] -- \"updated by\" -> [DataProducer]"
code: true
---

The Materialized View pattern is a way to optimize read performance by precomputing and storing the results of complex or frequently used queries. Instead of re-executing these queries every time they are needed, the precomputed results are retrieved directly from the materialized view, dramatically reducing latency.  The view must be periodically refreshed to stay consistent with the underlying data, introducing a trade-off between read performance and data staleness.

## Usage

Materialized views are commonly used in scenarios where:

*   **Read-heavy applications:** Systems with a high volume of read requests and relatively infrequent writes benefit significantly.
*   **Complex queries:** Queries involving joins, aggregations, or calculations are slow to execute repeatedly.
*   **Reporting and Analytics:**  Generating reports or performing analytical queries on large datasets can be accelerated.
*   **Caching Aggregated Data:** Where fast access to aggregated representations of data is required, this pattern is effective.
*   **Data Warehousing:**  Used extensively in data warehousing for creating summary tables and optimizing query performance.

## Examples

*   **Google BigQuery:** BigQuery utilizes materialized views to accelerate query performance. Users can define materialized views on top of their base tables, and BigQuery automatically manages the refresh process, optimizing for cost and freshness. Queries that can leverage a materialized view are automatically rewritten to use it, resulting in faster execution times.

*   **Facebook's Hive:** Facebook uses materialized views extensively in its Hive data warehouse. They precompute aggregations of user activity data (e.g., daily active users, impressions per user) and store them in materialized views. This allows for rapid generation of reports and dashboards without impacting the performance of the core data processing pipelines.  They have developed systems to manage the consistency and refresh of these views at scale.

*   **Supabase:** Supabase, a Firebase alternative, uses materialized views to provide real-time data updates and efficient querying. They allow developers to define views that automatically update when the underlying data changes, providing a near real-time experience for users.
