---
title: "Client-Server - C"
date: 2025-12-03T14:33:38.420-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["C"]
---
The Client-Server pattern involves separating an application into two parts: a server that provides a resource or service, and clients that request and utilize that service. This example uses basic sockets in C to demonstrate this pattern. The server listens for incoming connections, receives a request (a simple string), and sends back a response. The client connects to the server, sends the request, and prints the received response.  This implementation is typical C style using low-level socket functions and explicit error handling, prioritizing clarity and portability over higher-level abstractions.

```c
// server.c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[BUFFER_SIZE] = {0};

    // Create socket file descriptor
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    // Bind the socket
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    // Listen for connections
    if (listen(server_fd, 3) < 0) {
        perror("listen failed");
        exit(EXIT_FAILURE);
    }

    printf("Server listening on port %d...\n", PORT);

    while(1) {
        // Accept a connection
        if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0) {
            perror("accept failed");
            continue;
        }

        // Read data from the client
        recv(new_socket, buffer, BUFFER_SIZE, 0);
        printf("Received from client: %s\n", buffer);

        // Send a response back to the client
        const char *response = "Server received your message!";
        send(new_socket, response, strlen(response), 0);

        // Close the connection
        close(new_socket);
    }

    return 0;
}

// client.c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main() {
    int socket_fd;
    struct sockaddr_in address;
    char buffer[BUFFER_SIZE] = {0};

    // Create socket file descriptor
    if ((socket_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    // Connect to the server
    if (connect(socket_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("connect failed");
        exit(EXIT_FAILURE);
    }

    const char *request = "Hello, Server!";
    // Send data to the server
    send(socket_fd, request, strlen(request), 0);

    // Receive data from the server
    recv(socket_fd, buffer, BUFFER_SIZE, 0);
    printf("Received from server: %s\n", buffer);

    // Close the connection
    close(socket_fd);

    return 0;
}
```