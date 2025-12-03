---
title: "Abstract Factory - C"
date: 2025-12-03T10:49:30.197-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["C"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a "factory of factories," allowing you to switch between different "looks and feels" or object sets easily. This example demonstrates creating different types of buttons (Windows and HTML) and text boxes using an abstract factory.  The `Factory` struct defines the abstract factory interface, and concrete factories (`WindowsFactory`, `HTMLFactory`) implement it to produce specific button and textbox types.  C's struct-based approach naturally lends itself to defining interfaces and concrete implementations, fitting the pattern's intent.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Abstract Products
typedef struct Button Button;
typedef struct TextBox TextBox;

// Abstract Factory
typedef struct Factory Factory;

// Concrete Products - Windows
typedef struct WindowsButton WindowsButton;
typedef struct WindowsTextBox WindowsTextBox;

// Concrete Products - HTML
typedef struct HTMLButton HTMLButton;
typedef struct HTMLTextBox HTMLTextBox;

// Button Interface
struct Button {
    void (*paint)(Button* this);
};

// TextBox Interface
struct TextBox {
    void (*render)(TextBox* this);
};

// Windows Button
struct WindowsButton {
    Button base;
    char* text;
};

void windowsButtonPaint(Button* this) {
    WindowsButton* winButton = (WindowsButton*)this;
    printf("Windows Button: %s\n", winButton->text);
}

// HTML Button
struct HTMLButton {
    Button base;
    char* text;
};

void htmlButtonPaint(Button* this) {
    HTMLButton* htmlButton = (HTMLButton*)this;
    printf("<button>%s</button>\n", htmlButton->text);
}

// Windows TextBox
struct WindowsTextBox {
    TextBox base;
    int width;
    int height;
};

void windowsTextBoxRender(TextBox* this) {
    WindowsTextBox* winTextBox = (WindowsTextBox*)this;
    printf("Windows TextBox (width=%d, height=%d)\n", winTextBox->width, winTextBox->height);
}

// HTML TextBox
struct HTMLTextBox {
    TextBox base;
    int width;
    int height;
};

void htmlTextBoxRender(TextBox* this) {
    HTMLTextBox* htmlTextBox = (HTMLTextBox*)this;
    printf("<textarea width=%d height=%d></textarea>\n", htmlTextBox->width, htmlTextBox->height);
}

// Abstract Factory Interface
struct Factory {
    Button* (*createButton)(char* text);
    TextBox* (*createTextBox)(int width, int height);
};

// Concrete Factory - Windows
typedef struct WindowsFactory WindowsFactory;

struct WindowsFactory {
    Factory base;
};

Button* windowsFactoryCreateButton(char* text) {
    WindowsButton* button = (WindowsButton*)malloc(sizeof(WindowsButton));
    button->base.paint = windowsButtonPaint;
    button->text = strdup(text); // Duplicate the string to avoid dangling pointers
    return (Button*)button;
}

TextBox* windowsFactoryCreateTextBox(int width, int height) {
    WindowsTextBox* textBox = (WindowsTextBox*)malloc(sizeof(WindowsTextBox));
    textBox->base.render = windowsTextBoxRender;
    textBox->width = width;
    textBox->height = height;
    return (TextBox*)textBox;
}

// Concrete Factory - HTML
typedef struct HTMLFactory HTMLFactory;

struct HTMLFactory {
    Factory base;
};

Button* htmlFactoryCreateButton(char* text) {
    HTMLButton* button = (HTMLButton*)malloc(sizeof(HTMLButton));
    button->base.paint = htmlButtonPaint;
    button->text = strdup(text);
    return (Button*)button;
}

TextBox* htmlFactoryCreateTextBox(int width, int height) {
    HTMLTextBox* textBox = (HTMLTextBox*)malloc(sizeof(HTMLTextBox));
    textBox->base.render = htmlTextBoxRender;
    textBox->width = width;
    textBox->height = height;
    return (TextBox*)textBox;
}

// Client Code
int main() {
    WindowsFactory windowsFactory;
    windowsFactory.base.createButton = windowsFactoryCreateButton;
    windowsFactory.base.createTextBox = windowsFactoryCreateTextBox;

    HTMLFactory htmlFactory;
    htmlFactory.base.createButton = htmlFactoryCreateButton;
    htmlFactory.base.createTextBox = htmlFactoryCreateTextBox;

    // Create Windows elements
    Button* windowsButton = windowsFactory.base.createButton("Click Me");
    windowsButton->base.paint(windowsButton);

    TextBox* windowsTextBox = windowsFactory.base.createTextBox(100, 20);
    windowsTextBox->base.render(windowsTextBox);

    // Create HTML elements
    Button* htmlButton = htmlFactory.base.createButton("Submit");
    htmlButton->base.paint(htmlButton);

    TextBox* htmlTextBox = htmlFactory.base.createTextBox(50, 10);
    htmlTextBox->base.render(htmlTextBox);

    free(windowsButton);
    free(htmlTextBox);
    free(htmlButton);
    free(htmlTextBox);

    return 0;
}
```