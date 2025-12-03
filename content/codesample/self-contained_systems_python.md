---
title: "Self-contained Systems - Python"
date: 2025-12-03T14:28:28.570-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Python"]
---
The Self-Contained Systems pattern aims to minimize dependencies between different parts of an application, making them easier to understand, test, and modify.  Each subsystem encapsulates all its dependencies and logic internally, exposing only a well-defined interface. This reduces the blast radius of changes and allows for independent evolution.

The Python example below demonstrates this through a `ReportGenerator` class which includes its own data source (a simple list), conversion logic, and formatting functions – isolating its operation. Rather than relying on global data structures or externally defined functions, all required functionality is bundled within the class. This aligns with Python's emphasis on encapsulation and clear module boundaries, making the component portable and maintainable.

```python
# report_generator.py

class ReportGenerator:
    """
    A self-contained system for generating reports from internal data.
    """

    def __init__(self, data):
        self.data = data

    def _convert_data(self):
        """Internal conversion logic."""
        return [str(x) for x in self.data]

    def _format_report(self, converted_data):
        """Internal formatting logic."""
        return "\n".join(converted_data)

    def generate_report(self):
        """Public interface to generate the report."""
        converted_data = self._convert_data()
        return self._format_report(converted_data)


if __name__ == "__main__":
    sample_data = [1, 2, 3, 4, 5]
    report_generator = ReportGenerator(sample_data)
    report = report_generator.generate_report()
    print(report)
```