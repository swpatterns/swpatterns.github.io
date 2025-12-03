---
title: "Self-contained Systems - Swift"
date: 2025-12-03T14:30:31.373-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Swift"]
---
The Self-Contained Systems pattern aims to reduce coupling by ensuring each system (or module) has everything it needs to operate – its data, dependencies, and logic – without relying excessively on external components. This fosters independence, testability, and reusability.

This Swift implementation models a `ReportGenerator` as a self-contained system. It includes a `DataSource` protocol to abstract data access but *also* provides a concrete `InMemoryDataSource` directly within the `ReportGenerator` struct.  This eliminates external dependency injection for a simple case, keeping the report generation logic bundled with its data source, making it easier to understand and deploy this specific functionality.  Using a `struct` and protocol-oriented programming aligns with Swift's emphasis on value types and flexibility.

```swift
// ReportGenerator.swift

// Protocol defining data source requirements
protocol DataSource {
    func fetchData() -> [String]
}

// Concrete data source implementation – kept within the system for simplicity.
struct InMemoryDataSource: DataSource {
    private let data: [String]

    init(data: [String]) {
        self.data = data
    }

    func fetchData() -> [String] {
        return data
    }
}

// The self-contained ReportGenerator system
struct ReportGenerator {
    private let dataSource: DataSource

    // The DataSource is initialized *within* the struct, making it self-contained.
    init() {
        self.dataSource = InMemoryDataSource(data: ["Data Point 1", "Data Point 2", "Data Point 3"])
    }

    func generateReport() -> String {
        let data = dataSource.fetchData()
        return "Report:\n" + data.joined(separator: "\n")
    }
}

// Example usage
let reportGenerator = ReportGenerator()
let report = reportGenerator.generateReport()
print(report)
```