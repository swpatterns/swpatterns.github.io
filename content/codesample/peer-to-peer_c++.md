---
title: "Peer-to-Peer - C++"
date: 2025-12-03T06:24:28.098-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["C++"]
---
The Peer-to-Peer (P2P) pattern establishes direct communication and resource sharing between nodes (peers) in a network without relying on a central server.  Each peer acts as both a client and a server. This implementation uses a simple TCP socket-based approach. Each peer listens for incoming connections while also proactively connecting to other peers specified at startup. Communication is done via shared strings, sent and received between peers. This design is purely illustrative and lacks robustness (error handling, security) for production. It leans heavily into standard C++ networking using sockets and threads, adhering to common practices for resource management and concurrency.

```cpp
#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <asio.hpp>

using asio::ip::tcp;

class Peer {
public:
    Peer(const std::string& address, const std::vector<std::string>& connect_to)
        : resolver_(asio::io_context_),
          socket_(resolver_),
          address_(address) {

        // Start listening thread
        listener_thread_ = std::thread([this]() { start_listen(); });

        // Connect to other peers
        for (const auto& peer_address : connect_to) {
            std::thread([this, peer_address]() { connect_to_peer(peer_address); }).detach();
        }
    }

    ~Peer() {
        socket_.close();
        listener_socket_.close();
        listener_thread_.join();
    }

private:
    void start_listen() {
        try {
            listener_socket_.open(tcp::endpoint(tcp::v4(), std::stoi(address_.substr(address_.find(':') + 1))) );
            resolver_.resolve(tcp::endpoint::address_v4(), "");
            asio::bind(listener_socket_, resolver_.result());
            listener_socket_.listen();

            std::cout << "Listening on port " << address_.substr(address_.find(':') + 1) << std::endl;

            while (true) {
                tcp socket(asio::io_context_);
                listener_socket_.accept(socket);
                std::thread([this, socket = std::move(socket)]() { handle_connection(socket); }).detach();
            }
        } catch (const std::exception& e) {
            std::cerr << "Exception in listener: " << e.what() << std::endl;
        }
    }

    void connect_to_peer(const std::string& peer_address) {
        try {
            tcp::resolver resolver(asio::io_context_);
            tcp::socket socket(asio::io_context_);
            tcp::resolver::results results = resolver.resolve(peer_address, std::to_string(address_.substr(address_.find(':') + 1)));
            asio::connect(socket, results.begin(), results.end());

            std::cout << "Connected to peer: " << peer_address << std::endl;

            handle_connection(std::move(socket));
        } catch (const std::exception& e) {
            std::cerr << "Exception connecting to " << peer_address << ": " << e.what() << std::endl;
        }
    }

    void handle_connection(tcp socket) {
        try {
            while (true) {
                char data[1024];
                size_t length = socket.read_some(asio::buffer(data));
                std::string message(data, length);
                std::cout << "Received: " << message << std::endl;

                // Echo back to the sender
                socket.write_some(asio::buffer(message));
            }
        } catch (const std::exception& e) {
            std::cerr << "Exception in connection handler: " << e.what() << std::endl;
        }
    }

    asio::ip::tcp::resolver resolver_;
    tcp socket_;
    std::string address_;
    tcp listener_socket_;
    std::thread listener_thread_;
};


int main() {
    std::string my_address = "127.0.0.1:8080";
    std::vector<std::string> peers = {"127.0.0.1:8081", "127.0.0.1:8082"};
    Peer peer(my_address, peers);

    // Keep main thread alive
    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return 0;
}
```