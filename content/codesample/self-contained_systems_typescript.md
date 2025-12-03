---
title: "Self-contained Systems - TypeScript"
date: 2025-12-03T14:28:57.994-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["TypeScript"]
---
The Self-Contained Systems pattern advocates encapsulating a specific functionality within a single, independent component, handling all necessary dependencies internally. This promotes reusability, reduces coupling, and simplifies testing. Our TypeScript example creates a `SalesReportGenerator` class that encapsulates all logic for generating a sales report from a data source. It receives the raw data, calculates totals, and formats the report as a string, hiding implementation details from the consuming code.  This approach aligns with TypeScript’s class-based structure for encapsulation, using a dedicated class and internal methods to manage the report generation process without external interference, improving modularity and maintainability.

```typescript
// src/sales-report-generator.ts

class SalesReportGenerator {
  private data: { product: string; sales: number }[];

  constructor(data: { product: string; sales: number }[]) {
    this.data = data;
  }

  private calculateTotalSales(): number {
    return this.data.reduce((sum, item) => sum + item.sales, 0);
  }

  private formatReportData(): string {
    return this.data.map(item => `${item.product}: $${item.sales}`).join('\n');
  }

  public generateReport(): string {
    const totalSales = this.calculateTotalSales();
    const formattedData = this.formatReportData();

    return `
Sales Report:
----------------
${formattedData}
----------------
Total Sales: $${totalSales}
    `;
  }
}

// Example Usage (can be in a separate file)
const salesData = [
  { product: "Laptop", sales: 1200 },
  { product: "Keyboard", sales: 100 },
  { product: "Mouse", sales: 50 },
];

const reportGenerator = new SalesReportGenerator(salesData);
const report = reportGenerator.generateReport();
console.log(report);
```