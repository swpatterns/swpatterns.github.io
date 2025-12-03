---
title: "Iterator - Ruby"
date: 2025-12-03T13:12:41.569-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Ruby"]
---
The Iterator pattern provides a way to access the elements of an aggregate object sequentially without exposing the underlying representation. It defines a standard interface for iterating through objects, allowing you to traverse elements without knowing precisely how they are stored.

The Ruby implementation utilizes `each` – a core method that embodies the Iterator pattern. The `MyCollection` class encapsulates the data, and `each` yields each element to a block, acting as the iterator. This is exceptionally Ruby-like, as iteration through collections is primarily achieved with blocks and `each`, promoting a concise and readable style.  We avoid explicit iterator classes as Ruby's built-in iteration mechanisms fully realize the pattern’s intent.

```ruby
# my_collection.rb

class MyCollection
  def initialize(items)
    @items = items
  end

  def each
    @items.each do |item|
      yield item
    end
  end
end

# Example Usage
collection = MyCollection.new([1, 2, 3, 4, 5])

puts "Iterating through the collection:"
collection.each do |item|
  puts "  Item: #{item}"
end

# Another example: collecting even numbers
even_numbers = []
collection.each do |item|
  even_numbers << item if item.even?
end

puts "Even numbers: #{even_numbers}"
```