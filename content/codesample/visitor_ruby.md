---
title: "Visitor - Ruby"
date: 2025-12-03T13:44:22.417-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Ruby"]
---
The Visitor pattern allows you to add new operations to a hierarchy of objects without modifying the objects themselves. It achieves this by defining a separate "visitor" class that implements the operation for each type of object in the hierarchy. The objects "accept" the visitor, allowing the visitor to perform its operation on them.

This Ruby implementation uses a simple `Element` hierarchy (Node, Leaf) and a `Visitor` interface with `visit_node` and `visit_leaf` methods. Each element type has an `accept` method that takes a visitor and calls the appropriate `visit_` method on it.  The `ConcreteVisitor` performs a specific operation (in this case, counting the number of nodes and leaves) and demonstrates how new operations can be added without altering the element classes.  Ruby's dynamic dispatch and duck typing make the Visitor pattern a natural fit, avoiding the need for explicit interface declarations.

```ruby
# Element interface
module Element
  def accept(visitor)
    raise NotImplementedError, "#{self.class} must implement #accept"
  end
end

# Concrete Element: Node
class Node
  include Element

  attr_reader :name, :children

  def initialize(name, children = [])
    @name = name
    @children = children
  end

  def accept(visitor)
    visitor.visit_node(self)
    @children.each { |child| child.accept(visitor) }
  end
end

# Concrete Element: Leaf
class Leaf
  include Element

  attr_reader :value

  def initialize(value)
    @value = value
  end

  def accept(visitor)
    visitor.visit_leaf(self)
  end
end

# Visitor interface
module Visitor
  def visit_node(node)
    raise NotImplementedError, "#{self.class} must implement #visit_node"
  end

  def visit_leaf(leaf)
    raise NotImplementedError, "#{self.class} must implement #visit_leaf"
  end
end

# Concrete Visitor: Counter
class Counter
  include Visitor

  attr_reader :node_count, :leaf_count

  def initialize
    @node_count = 0
    @leaf_count = 0
  end

  def visit_node(node)
    @node_count += 1
  end

  def visit_leaf(leaf)
    @leaf_count += 1
  end
end

# Usage example
node1 = Node.new("A", [Leaf.new(1), Node.new("B", [Leaf.new(2)])])
node2 = Node.new("C", [Leaf.new(3)])

counter = Counter.new
node1.accept(counter)
node2.accept(counter)

puts "Nodes: #{counter.node_count}"
puts "Leaves: #{counter.leaf_count}"
```