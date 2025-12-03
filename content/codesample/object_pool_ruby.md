---
title: "Object Pool - Ruby"
date: 2025-12-03T11:14:51.659-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Ruby"]
---
The Object Pool pattern manages a group of reusable objects, reducing the overhead of frequent object creation and destruction. This is particularly useful for expensive-to-create objects. This Ruby implementation uses a simple array to store a pool of `DatabaseConnection` objects.  `checkout` retrieves an available object (or creates one if the pool is empty). `checkin` returns an object to the pool for reuse.  Using an array and `pop`/`push` efficiently manages object availability, fitting Ruby’s dynamic nature.  The `Mutex` ensures thread safety when accessing the shared pool. It favors a pragmatic Ruby style, providing a basic reusable implementation.

```ruby
require 'mutex'

class DatabaseConnection
  def initialize
    # Simulate expensive connection setup
    sleep(0.5)
    puts "Establishing database connection..."
    @connected = true
  end

  def query(sql)
    puts "Executing query: #{sql}"
    # Simulate query execution
    sleep(0.1)
    "Query results"
  end

  def close
    @connected = false
    puts "Closing database connection..."
  end

  def connected?
    @connected
  end
end

class DatabaseConnectionPool
  def initialize(size = 5)
    @size = size
    @pool = []
    @mutex = Mutex.new
  end

  def checkout
    @mutex.synchronize do
      if @pool.empty?
        puts "Pool empty, creating new connection..."
        return DatabaseConnection.new
      else
        puts "Reusing connection from pool..."
        return @pool.pop
      end
    end
  end

  def checkin(connection)
    @mutex.synchronize do
      if connection.connected? == false
        puts "Connection is already closed. Discarding."
        return
      end
      @pool.push(connection)
      puts "Connection returned to pool. Pool size: #{@pool.size}"
    end
  end
end

# Example Usage
pool = DatabaseConnectionPool.new(2)

connection1 = pool.checkout
connection1.query("SELECT * FROM users")
pool.checkin(connection1)

connection2 = pool.checkout
connection2.query("SELECT * FROM products")
pool.checkin(connection2)

connection3 = pool.checkout #Might create a new connection, or reuse if available
connection3.query("UPDATE order SET status = 'shipped'")
pool.checkin(connection3)
```