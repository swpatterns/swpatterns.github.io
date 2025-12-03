---
title: "Master-Slave - Ruby"
date: 2025-12-03T15:33:44.294-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Ruby"]
---
The Master-Slave pattern distributes work to multiple worker nodes (slaves) from a central coordinator (master). The master assigns tasks, and slaves execute them independently, reporting results back to the master. This boosts performance through parallelization. This Ruby implementation uses threads for the slaves and a queue to manage tasks. The `Master` class enqueues tasks, and `Slave` threads dequeue and process them. The use of `Queue` provides thread-safe communication. This approach leverages Ruby's concurrency features and is a common way to achieve parallelism in Ruby, fitting its flexible and expressive style.

```ruby
require 'thread'

class Master
  def initialize(num_slaves)
    @num_slaves = num_slaves
    @task_queue = Queue.new
    @results = []
    @slaves = []
  end

  def enqueue_task(task)
    @task_queue << task
  end

  def start
    @num_slaves.times do
      @slaves << Thread.new do
        loop do
          task = @task_queue.pop
          break if task == :done # Signal to terminate
          result = task.call
          @results << result
        end
      end
    end
  end

  def stop
    @num_slaves.times { @task_queue << :done }
    @slaves.each(&:join)
  end

  def get_results
    @results
  end
end

# Example Task (can be any callable object)
def example_task(number)
  sleep(0.1) # Simulate work
  number * 2
end

# Usage
master = Master.new(4) # 4 slaves
master.start

(1..10).each do |i|
  master.enqueue_task(lambda { example_task(i) })
end

master.stop
results = master.get_results
puts "Results: #{results}"
```