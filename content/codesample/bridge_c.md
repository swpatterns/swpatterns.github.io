---
title: "Bridge - C"
date: 2025-12-03T11:31:38.356-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["C"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction – such as a class – into separate abstraction and implementation hierarchies. This pattern is used when there's a need to avoid a tight coupling between an abstraction and its implementation, allowing both to vary independently. 

The code demonstrates a `Shape` abstraction and different `Renderer` implementations (e.g., drawing with ASCII characters or using a hypothetical graphics library). `Shape` doesn’t know the specifics of *how* it’s drawn – it just delegates to the `Renderer` interface.  This is idiomatic C as it utilizes function pointers to achieve polymorphism without classical inheritance, fitting C's procedural and flexible style. The use of structs for defining both abstractions and implementations is also standard C practice.

```c
#include <stdio.h>

// Implementation (Renderer)
typedef struct Renderer {
  void (*draw_circle)(int x, int y, int radius);
  void (*draw_square)(int x, int y, int side);
} Renderer;

void ascii_draw_circle(int x, int y, int radius) {
  printf("Drawing circle (ASCII) at (%d, %d) with radius %d\n", x, y, radius);
}

void ascii_draw_square(int x, int y, int side) {
  printf("Drawing square (ASCII) at (%d, %d) with side %d\n", x, y, side);
}

void graphics_draw_circle(int x, int y, int radius) {
  printf("Drawing circle (Graphics) at (%d, %d) with radius %d\n", x, y, radius);
}

void graphics_draw_square(int x, int y, int side) {
  printf("Drawing square (Graphics) at (%d, %d) with side %d\n", x, y, side);
}

Renderer ascii_renderer = {ascii_draw_circle, ascii_draw_square};
Renderer graphics_renderer = {graphics_draw_circle, graphics_draw_square};

// Abstraction (Shape)
typedef struct Shape {
  Renderer *renderer;
} Shape;

Shape* shape_create(Renderer *renderer) {
  Shape *shape = (Shape*)malloc(sizeof(Shape));
  shape->renderer = renderer;
  return shape;
}

void shape_draw_circle(Shape *shape, int x, int y, int radius) {
  shape->renderer->draw_circle(x, y, radius);
}

void shape_draw_square(Shape *shape, int x, int y, int side) {
  shape->renderer->draw_square(x, y, side);
}

int main() {
  Shape *circle_ascii = shape_create(&ascii_renderer);
  Shape *square_ascii = shape_create(&ascii_renderer);
  Shape *circle_graphics = shape_create(&graphics_renderer);

  shape_draw_circle(circle_ascii, 10, 10, 5);
  shape_draw_square(square_ascii, 20, 20, 4);
  shape_draw_circle(circle_graphics, 5, 5, 3);

  free(circle_ascii);
  free(square_ascii);
  free(circle_graphics);

  return 0;
}
```