---
title: "Flyweight - Ruby"
date: 2025-12-03T12:44:07.874-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Ruby"]
---
The Flyweight pattern aims to minimize memory usage by sharing common parts of objects. It's useful when dealing with a large number of similar objects. The pattern separates the object's state into intrinsic (shared) and extrinsic (unique) components.  Intrinsic state is stored in the flyweight object, while extrinsic state is passed as arguments when the flyweight is used.

This Ruby implementation represents trees where many leaves share the same properties (color, type). The `Leaf` class is the flyweight, storing only the intrinsic `color` and `type`.  The extrinsic `position` (x, y coordinates) is passed to the `draw` method.  The `Forest` class acts as the flyweight factory, managing and reusing `Leaf` instances. This is idiomatic Ruby due to its flexible object model and use of hashes for efficient storage and retrieval of shared objects.

```ruby
# Flyweight
class Leaf
  attr_reader :color, :type

  def initialize(color, type)
    @color = color
    @type = type
  end

  def draw(position)
    puts "Drawing leaf of type #{@type} with color #{@color} at position #{position}"
  end
end

# Flyweight Factory
class Forest
  def initialize
    @leaves = {}
  end

  def get_leaf(color, type)
    key = [color, type]
    @leaves[key] ||= Leaf.new(color, type)
  end
end

# Client
forest = Forest.new
positions = [[1, 2], [3, 4], [5, 6], [7, 8]]

positions.each do |pos|
  leaf = forest.get_leaf("green", "oak")
  leaf.draw(pos)

  leaf2 = forest.get_leaf("red", "maple")
  leaf2.draw(pos)
end
```