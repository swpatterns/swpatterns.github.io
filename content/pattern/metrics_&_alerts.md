---
title: Metrics & Alerts
date: 2024-02-29T11:30:00-00:00
draft: false
pattern_types: ["observability", "monitoring", "operational"]
wikipedia: ""
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Application
    participant MetricsCollector
    participant AlertingSystem
    participant User

    Application->>MetricsCollector: Record metric (e.g., request latency)
    MetricsCollector->>+MetricsCollector: Aggregate/Process Metrics
    MetricsCollector->>AlertingSystem: Send metrics data
    AlertingSystem->>AlertingSystem: Evaluate against thresholds
    alt Threshold breached
        AlertingSystem->>User: Send Alert (e.g., email, PagerDuty)
    end
    User->>Application: Investigate/Resolve Issue

code: true
---

The Metrics & Alerts pattern is a fundamental aspect of operational monitoring and observability.  It involves collecting data points (metrics) from a system over time, aggregating or processing them, and then triggering notifications (alerts) when those metrics cross predefined thresholds. This allows operators to proactively identify and address issues, ensuring system reliability and performance.

This pattern isn’t about *solving* a problem in the application itself, but about *knowing* when a problem exists that *requires* attention. The collected metrics can range from simple resource usage statistics (CPU, memory) to application-specific key performance indicators (KPIs) like error rates, request latencies, or queue lengths. Effective alerting minimizes false positives while maximizing detection of genuine issues needing intervention.

## Usage

The Metrics & Alerts pattern is widely used in:

*   **Cloud Infrastructure Monitoring:** Tracking resource utilization, network performance, and service health within cloud environments (AWS, Azure, GCP).
*   **Application Performance Monitoring (APM):** Identifying bottlenecks and potential errors within application code and dependencies.
*   **Database Monitoring:**  Monitoring query performance, connection pools, and storage capacity in databases.
*   **Security Incident Detection:** Identifying unusual activity patterns indicative of potential security breaches.
*   **Business Activity Monitoring:** Tracking key business metrics to identify anomalies and opportunities.

## Examples

1.  **Prometheus and Alertmanager:** Prometheus is a popular open-source monitoring and alerting toolkit. It scrapes metrics from configured targets, stores them as time-series data, and provides a powerful query language (PromQL). Alertmanager handles alerts defined in Prometheus based on PromQL expressions, deduplicating, grouping, and routing them to various receivers like email, Slack, or PagerDuty.

2.  **Datadog:** A commercial monitoring and analytics platform. Datadog provides automated metric collection, log management, and alerting capabilities. Users can define custom monitors based on various metrics with flexible thresholds and notification channels.  It provides pre-built integrations with a vast array of services and technologies.

3.  **New Relic:** Similar to Datadog, New Relic offers a comprehensive suite of observability tools including metrics, tracing, and logging.  Alerting in New Relic (called “Conditions”) can be configured based on NRQL (New Relic Query Language) and automatically notifies designated users or integrations when set criteria are met.