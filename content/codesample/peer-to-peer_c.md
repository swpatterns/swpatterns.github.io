---
title: "Peer-to-Peer - C"
date: 2025-12-03T06:24:54.128-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["C"]
---
The Peer-to-Peer (P2P) pattern distributes tasks or data among multiple independent peers, rather than relying on a central server. Each peer acts as both a client and a server, sharing resources directly with other peers. This example simulates a simple P2P network for file sharing.  Each process represents a peer, capable of requesting and providing files to others.  We use sockets for inter-process communication and a simplified "file database" consisting of filenames and pointers to file data. This implementation uses low-level socket programming common in C, and a basic command-line interface for interaction, aligning with C's performance-oriented and system-level approach. Error handling is included for robustness.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 12345
#define MAX_PEERS 5
#define MAX_DATA_SIZE 1024

typedef struct {
    char filename[50];
    char data[MAX_DATA_SIZE];
} File;

File file_database[MAX_DATA_SIZE];
int file_count = 0;

int main(int argc, char *argv[]) {
    int socket_desc, new_socket, i;
    struct sockaddr_in server_addr, client_addr;
    socklen_t addr_size;
    int peer_id;

    if (argc != 2) {
        printf("Usage: %s <peer_id>\n", argv[0]);
        return 1;
    }

    peer_id = atoi(argv[1]);

    // Create socket
    socket_desc = socket(AF_INET, SOCK_STREAM, 0);
    if (socket_desc == -1) {
        perror("Failed to create socket");
        return 1;
    }

    // Bind socket
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT + peer_id); //Each peer uses a different port.

    if (bind(socket_desc, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("Bind failed");
        return 1;
    }

    listen(socket_desc, 3);

    // Add some initial files to the database for testing (peer 0).
    if (peer_id == 0) {
        strcpy(file_database[0].filename, "file1.txt");
        strcpy(file_database[0].data, "This is the content of file1.");
        file_count++;
    }

    printf("Peer %d listening on port %d...\n", peer_id, PORT + peer_id);

    while (1) {
        addr_size = sizeof(client_addr);
        new_socket = accept(socket_desc, (struct sockaddr *)&client_addr, &addr_size);
        if (new_socket < 0) {
            perror("Accept failed");
            continue;
        }

        char request[50];
        if (recv(new_socket, request, sizeof(request), 0) > 0) {
            printf("Peer %d received request: %s from %s\n", peer_id, request, inet_ntoa(client_addr.sin_addr));

            if (strncmp(request, "GET", 3) == 0) {
                char filename[50];
                sscanf(request, "GET %s", filename);

                // Search for the file
                for (i = 0; i < file_count; i++) {
                    if (strcmp(file_database[i].filename, filename) == 0) {
                        // Send file data
                        send(new_socket, file_database[i].data, strlen(file_database[i].data), 0);
                        printf("Peer %d sent file: %s\n", peer_id, filename);
                        break;
                    }
                }
                if(i == file_count) {
                    send(new_socket, "FILE NOT FOUND", strlen("FILE NOT FOUND"), 0);
                    printf("Peer %d could not find file %s\n", peer_id, filename);
                }

            }
        }

        close(new_socket);
    }

    close(socket_desc);
    return 0;
}
```