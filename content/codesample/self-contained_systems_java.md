---
title: "Self-contained Systems - Java"
date: 2025-12-03T14:28:15.981-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Java"]
---
The Self-Contained System pattern aims to create modules with minimal external dependencies, encapsulating all necessary resources within themselves. This improves portability, testability, and reduces potential conflicts when integrating with other systems. This Java example demonstrates this by creating a `CsvReportGenerator` class that includes its own CSV building logic and doesn’t rely on globally accessible data or external CSV libraries. The data it processes is passed in directly, and the output is a String, encouraging focused functionality and clear input/output. This approach is idiomatic for Java, as classes are designed to operate as independent units.

```java
// CsvReportGenerator.java
import java.util.List;

public class CsvReportGenerator {

    public String generateReport(List<ReportData> data) {
        if (data == null || data.isEmpty()) {
            return "";
        }

        StringBuilder csv = new StringBuilder();
        // Header
        csv.append("Name,Value\n");

        // Data Rows
        for (ReportData item : data) {
            csv.append(item.name).append(",").append(item.value).append("\n");
        }

        return csv.toString();
    }

    // Simple data class for demonstration
    public static class ReportData {
        public String name;
        public double value;

        public ReportData(String name, double value) {
            this.name = name;
            this.value = value;
        }
    }

    public static void main(String[] args) {
        CsvReportGenerator generator = new CsvReportGenerator();
        List<ReportData> reportData = List.of(
                new ReportData("MetricA", 123.45),
                new ReportData("MetricB", 67.89)
        );
        String report = generator.generateReport(reportData);
        System.out.println(report);
    }
}
```