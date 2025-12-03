---
title: "Microkernel - C"
date: 2025-12-03T14:21:59.387-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["C"]
---
The Microkernel pattern structures a system by separating core functionality (the kernel) from optional add-on services. The kernel provides minimal services like memory management and inter-process communication (IPC), while services such as device drivers, file systems, and networking run as user-space processes. This increases modularity, stability, and flexibility. 

The C code exemplifies this by defining a minimal kernel with IPC via message passing.  "Services" (printer, file system) are simulated as separate functions that communicate with the kernel to perform tasks. `kernel_send` and `kernel_receive` represent the IPC.  This fits C’s style by directly managing memory and utilizing function pointers for service calls - common practices when low-level control and performance are prioritized as they are in implementing a microkernel-like structure.  Notably, error handling is simplified for brevity, crucial in real implementations.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Define message types
typedef enum {
    PRINT_MSG,
    FILE_MSG,
    OTHER_MSG
} message_type;

// Define a message structure
typedef struct {
    message_type type;
    char data[128];
} message_t;

// Global message queue (simplified - in reality would be managed by the kernel)
message_t message_queue[10];
int queue_head = 0;
int queue_tail = 0;

// Kernel functions (minimal)
void kernel_send(message_t *msg) {
    if ((queue_tail + 1) % 10 == queue_head) {
        printf("Kernel: Message queue is full!\n");
        return;
    }
    message_queue[queue_tail] = *msg;
    queue_tail = (queue_tail + 1) % 10;
    printf("Kernel: Message sent (type: %d)\n", msg->type);
}

void kernel_receive(message_t *msg) {
    if (queue_head == queue_tail) {
        printf("Kernel: Message queue is empty!\n");
        return;
    }
    *msg = message_queue[queue_head];
    queue_head = (queue_head + 1) % 10;
    printf("Kernel: Message received (type: %d, data: %s)\n", msg->type, msg->data);
}


// Service implementations (user space)
void printer_service(message_t *msg) {
    if (msg->type == PRINT_MSG) {
        printf("Printer Service: Printing - %s\n", msg->data);
    }
}

void file_system_service(message_t *msg) {
    if (msg->type == FILE_MSG) {
        printf("File System Service: Handling file operation - %s\n", msg->data);
    }
}

int main() {
    message_t msg;

    // Printer service request
    msg.type = PRINT_MSG;
    strcpy(msg.data, "Hello, world!");
    kernel_send(&msg);
    printer_service(&msg);

    // File system service request
    msg.type = FILE_MSG;
    strcpy(msg.data, "Read file.txt");
    kernel_send(&msg);
    file_system_service(&msg);

    return 0;
}
```