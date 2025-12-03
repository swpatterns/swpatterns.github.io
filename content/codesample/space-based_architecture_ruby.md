---
title: "Space-Based Architecture - Ruby"
date: 2025-12-03T14:59:35.449-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Ruby"]
---
The Space-Based Architecture pattern organizes code into loosely coupled, independent modules ("spaces") that communicate via a central "space" or message bus. This promotes modularity and allows components to be added, removed, or modified without impacting others. Our Ruby implementation uses a simple `EventBus` class to act as the central space. Modules register for and publish events to the bus.  This leverages Ruby’s flexible object model and emphasizes the “message passing” paradigm. The use of `observer` pattern for the modules’ lifecycle makes it idiomatic for Ruby’s event-driven nature.

```ruby
# event_bus.rb
class EventBus
  def initialize
    @observers = {}
  end

  def subscribe(event_name, observer)
    @observers[event_name] ||= []
    @observers[event_name] << observer
  end

  def publish(event_name, data)
    @observers[event_name]&.each { |observer| observer.update(data) }
  end
end

# module_a.rb
class ModuleA
  def initialize(event_bus)
    @event_bus = event_bus
    @event_bus.subscribe("data_received", self)
  end

  def update(data)
    puts "Module A received data: #{data}"
  end
end

# module_b.rb
class ModuleB
  def initialize(event_bus)
    @event_bus = event_bus
  end

  def send_data(data)
    @event_bus.publish("data_received", data)
  end
end

# main.rb
require_relative 'event_bus'
require_relative 'module_a'
require_relative 'module_b'

event_bus = EventBus.new
module_a = ModuleA.new(event_bus)
module_b = ModuleB.new(event_bus)

module_b.send_data("Hello from Module B!")
```