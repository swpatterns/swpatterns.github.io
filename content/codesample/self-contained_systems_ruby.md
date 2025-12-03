---
title: "Self-contained Systems - Ruby"
date: 2025-12-03T14:30:44.338-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Ruby"]
---
The Self-Contained System pattern promotes building modular, reusable components that encapsulate all their dependencies. Each system should have a clear interface and minimal external exposure. This fosters independence, simplifies testing, and reduces coupling.

Here, we model a simple `EmailService` as a self-contained system. It encapsulates its dependency on a message construction object (`EmailComposer`) *within* the service itself.  The external interface only requires specifying a recipient and subject; the internal composition of the email is handled transparently.

Ruby's strong support for composition and object instantiation lends itself naturally to this pattern.  The `EmailService` class directly creates the `EmailComposer` instance it needs, avoiding external dependency injection and keeping all related logic together. This approach is common in Ruby for creating focused, cohesive units of functionality.

```ruby
# lib/email_service.rb

class EmailComposer
  def compose(recipient, subject, body)
    "To: #{recipient}\nSubject: #{subject}\n\n#{body}"
  end
end

class EmailService
  def initialize
    @composer = EmailComposer.new
  end

  def send_email(recipient, subject, body)
    email_content = @composer.compose(recipient, subject, body)
    send_raw_email(email_content) # Simulate sending - replace with actual SMTP logic
    true # Indicate success
  end

  private

  def send_raw_email(content)
    puts "Sending email to:\n#{content}"
  end
end

# Example Usage:
if __FILE__ == $0
  service = EmailService.new
  service.send_email("user@example.com", "Hello", "This is the email body.")
end
```