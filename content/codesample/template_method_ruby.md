---
title: "Template Method - Ruby"
date: 2025-12-03T13:39:44.261-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Ruby"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and avoids duplication.

The Ruby code defines an abstract `Report` class with a `template_method` that outlines the report generation process. Concrete report types (`TextReport`, `HTMLReport`) inherit from `Report` and override the `output_body` and `output_header` methods to customize the report's content and format, respectively. The `template_method` in the base class controls the overall flow (header, body, footer), ensuring consistency while allowing for variation in the details. This leverages Ruby's inheritance and method overriding capabilities for a clean and flexible implementation.

```ruby
# report.rb

class Report
  def template_method
    output_header
    output_body
    output_footer
  end

  def output_header
    raise NotImplementedError, "Subclasses must implement output_header"
  end

  def output_body
    raise NotImplementedError, "Subclasses must implement output_body"
  end

  def output_footer
    puts "Report generated on #{Time.now}"
  end
end

class TextReport < Report
  def output_header
    puts "--- Text Report ---"
  end

  def output_body
    puts "This is the body of the text report."
    puts "It contains important information."
  end
end

class HTMLReport < Report
  def output_header
    puts "<html><head><title>HTML Report</title></head><body>"
  end

  def output_body
    puts "<h1>HTML Report</h1>"
    puts "<p>This is the body of the HTML report.</p>"
    puts "<p>It contains important information.</p>"
  end

  def output_footer
    puts "</body></html>"
  end
end

# Example Usage
text_report = TextReport.new
text_report.template_method

html_report = HTMLReport.new
html_report.template_method
```