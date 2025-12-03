---
title: "Microkernel - Ruby"
date: 2025-12-03T14:23:16.069-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Ruby"]
---
The Microkernel pattern structures an application with a minimal core (the "kernel") and delegated functionality through plugins or extensions. This promotes modularity, flexibility, and ease of extension without modifying the core. Our Ruby example showcases this by defining a simple `Microkernel` class that accepts and manages plugins as blocks of code. Plugins are registered during initialization. The `run` method iterates through the registered plugins, executing each one. This fits Ruby’s nature well due to its block-centric approach and dynamic dispatch, offering conciseness and expressiveness when defining and executing plugins.

```ruby
# microkernel.rb
class Microkernel
  def initialize
    @plugins = []
  end

  def register_plugin(&plugin)
    @plugins << plugin
  end

  def run(data)
    @plugins.each do |plugin|
      data = plugin.call(data) if plugin
    end
    data
  end
end

# Example Plugins
plugin1 = ->(data) { data + 1 }
plugin2 = ->(data) { data * 2 }
plugin3 = ->(data) { "Result: #{data}" }

# Usage
kernel = Microkernel.new
kernel.register_plugin(&plugin1)
kernel.register_plugin(&plugin2)
kernel.register_plugin(&plugin3)

result = kernel.run(5)
puts result # Output: Result: 10
```