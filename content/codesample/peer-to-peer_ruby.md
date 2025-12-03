---
title: "Peer-to-Peer - Ruby"
date: 2025-12-03T06:26:39.667-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Ruby"]
---
The Peer-to-Peer pattern establishes direct communication and data exchange between nodes (peers) in a network without relying on a central server. Each peer acts as both a client and a server, contributing resources and accessing resources from others. This example simulates a simple peer network using Ruby’s socket programming. Each peer can “publish” messages which are then broadcast to all connected peers. The implementation utilizes a separate thread for each connection to handle concurrent communication. This style is considered idiomatic Ruby due to its concise syntax and thread handling capabilities, promoting concurrent operations in a straightforward manner.

```ruby
require 'socket'
require 'thread'

class Peer
  def initialize(port)
    @port = port
    @server = TCPServer.new(@port)
    @peers = []

    start_listening
  end

  def start_listening
    puts "Peer listening on port #{@port}"
    loop do
      client = @server.accept
      thread = Thread.new(client) do |c|
        @peers << c
        puts "Peer connected: #{c.peeraddr[2]}" 

        begin
          while true
            message = c.gets.chomp
            break if message.nil? || message.empty?

            broadcast(message, c)
          end
        rescue => e
          puts "Error with client: #{e.message}"
        ensure
          @peers.delete(c)
          c.close
          puts "Peer disconnected: #{c.peeraddr[2]}"
        end
      end
    end
  end

  def broadcast(message, sender)
    @peers.each do |peer|
      next if peer == sender
      begin
        peer.puts message
      rescue => e
        puts "Error broadcasting to peer: #{e.message}"
        @peers.delete(peer)
      end
    end
  end
end

# Example Usage:
if __FILE__ == $0
  port = ARGV[0].to_i || 5000
  Peer.new(port)
end
```