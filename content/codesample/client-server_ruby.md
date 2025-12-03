---
title: "Client-Server - Ruby"
date: 2025-12-03T14:35:01.751-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Ruby"]
---
The Client-Server pattern organizes a distributed application into two distinct parts: a server that provides a service or resource, and clients that request and consume that service.  This example uses Ruby’s `socket` library to create a simple TCP-based server and client. The server listens for connections, receives data, processes it (here, simply echoing it back), and sends a response. The client connects to the server, sends data, receives the response, and prints it.  This is common Ruby practice for networking tasks due to the library's stability and widespread use.  Separate files for client and server promote modularity.

```ruby
# server.rb
require 'socket'

server = Socket.tcp_server('localhost', 20000)

loop do
  client = server.accept
  puts "Accepted connection from: #{client.peeraddr[3]}"

  request = client.read
  puts "Request received: #{request}"

  response = "Echo: #{request}"
  client.write(response)
  client.close
  puts "Connection closed."
rescue => e
  puts "Error: #{e.message}"
end

# client.rb
require 'socket'

client = Socket.getaddrinfo('localhost', '20000', Socket::AF_INET, Socket::SOCK_STREAM).first

socket = Socket.new(client[0], client[1], client[2])

puts "Connected to server."

request = "Hello, Server!"
socket.write(request)

response = socket.read
puts "Response received: #{response}"

socket.close
puts "Connection closed."
```