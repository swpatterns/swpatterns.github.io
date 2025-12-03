---
title: "Shared-Nothing - Ruby"
date: 2025-12-03T15:14:13.343-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Ruby"]
---
The Shared-Nothing architecture aims for scalability and fault tolerance by distributing the entire dataset across multiple independent nodes, each with its own dedicated resources (CPU, memory, disk). Nodes communicate via messaging, avoiding shared memory or centralized coordination. This Ruby example simulates a simplified Shared-Nothing system using threads, each thread representing a node operating on a unique portion of data. The data is split into chunks, and each thread processes its chunk independently. Results are aggregated at the end without any shared state during processing. This is idiomatic Ruby due to its strong support for concurrency via threads and its flexible data handling.

```ruby
# frozen_string_literal: true

# A simplified Shared-Nothing example in Ruby using threads.
# Simulates processing a dataset across multiple independent nodes.

def process_chunk(chunk)
  # Simulate some processing on the chunk.
  chunk.map { |x| x * 2 }
end

def shared_nothing_processing(data, num_nodes)
  chunk_size = (data.size.to_f / num_nodes).ceil
  chunks = data.each_slice(chunk_size).to_a
  
  threads = []
  results = []

  chunks.each_with_index do |chunk, i|
    thread = Thread.new do
      processed_chunk = process_chunk(chunk)
      results[i] = processed_chunk
    end
    threads << thread
  end
  
  threads.each(&:join) # Wait for all threads to complete
  
  results.flatten
end

# Example usage:
data = (1..100).to_a
num_nodes = 4

processed_data = shared_nothing_processing(data, num_nodes)

puts "Original data: #{data[0..5]}"
puts "Processed data: #{processed_data[0..5]}"
```