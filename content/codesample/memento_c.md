---
title: "Memento - C"
date: 2025-12-03T13:20:33.194-05:00
draft: false
pattern_usage: ["Memento"]
language: ["C"]
---
The Memento pattern is a behavioral pattern that allows saving and restoring the internal state of an object without violating encapsulation. It involves three actors: the Originator (holding the state), the Memento (a snapshot of the state), and the Caretaker (responsible for storing and retrieving Mementos). This implementation uses structs to represent the Originator and Memento, and functions to create and restore the state.  C's lack of built-in object orientation necessitates a more procedural approach, but the core concept of encapsulating and preserving state remains.  The use of `typedef` enhances readability.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Originator
typedef struct {
  char *state;
} TextEditor;

// Memento
typedef struct {
  char *state;
} TextEditorMemento;

// Caretaker
typedef struct {
  TextEditorMemento *mementos;
  int size;
  int capacity;
} TextEditorHistory;

// Function to create a new TextEditor
TextEditor *create_text_editor() {
  TextEditor *editor = (TextEditor *)malloc(sizeof(TextEditor));
  editor->state = (char *)malloc(100 * sizeof(char));
  strcpy(editor->state, "");
  return editor;
}

// Function to set the state of the TextEditor
void set_state(TextEditor *editor, const char *state) {
  strcpy(editor->state, state);
}

// Function to get the state of the TextEditor
char *get_state(TextEditor *editor) {
  return editor->state;
}

// Function to create a Memento
TextEditorMemento *create_memento(const char *state) {
  TextEditorMemento *memento = (TextEditorMemento *)malloc(sizeof(TextEditorMemento));
  memento->state = (char *)malloc(strlen(state) + 1);
  strcpy(memento->state, state);
  return memento;
}

// Function to create a TextEditorHistory
TextEditorHistory *create_history(int capacity) {
  TextEditorHistory *history = (TextEditorHistory *)malloc(sizeof(TextEditorHistory));
  history->mementos = (TextEditorMemento *)malloc(capacity * sizeof(TextEditorMemento));
  history->size = 0;
  history->capacity = capacity;
  return history;
}

// Function to add a Memento to the history
void add_memento(TextEditorHistory *history, TextEditorMemento *memento) {
  if (history->size < history->capacity) {
    history->mementos[history->size++] = *memento;
  }
}

// Function to get the last Memento from the history
TextEditorMemento *get_last_memento(TextEditorHistory *history) {
  if (history->size > 0) {
    return &history->mementos[history->size - 1];
  }
  return NULL;
}

// Function to restore the TextEditor from a Memento
void restore_from_memento(TextEditor *editor, TextEditorMemento *memento) {
  strcpy(editor->state, memento->state);
}

// Function to free memory
void free_editor(TextEditor *editor) {
  free(editor->state);
  free(editor);
}

void free_memento(TextEditorMemento *memento) {
  free(memento->state);
  free(memento);
}

void free_history(TextEditorHistory *history) {
  free(history->mementos);
  free(history);
}

int main() {
  TextEditor *editor = create_text_editor();
  TextEditorHistory *history = create_history(5);

  set_state(editor, "Hello");
  add_memento(history, create_memento(get_state(editor)));

  set_state(editor, "World");
  add_memento(history, create_memento(get_state(editor)));

  printf("Current State: %s\n", get_state(editor));

  TextEditorMemento *last_memento = get_last_memento(history);
  if (last_memento) {
    restore_from_memento(editor, last_memento);
    printf("Restored State: %s\n", get_state(editor));
  }
  
  free_editor(editor);
  free_history(history);
  return 0;
}
```