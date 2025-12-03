---
title: "Service Locator - Ruby"
date: 2025-12-03T11:25:21.085-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Ruby"]
---
The Service Locator pattern provides a central point of access to various services within an application. Instead of a class directly creating or finding its dependencies, it asks the locator for them. This promotes loose coupling and makes it easier to swap implementations or manage dependencies.

The Ruby implementation uses a simple hash to store services, keyed by their symbolic names. The `ServiceLocator` class provides methods to register and retrieve services.  It’s idiomatic Ruby because it leverages hashes – a core data structure – for dependency management and utilizes simple method calls for interaction.  No complex class hierarchies are established as would be more common in statically typed languages. The focus is on conciseness and flexibility, in line with Ruby’s principles.

```ruby
# service_locator.rb

class ServiceLocator
  @@services = {}

  def self.register(name, service)
    @@services[name] = service
  end

  def self.resolve(name)
    raise ArgumentError, "Service not registered: #{name}" unless @@services.key?(name)
    @@services[name]
  end
end

# Example Services
class DatabaseConnection
  def connect
    puts "Connecting to the database..."
  end
end

class LoggerService
  def log(message)
    puts "[LOG] #{message}"
  end
end

# Register the services
ServiceLocator.register(:db, DatabaseConnection.new)
ServiceLocator.register(:logger, LoggerService.new)

# Resolve and use the services
db_connection = ServiceLocator.resolve(:db)
db_connection.connect

logger = ServiceLocator.resolve(:logger)
logger.log("Application started.")
```