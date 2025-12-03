---
title: "Pipes and Filters - Ruby"
date: 2025-12-03T15:21:53.870-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Ruby"]
---
The Pipes and Filters pattern consists of processing stages (filters) connected by channels (pipes). Each filter performs a specific transformation on the data, and passes the result to the next filter via the pipe. This promotes modularity, reusability, and simplifies complex processing pipelines.

The Ruby code demonstrates this by defining filters as methods and using method chaining (which acts as the "pipe") to pass data through them. Each method represents a filter – `extract_words`, `filter_long_words`, and `count_words`. The input string goes through these transformations sequentially. Ruby’s emphasis on functional programming and method chaining makes this a natural and readable way to implement the pattern, leveraging its expressive syntax. Using methods promotes code reuse and isolates concerns within each conversion step.

```ruby
# Pipes and Filters Pattern in Ruby

def extract_words(text)
  text.downcase.scan(/\b\w+\b/)
end

def filter_long_words(words, min_length)
  words.select { |word| word.length >= min_length }
end

def count_words(words)
  words.tally
end

text = "This is a Sample Text to demonstrate Pipes and Filters."

word_counts = text.to_s
                  .then { |t| extract_words(t) }
                  .then { |w| filter_long_words(w, 3) }
                  .then { |f| count_words(f) }

puts word_counts
```