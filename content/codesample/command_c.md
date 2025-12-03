---
title: "Command - C"
date: 2025-12-03T13:02:08.550-05:00
draft: false
pattern_usage: ["Command"]
language: ["C"]
---
The Command pattern encapsulates a request as an object, allowing for parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This implementation defines a base `command` struct with an `execute` function pointer. Concrete commands implement this interface to perform specific actions on a `receiver` object. An `invoker` holds and executes commands. This approach is idiomatic C as it leverages function pointers to achieve polymorphism and avoids complex object hierarchies, keeping the code lightweight and efficient.

```c
#include <stdio.h>
#include <stdlib.h>

// Receiver
typedef struct {
    int value;
} Receiver;

void receiver_set_value(Receiver *receiver, int value) {
    receiver->value = value;
}

int receiver_get_value(const Receiver *receiver) {
    return receiver->value;
}

// Command
typedef struct {
    Receiver *receiver;
    void (*execute)(const struct Command*);
} Command;

// Concrete Commands
void command_set_a(const Command *command) {
    receiver_set_value(command->receiver, 10);
}

void command_set_b(const Command *command) {
    receiver_set_value(command->receiver, 20);
}

// Invoker
typedef struct {
    Command *command;
} Invoker;

void invoker_set_command(Invoker *invoker, Command *command) {
    invoker->command = command;
}

void invoker_execute_command(Invoker *invoker) {
    if (invoker->command != NULL) {
        invoker->command->execute(invoker->command);
    }
}

int main() {
    Receiver receiver = {0};
    Invoker invoker;

    Command set_a_command = {&receiver, command_set_a};
    Command set_b_command = {&receiver, command_set_b};

    invoker_set_command(&invoker, &set_a_command);
    invoker_execute_command(&invoker);
    printf("Value after set A: %d\n", receiver_get_value(&receiver));

    invoker_set_command(&invoker, &set_b_command);
    invoker_execute_command(&invoker);
    printf("Value after set B: %d\n", receiver_get_value(&receiver));

    return 0;
}
```