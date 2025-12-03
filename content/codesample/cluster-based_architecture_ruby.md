---
title: "Cluster-based Architecture - Ruby"
date: 2025-12-03T15:18:24.015-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Ruby"]
---
The Cluster-based Architecture pattern distributes workload across multiple identical nodes (clusters) to improve performance, scalability, and fault tolerance. Each cluster handles a subset of the overall task. This example simulates a simple web request processing system with three clusters. A `RequestDistributor` directs requests to available clusters. Each `WorkerCluster` processes requests independently.  The implementation uses Ruby classes to represent the distributor and clusters, and a simple queue to hold requests.  This approach is idiomatic Ruby due to its object-oriented nature and emphasis on modularity and clear responsibility separation.  The use of classes allows for easy extension and configuration of the cluster system.

```ruby
# request_distributor.rb
require 'socket'

class RequestDistributor
  def initialize(clusters)
    @clusters = clusters
    @cluster_index = 0
  end

  def distribute_request(request)
    cluster = @clusters[@cluster_index]
    cluster.process_request(request)
    @cluster_index = (@cluster_index + 1) % @clusters.length
  end
end

# worker_cluster.rb
class WorkerCluster
  def initialize(id)
    @id = id
  end

  def process_request(request)
    puts "Cluster #{@id} processing request: #{request}"
    # Simulate processing time
    sleep(rand(0.1..0.5))
    puts "Cluster #{@id} finished processing request: #{request}"
  end
end

# main.rb
require_relative 'request_distributor'
require_relative 'worker_cluster'

cluster1 = WorkerCluster.new(1)
cluster2 = WorkerCluster.new(2)
cluster3 = WorkerCluster.new(3)

distributor = RequestDistributor.new([cluster1, cluster2, cluster3])

# Simulate incoming requests
10.times do |i|
  request = "Request #{i + 1}"
  distributor.distribute_request(request)
end
```