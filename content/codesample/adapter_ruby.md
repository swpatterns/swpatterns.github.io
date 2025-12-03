---
title: "Adapter - Ruby"
date: 2025-12-03T11:29:05.678-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Ruby"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. This allows classes with incompatible interfaces to collaborate. Our example adapts a `LegacyRectangle` class with a different area calculation method to the `GeometricShape` interface which requires a standardized `area` method. We achieve this with an `RectangleAdapter` class that wraps the `LegacyRectangle` and provides the required `area` method, calling the legacy class’s method internally. This implementation leans into Ruby’s duck typing, where method calls are executed if an object responds to them, rather than strict interface enforcement.

```ruby
# GeometricShape interface
module GeometricShape
  def area
    raise NotImplementedError
  end
end

# Legacy class with incompatible interface
class LegacyRectangle
  attr_reader :width, :height

  def initialize(width, height)
    @width = width
    @height = height
  end

  def calculate_area
    @width * @height
  end
end

# Adapter class
class RectangleAdapter
  include GeometricShape

  def initialize(legacy_rectangle)
    @legacy_rectangle = legacy_rectangle
  end

  def area
    @legacy_rectangle.calculate_area
  end
end

# Client code
legacy_rect = LegacyRectangle.new(5, 10)
adapter = RectangleAdapter.new(legacy_rect)

puts "Area of legacy rectangle (via adapter): #{adapter.area}"

# Example using another object that directly implements GeometricShape
class Square
  include GeometricShape

  def initialize(side)
    @side = side
  end

  def area
    @side * @side
  end
end

square = Square.new(4)
puts "Area of square: #{square.area}"
```