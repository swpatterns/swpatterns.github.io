---
title: "Null Object - C"
date: 2025-12-03T13:47:15.408-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["C"]
---
The Null Object pattern provides a substitute for an object that would otherwise be null. This avoids null checks throughout the code, simplifying logic and reducing the risk of NullPointerExceptions (or similar errors in C).  Instead of `if (object != NULL)`, you can always call a method on the object, and the Null Object will provide default, harmless behavior. This example demonstrates a `Logger` interface and a `NullLogger` that implements it, providing no-op logging functionality.  C's use of function pointers allows for a flexible interface implementation. This approach is common in C for achieving polymorphism and avoiding conditional checks.

```c
#include <stdio.h>
#include <stdlib.h>

// Logger interface (defined using a function pointer)
typedef struct Logger {
    void (*log)(const char *message);
} Logger;

// Concrete Logger implementation (e.g., to console)
typedef struct ConsoleLogger {
    Logger base;
} ConsoleLogger;

void console_log(const char *message) {
    printf("Console: %s\n", message);
}

ConsoleLogger* new_console_logger() {
    ConsoleLogger* logger = (ConsoleLogger*)malloc(sizeof(ConsoleLogger));
    logger->base.log = console_log;
    return logger;
}

// Null Logger implementation (does nothing)
typedef struct NullLogger {
    Logger base;
};

void null_log(const char *message) {
    // Do nothing - this is the null operation
}

NullLogger* new_null_logger() {
    NullLogger* logger = (NullLogger*)malloc(sizeof(NullLogger));
    logger->base.log = null_log;
    return logger;
}

// Example usage
int main() {
    Logger *logger = new_null_logger(); // Or new_console_logger()

    logger->log("This is a log message."); // Safe to call even if logger is null

    free(logger);
    return 0;
}
```