---
title: "Client-Server - C++"
date: 2025-12-03T14:33:12.520-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["C++"]
---
The Client-Server pattern decouples a service provider (Server) from its consumers (Clients). The Server exposes functionalities, and Clients request those functionalities without needing to know the Server’s internal workings.  This example uses basic sockets for communication. The Server listens for connections, receives messages, processes them (echoing them back in this case), and sends responses. The Client connects to the Server, sends a message, and receives the Server's response. This follows C++'s typical network programming approach using system calls for socket management, which is a common and efficient pattern.

```cpp
#include <iostream>
#include <string>
#include <cstring>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

// Server code
void run_server() {
  int server_fd, new_socket;
  struct sockaddr_in address;
  int opt = 1;
  int addrlen = sizeof(address);
  char buffer[1024] = {0};

  server_fd = socket(AF_INET, SOCK_STREAM, 0);
  if (server_fd == -1) {
    perror("socket failed");
    exit(EXIT_FAILURE);
  }

  // Attach socket to port 8080
  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY;
  address.sin_port = htons(8080);

  if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
    perror("bind failed");
    exit(EXIT_FAILURE);
  }

  if (listen(server_fd, 3) < 0) {
    perror("listen");
    exit(EXIT_FAILURE);
  }

  new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen);
  if (new_socket == -1) {
    perror("accept");
    exit(EXIT_FAILURE);
  }

  while (true) {
    memset(buffer, 0, sizeof(buffer));
    ssize_t bytes_received = recv(new_socket, buffer, sizeof(buffer), 0);
    if (bytes_received <= 0) break;

    std::cout << "Received: " << buffer << std::endl;
    send(new_socket, buffer, bytes_received, 0); // Echo back
  }

  close(new_socket);
  close(server_fd);
}

// Client code
void run_client() {
  int socket_fd;
  struct sockaddr_in server_address;
  char buffer[1024] = {0};

  socket_fd = socket(AF_INET, SOCK_STREAM, 0);
  if (socket_fd == -1) {
    perror("socket failed");
    exit(EXIT_FAILURE);
  }

  server_address.sin_family = AF_INET;
  server_address.sin_addr.s_addr = INADDR_LOOPBACK; //connect to localhost
  server_address.sin_port = htons(8080);

  if (connect(socket_fd, (struct sockaddr *)&server_address, sizeof(server_address)) < 0) {
    perror("connect failed");
    exit(EXIT_FAILURE);
  }

  std::string message = "Hello from Client!";
  send(socket_fd, message.c_str(), message.length(), 0);

  memset(buffer, 0, sizeof(buffer));
  ssize_t bytes_received = recv(socket_fd, buffer, sizeof(buffer), 0);
  if (bytes_received > 0) {
    std::cout << "Received from Server: " << buffer << std::endl;
  }

  close(socket_fd);
}


int main(int argc, char const *argv[]) {
    if (argc == 2 && std::string(argv[1]) == "server") {
        run_server();
    } else {
        run_client();
    }
    return 0;
}
```