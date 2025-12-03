---
title: "Hexagonal Architecture - C"
date: 2025-12-03T14:09:21.789-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["C"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by isolating the core application logic from external concerns like UI, databases, and other infrastructure. It achieves this through *ports* (interfaces defining interactions with the core) and *adapters* (implementations of those ports connecting to specific technologies).  This example shows a simple application for greetings. The core logic resides in `greeting_core.c` and only depends on the port interface `igreeting_port.h`. Adapters in `greeting_console_adapter.c` and `greeting_file_adapter.c` provide console and file-based interactions, respectively. This structure makes testing easier and allows swapping implementations without affecting the core.  C's function pointer based interfaces naturally lend themselves well to this pattern.

```c
// igreeting_port.h
#ifndef IGREETING_PORT_H
#define IGREETING_PORT_H

#include <stdio.h>

typedef void (*greeting_callback)(const char *message);

typedef struct {
    greeting_callback greet;
    void (*close)();
} igreeting_port;

#endif // IGREETING_PORT_H

// greeting_core.h
#ifndef GREETING_CORE_H
#define GREETING_CORE_H

#include "igreeting_port.h"

typedef struct {
    igreeting_port *port;
} greeting_service;

greeting_service create_greeting_service(igreeting_port *port);
void process_greeting(greeting_service *service, const char *name);

#endif // GREETING_CORE_H

// greeting_core.c
#include "greeting_core.h"
#include <stdlib.h>
#include <stdio.h>

greeting_service create_greeting_service(igreeting_port *port) {
    greeting_service service;
    service.port = port;
    return service;
}

void process_greeting(greeting_service *service, const char *name) {
    char message[100];
    snprintf(message, sizeof(message), "Hello, %s!", name);
    service->port->greet(message);
}

// greeting_console_adapter.h
#ifndef GREETING_CONSOLE_ADAPTER_H
#define GREETING_CONSOLE_ADAPTER_H

#include "igreeting_port.h"

igreeting_port create_console_port();

#endif // GREETING_CONSOLE_ADAPTER_H

// greeting_console_adapter.c
#include "greeting_console_adapter.h"
#include <stdio.h>
#include <stdlib.h>

static void console_greet(const char *message) {
    printf("%s\n", message);
}

static void console_close() {
    // Nothing to do for console output
}

igreeting_port create_console_port() {
    igreeting_port port;
    port.greet = console_greet;
    port.close = console_close;
    return port;
}

// greeting_file_adapter.h
#ifndef GREETING_FILE_ADAPTER_H
#define GREETING_FILE_ADAPTER_H

#include "igreeting_port.h"

igreeting_port create_file_port(const char *filename);

#endif // GREETING_FILE_ADAPTER_H

// greeting_file_adapter.c
#include "greeting_file_adapter.h"
#include <stdio.h>
#include <stdlib.h>

static void file_greet(const char *message) {
    FILE *fp = fopen("greetings.txt", "a");
    if (fp != NULL) {
        fprintf(fp, "%s\n", message);
        fclose(fp);
    }
}

static void file_close() {
    //No specific cleanup needed in this simple example
}

igreeting_port create_file_port(const char *filename) {
    igreeting_port port;
    port.greet = file_greet;
    port.close = file_close;
    return port;
}

// main.c
#include "greeting_core.h"
#include "greeting_console_adapter.h"
#include "greeting_file_adapter.h"

int main() {
    igreeting_port console_port = create_console_port();
    greeting_service console_service = create_greeting_service(&console_port);
    process_greeting(&console_service, "Alice");

    igreeting_port file_port = create_file_port("greetings.txt");
    greeting_service file_service = create_greeting_service(&file_port);
    process_greeting(&file_service, "Bob");
    
    console_port.close();
    file_port.close();

    return 0;
}
```