---
title: "Self-contained Systems - C"
date: 2025-12-03T14:29:39.782-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["C"]
---
The Self-Contained Systems pattern advocates encapsulating an entire subsystem within a single unit – often a library or a well-defined set of header/source files. This promotes modularity, reduces dependencies, and simplifies testing. My C implementation models a simple logging system as a self-contained unit.  It includes the logging functions and a simple configuration structure – all within the `logger.h` and `logger.c` files. This minimizes external dependencies, making it easy to integrate or replace. C's strengths in creating static libraries perfectly suit this pattern, offering a clear separation of concerns. The use of a struct for configuration and passing it to functions aligns with typical C practices.

```c
// logger.h
#ifndef LOGGER_H
#define LOGGER_H

#include <stdio.h>

typedef struct {
    FILE *log_file;
    int log_level; // 0-debug, 1-info, 2-warn, 3-error
} LoggerConfig;

void logger_init(LoggerConfig *config, const char *filename);
void logger_log(const LoggerConfig *config, int level, const char *message);
void logger_close(LoggerConfig *config);

#endif // LOGGER_H

// logger.c
#include "logger.h"
#include <stdlib.h>
#include <string.h>

void logger_init(LoggerConfig *config, const char *filename) {
    config->log_file = fopen(filename, "a");
    if (config->log_file == NULL) {
        perror("Error opening log file");
        exit(EXIT_FAILURE);
    }
    config->log_level = 1; // Default to INFO
}

void logger_log(const LoggerConfig *config, int level, const char *message) {
    if (level >= config->log_level) {
        char log_entry[256];
        snprintf(log_entry, sizeof(log_entry), "[Level %d] %s", level, message);
        fprintf(config->log_file, "%s\n", log_entry);
        fflush(config->log_file);
    }
}

void logger_close(LoggerConfig *config) {
    if (config->log_file != NULL) {
        fclose(config->log_file);
        config->log_file = NULL;
    }
}

// main.c - Example Usage (not part of the self-contained system)
#include "logger.h"

int main() {
    LoggerConfig logger;
    logger_init(&logger, "application.log");

    logger_log(&logger, 0, "Debug message");
    logger_log(&logger, 1, "Info message");
    logger_log(&logger, 2, "Warning message");
    logger_log(&logger, 3, "Error message");

    logger_close(&logger);
    return 0;
}
```