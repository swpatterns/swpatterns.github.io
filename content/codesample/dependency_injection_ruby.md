---
title: "Dependency Injection - Ruby"
date: 2025-12-03T11:21:35.433-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Ruby"]
---
Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. This promotes loose coupling, making the class more testable, reusable, and maintainable.  Our Ruby example demonstrates this.  Instead of the `ReportGenerator` creating a `DataSource` instance directly, we pass it in via the constructor.  This allows for injecting mock or stubbed data sources during testing. This approach aligns with Ruby’s emphasis on flexibility and testability, utilizing constructor arguments for dependency provision – a common and clear practice.

```ruby
# data_source.rb
class DataSource
  def data
    # Simulate fetching data from a database or API
    ['item1', 'item2', 'item3']
  end
end

# report_generator.rb
class ReportGenerator
  def initialize(data_source)
    @data_source = data_source
  end

  def generate_report
    data = @data_source.data
    "Report:\n#{data.join("\n")}"
  end
end

# Usage
data_source = DataSource.new
report_generator = ReportGenerator.new(data_source)
report = report_generator.generate_report
puts report

# Example with a Mock DataSource for testing
class MockDataSource
  def initialize(data)
    @data = data
  end

  def data
    @data
  end
end

mock_data = ['mock_item1', 'mock_item2']
mock_source = MockDataSource.new(mock_data)
mock_report_generator = ReportGenerator.new(mock_source)
mock_report = mock_report_generator.generate_report
puts mock_report
```