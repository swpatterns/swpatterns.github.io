---
title: "Composite - Ruby"
date: 2025-12-03T11:37:18.769-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Ruby"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It defines a tree-like structure where each node can be either a leaf (individual object) or a branch (composite object containing other nodes). This removes the need for different code to handle individual objects versus groups of objects.

Here, we represent a file system. `Entry` is the base class, and `File` is a leaf node. `Directory` is a composite node that can contain other `Entry` objects (files and directories).  The `size` method is implemented in `Entry` and recursively calculates the total size in `Directory`, demonstrating the uniform interface. Ruby's dynamic dispatch and flexible object structure make this pattern a natural fit, avoiding the need for complex interfaces like in statically typed languages.

```ruby
# frozen_string_literal: true

class Entry
  def size
    raise NotImplementedError, "Subclasses must implement the 'size' method"
  end
end

class File < Entry
  def initialize(name, size)
    @name = name
    @size = size
  end

  def size
    @size
  end

  def to_s
    "File: #{@name} (#{@size} bytes)"
  end
end

class Directory < Entry
  def initialize(name)
    @name = name
    @entries = []
  end

  def add(entry)
    @entries << entry
  end

  def size
    @entries.sum(&:size)
  end

  def to_s
    "Directory: #{@name}\n#{@entries.map { |e| "  #{e}" }.join("\n")}"
  end
end

# Example Usage
root = Directory.new("root")
doc = Directory.new("documents")
root.add(doc)

file1 = File.new("report.txt", 1024)
file2 = File.new("notes.md", 512)
doc.add(file1)
doc.add(file2)

image = File.new("image.jpg", 2048)
root.add(image)

puts root
puts "Total size: #{root.size} bytes"
```