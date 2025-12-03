---
title: "Composite - C"
date: 2025-12-03T11:35:58.344-05:00
draft: false
pattern_usage: ["Composite"]
language: ["C"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It defines a tree-like structure where each node can be either a leaf (individual object) or a composite (collection of objects).  This example demonstrates it with a simple shape hierarchy.  Shapes can be individual circles or rectangles, or a group containing other shapes. All shapes have a `draw()` method, allowing you to iterate through a composite and draw all contained shapes without knowing their specific types. The C implementation utilizes structs and function pointers to achieve polymorphism. The use of `struct`s is idiomatic for grouping data, and function pointers allow for flexible behavior definitions.

```c
#include <stdio.h>
#include <stdlib.h>

// Define the Shape interface
typedef struct Shape Shape;
typedef void (*DrawFunc)(const Shape*);

struct Shape {
    DrawFunc draw;
    void* data; // Generic data for each shape type
};

// Concrete Shape: Circle
typedef struct Circle Circle;
struct Circle {
    int x, y, radius;
};

void circle_draw(const Shape* shape) {
    const Circle* circle = (const Circle*)shape->data;
    printf("Drawing Circle at (%d, %d) with radius %d\n", circle->x, circle->y, circle->radius);
}

Shape* create_circle(int x, int y, int radius) {
    Circle* circle = (Circle*)malloc(sizeof(Circle));
    circle->x = x;
    circle->y = y;
    circle->radius = radius;

    Shape* shape = (Shape*)malloc(sizeof(Shape));
    shape->draw = circle_draw;
    shape->data = circle;
    return shape;
}

// Concrete Shape: Rectangle
typedef struct Rectangle Rectangle;
struct Rectangle {
    int x, y, width, height;
};

void rectangle_draw(const Shape* shape) {
    const Rectangle* rect = (const Rectangle*)shape->data;
    printf("Drawing Rectangle at (%d, %d) with width %d and height %d\n", rect->x, rect->y, rect->width, rect->height);
}

Shape* create_rectangle(int x, int y, int width, int height) {
    Rectangle* rect = (Rectangle*)malloc(sizeof(Rectangle));
    rect->x = x;
    rect->y = y;
    rect->width = width;
    rect->height = height;

    Shape* shape = (Shape*)malloc(sizeof(Shape));
    shape->draw = rectangle_draw;
    shape->data = rect;
    return shape;
}

// Composite Shape: ShapeGroup
typedef struct ShapeGroup ShapeGroup;
struct ShapeGroup {
    Shape* children[100]; // Fixed size array for simplicity
    int count;
};

void shape_group_draw(const Shape* shape) {
    const ShapeGroup* group = (const ShapeGroup*)shape->data;
    for (int i = 0; i < group->count; i++) {
        group->children[i]->draw(group->children[i]);
    }
}

Shape* create_shape_group() {
    ShapeGroup* group = (ShapeGroup*)malloc(sizeof(ShapeGroup));
    group->count = 0;

    Shape* shape = (Shape*)malloc(sizeof(Shape));
    shape->draw = shape_group_draw;
    shape->data = group;
    return shape;
}

void add_shape(Shape* group, Shape* shape) {
    ShapeGroup* g = (ShapeGroup*)group->data;
    g->children[g->count++] = shape;
}

int main() {
    Shape* circle1 = create_circle(10, 20, 5);
    Shape* circle2 = create_circle(30, 40, 10);
    Shape* rect1 = create_rectangle(5, 5, 15, 20);

    Shape* group1 = create_shape_group();
    add_shape(group1, circle1);
    add_shape(group1, circle2);

    Shape* group2 = create_shape_group();
    add_shape(group2, rect1);
    add_shape(group2, group1);

    group2->draw(group2);

    // Free allocated memory (important!)
    free(circle1->data);
    free(circle1);
    free(circle2->data);
    free(circle2);
    free(rect1->data);
    free(rect1);
    free(group1->data);
    free(group1);
    free(group2->data);
    free(group2);

    return 0;
}
```