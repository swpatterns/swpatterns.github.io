---
title: "Blackboard - Ruby"
date: 2025-12-03T15:25:59.357-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Ruby"]
---
The Blackboard pattern is a computational architecture for solving problems that can’t be solved with a deterministic algorithm. It consists of several knowledge sources (independent modules) that contribute to solving a problem by observing a shared data structure – the “blackboard”.  These sources react to changes on the blackboard, adding or modifying information.

This Ruby implementation simulates a simple Blackboard for recognizing patterns in data. `Blackboard` holds the current data. `KnowledgeSource` classes define rules to modify the blackboard. `DataProcessor` adds initial data and triggers the process. The `process` method in `DataProcessor` iterates, applying knowledge sources until a solution is found or a maximum iteration count is reached. This approach is idiomatic Ruby due to its emphasis on modularity and using objects to encapsulate behavior. The use of a hash for the blackboard aligns with Ruby’s flexible data structures.

```ruby
# blackboard.rb

class Blackboard
  attr_accessor :data

  def initialize
    @data = {}
  end
end

class KnowledgeSource
  def initialize(blackboard)
    @blackboard = blackboard
  end

  def apply
    raise NotImplementedError, "Subclasses must implement the 'apply' method"
  end
end

class PatternRecognizer < KnowledgeSource
  def initialize(blackboard)
    super
  end

  def apply
    if @blackboard.data[:numbers] && @blackboard.data[:numbers].is_a?(Array)
      if @blackboard.data[:numbers].include?(1) && @blackboard.data[:numbers].include?(2) && @blackboard.data[:numbers].include?(3)
        @blackboard.data[:pattern_found] = "Sequence 1, 2, 3 detected!"
        return true # Signal solution found
      end
    end
    false
  end
end

class NumberExtractor < KnowledgeSource
  def initialize(blackboard)
    super
  end

  def apply
    input_string = @blackboard.data[:input]
    if input_string
      numbers = input_string.scan(/\d+/).map(&:to_i)
      @blackboard.data[:numbers] = numbers
      return true
    end
    false
  end
end

class DataProcessor
  def initialize(blackboard)
    @blackboard = blackboard
    @knowledge_sources = []
  end

  def add_knowledge_source(source)
    @knowledge_sources << source
  end

  def process(input_data, max_iterations = 10)
    @blackboard.data[:input] = input_data
    iteration = 0

    while iteration < max_iterations
      changed = false
      @knowledge_sources.each do |source|
        if source.apply
          changed = true
        end
      end
      break if !changed

      iteration += 1
    end

    @blackboard.data
  end
end

# Example Usage
blackboard = Blackboard.new
processor = DataProcessor.new(blackboard)
processor.add_knowledge_source(NumberExtractor.new(blackboard))
processor.add_knowledge_source(PatternRecognizer.new(blackboard))

result = processor.process("This string contains the numbers 1, 2, and 3.")
puts result # Output: {:input=>"This string contains the numbers 1, 2, and 3.", :numbers=>[1, 2, 3], :pattern_found=>"Sequence 1, 2, 3 detected!"}

result2 = processor.process("The numbers are 4, 5, 6")
puts result2 # Output: {:input=>"The numbers are 4, 5, 6", :numbers=>[4, 5, 6]}
```