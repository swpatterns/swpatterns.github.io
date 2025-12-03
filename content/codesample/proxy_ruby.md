---
title: "Proxy - Ruby"
date: 2025-12-03T12:48:14.023-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Ruby"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like remote access, security checks, or lazy loading.  Here, we have a `Book` class representing a resource and a `BookProxy` that intercepts requests to the `Book`. The proxy handles loading the book's content only when it's first accessed (lazy loading) and can potentially add logging or access control in a real-world scenario. This implementation is idiomatic Ruby due to its use of method missing (`method_missing`) for dynamic dispatch and the principle of "Don't Repeat Yourself" by delegating to the real subject when available.

```ruby
# frozen_string_literal: true

# Subject (Real Object)
class Book
  def initialize(title, content)
    @title = title
    @content = content
    puts "Loading book: #{@title}" # Simulate loading time
  end

  def read
    @content
  end
end

# Proxy
class BookProxy
  def initialize(title)
    @title = title
    @book = nil
  end

  def read
    @book ||= Book.new(@title, "This is the content of #{@title}.")
    @book.read
  end

  def method_missing(method_name, *args)
    if @book.nil?
      puts "Accessing method '#{method_name}' before book is loaded."
    else
      @book.send(method_name, *args)
    end
  end
end

# Client
proxy = BookProxy.new("The Ruby Way")
puts proxy.read
puts proxy.read # Content is cached, no reloading
# proxy.some_other_method # Demonstrates method_missing
```