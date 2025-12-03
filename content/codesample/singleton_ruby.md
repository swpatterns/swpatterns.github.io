---
title: "Singleton - Ruby"
date: 2025-12-03T11:07:06.329-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Ruby"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources like database connections, configuration settings, or a logger where multiple instances would be detrimental. 

The Ruby implementation uses a class variable `@@instance` to store the single instance. The `instance` class method acts as the global access point, creating and returning the instance only if it doesn't already exist.  This utilizes Ruby's meta-programming capabilities and inherent class-level method access, making it a concise and common approach to implementing the Singleton pattern.  Defining `private_class_method :new` prevents direct instantiation outside the class itself.

```ruby
# singleton.rb

module Singleton
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def instance
      @@instance ||= new
    end

    private_class_method :new
  end
end

class Configuration
  include Singleton

  def initialize
    @settings = {
      "api_key" => "your_api_key",
      "timeout" => 30
    }
  end

  def api_key
    @settings["api_key"]
  end

  def timeout
    @settings["timeout"]
  end
end

# Example Usage:
config1 = Configuration.instance
config2 = Configuration.instance

puts config1.object_id == config2.object_id #=> true
puts config1.api_key #=> your_api_key
```