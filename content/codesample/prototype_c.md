---
title: "Prototype - C"
date: 2025-12-03T11:02:24.060-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["C"]
---
The Prototype pattern creates new objects by cloning an existing object, known as the prototype. This avoids the complexity of explicit class instantiation, especially useful when object creation is expensive or when the precise object types needed are determined at runtime.  This C implementation uses a common trick: a structure containing a function pointer for cloning. Each concrete prototype type will define its own clone function.  This sidesteps C's lack of built-in inheritance by enabling polymorphism through function pointers. The `create_prototype` function acts as a factory, allowing the creation of copies based on a registered prototype.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Prototype Interface
typedef struct Prototype Prototype;
typedef struct Prototype* (*CloneFunction)(const Prototype*);

struct Prototype {
    CloneFunction clone;
    // Shared data among prototypes
    int type;
};

// Concrete Prototype 1: Rectangle
typedef struct Rectangle Rectangle;

struct Rectangle {
    Prototype base;
    int width;
    int height;
};

Rectangle* rectangle_clone(const Prototype* prototype) {
    Rectangle* new_rectangle = (Rectangle*)malloc(sizeof(Rectangle));
    if (new_rectangle == NULL) {
        perror("malloc failed");
        return NULL;
    }
    memcpy(new_rectangle, prototype, sizeof(Rectangle));
    return new_rectangle;
}

// Concrete Prototype 2: Circle
typedef struct Circle Circle;

struct Circle {
    Prototype base;
    int radius;
};

Circle* circle_clone(const Prototype* prototype) {
    Circle* new_circle = (Circle*)malloc(sizeof(Circle));
    if (new_circle == NULL) {
        perror("malloc failed");
        return NULL;
    }
    memcpy(new_circle, prototype, sizeof(Circle));
    return new_circle;
}

// Prototype Manager / Factory
typedef struct PrototypeManager PrototypeManager;

struct PrototypeManager {
    Prototype* prototypes[2]; // Limited to 2 prototypes for simplicity
    int count;
};

PrototypeManager* create_prototype_manager() {
    PrototypeManager* manager = (PrototypeManager*)malloc(sizeof(PrototypeManager));
    if (manager == NULL) {
        perror("malloc failed");
        return NULL;
    }
    manager->count = 0;
    return manager;
}

void register_prototype(PrototypeManager* manager, Prototype* prototype) {
    if (manager->count < 2) {
        manager->prototypes[manager->count++] = prototype;
    } else {
        fprintf(stderr, "Too many prototypes registered.\n");
    }
}


Prototype* create_prototype(PrototypeManager* manager, int type) {
    for (int i = 0; i < manager->count; ++i) {
        if (manager->prototypes[i]->type == type) {
            return (Prototype*)manager->prototypes[i]->clone(manager->prototypes[i]);
        }
    }
    return NULL; // Prototype not found
}

int main() {
    PrototypeManager* manager = create_prototype_manager();

    Rectangle* rectangle = (Rectangle*)malloc(sizeof(Rectangle));
    rectangle->base.clone = rectangle_clone;
    rectangle->base.type = 1;
    rectangle->width = 10;
    rectangle->height = 5;
    register_prototype(manager, (Prototype*)rectangle);

    Circle* circle = (Circle*)malloc(sizeof(Circle));
    circle->base.clone = circle_clone;
    circle->base.type = 2;
    circle->radius = 7;
    register_prototype(manager, (Prototype*)circle);
    

    Rectangle* new_rectangle = (Rectangle*)create_prototype(manager, 1);
    if (new_rectangle) {
        printf("New Rectangle: width=%d, height=%d\n", new_rectangle->width, new_rectangle->height);
        free(new_rectangle);
    }

    Circle* new_circle = (Circle*)create_prototype(manager, 2);
    if (new_circle) {
        printf("New Circle: radius=%d\n", new_circle->radius);
        free(new_circle);
    }


    free(manager);
    free(rectangle);
    free(circle);
    return 0;
}
```