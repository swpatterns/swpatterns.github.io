---
title: "Mediator - C"
date: 2025-12-03T13:15:40.943-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["C"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by preventing objects from referring to each other explicitly, and it's useful when complex communication exists between objects.

The C implementation uses a `Mediator` struct holding function pointers for communication between `Colleague` structures.  Each colleague registers with the mediator and forwards requests *to* the mediator instead of directly to other colleagues. The mediator then determines which colleagues should receive the request.  This avoids tight coupling that would occur with direct references.  Using function pointers is a common approach for achieving polymorphism and abstracting behavior in C, fitting well with the pattern's intent. A simple chatroom example illustrates the concept with two colleagues communicating through the mediator.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Forward declaration of Mediator
typedef struct Mediator_t Mediator;

// Colleague Interface
typedef struct Colleague_t {
    char *name;
    Mediator *mediator;
    void (*send)(struct Colleague_t *colleague, const char *message);
    void (*receive)(struct Colleague_t *colleague, const char *message);
} Colleague;

// Mediator Interface
typedef struct Mediator_t {
    Colleague *colleague1;
    Colleague *colleague2;
    void (*send_message)(Mediator *mediator, Colleague *originator, const char *message);
} Mediator;


// Concrete Colleague
typedef struct {
    Colleague base;
} ChatroomColleague;


// Concrete Mediator
typedef struct {
    Mediator base;
} ChatroomMediator;


void chat_send(Colleague *colleague, const char *message) {
    ChatroomColleague *cc = (ChatroomColleague*)colleague;
    cc->base.mediator->send_message(cc->base.mediator, colleague, message);
}

void chat_receive(Colleague *colleague, const char *message) {
    ChatroomColleague *cc = (ChatroomColleague*)colleague;
    printf("%s receives: %s\n", cc->base.name, message);
}

void chatroom_send_message(Mediator *mediator, Colleague *originator, const char *message) {
    ChatroomMediator *cm = (ChatroomMediator*)mediator;
    if (originator == cm->base.colleague1) {
        cm->base.colleague2->receive(cm->base.colleague2, message);
    } else if (originator == cm->base.colleague2) {
        cm->base.colleague1->receive(cm->base.colleague1, message);
    }
}

Colleague *create_colleague(const char *name, Mediator *mediator) {
    ChatroomColleague *colleague = (ChatroomColleague *)malloc(sizeof(ChatroomColleague));
    if(!colleague) return NULL;
    colleague->base.name = strdup(name);
    colleague->base.mediator = mediator;
    colleague->base.send = chat_send;
    colleague->base.receive = chat_receive;
    return (Colleague*)colleague;
}

Mediator *create_mediator(Colleague *colleague1, Colleague *colleague2) {
    ChatroomMediator *mediator = (ChatroomMediator *)malloc(sizeof(ChatroomMediator));
    if(!mediator) return NULL;
    mediator->base.colleague1 = colleague1;
    mediator->base.colleague2 = colleague2;
    mediator->base.send_message = chatroom_send_message;
    return (Mediator*)mediator;
}

void destroy_colleague(Colleague *colleague) {
    if (colleague) {
        free(colleague->base.name);
        free(colleague);
    }
}

void destroy_mediator(Mediator *mediator) {
    if (mediator) {
        free(mediator);
    }
}


int main() {
    Colleague *alice = create_colleague("Alice", NULL);
    Colleague *bob = create_colleague("Bob", NULL);
    Mediator *mediator = create_mediator(alice, bob);

    alice->base.mediator = mediator;
    bob->base.mediator = mediator;

    alice->base.send(alice, "Hello, Bob!");
    bob->base.send(bob, "Hi, Alice! How are you?");

    destroy_colleague(alice);
    destroy_colleague(bob);
    destroy_mediator(mediator);

    return 0;
}
```