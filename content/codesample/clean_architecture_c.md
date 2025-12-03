---
title: "Clean Architecture - C"
date: 2025-12-03T14:17:59.943-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["C"]
---
The Clean Architecture pattern separates the application into concentric layers: Entities (core business logic), Use Cases (application-specific logic), Interface Adapters (translates data), and Frameworks & Drivers (UI, DB, etc.). Dependencies point *inward* – outer layers depend on inner layers, but inner layers have no knowledge of outer ones. This promotes testability, maintainability, and flexibility. 

The example demonstrates a simple task list application. Entities are representations of a `Task`. Use Cases define operations like adding or listing tasks.  Interface Adapters use a `TaskPresenter` to format task data for output. Frameworks and Drivers are minimal, using standard C library functions for input/output. Function pointers are used to achieve dependency inversion, allowing for easily swappable output mechanisms during testing or runtime. This structure and reliance on function pointers reflect C’s power for low-level control and callback-based designs, avoiding explicit inheritance found in some other languages.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Entities
typedef struct {
  int id;
  char description[100];
  int completed;
} Task;

// Use Cases
typedef void (*TaskPresenter)(Task* tasks, int count);

typedef struct {
  Task tasks[100];
  int taskCount;
} TaskList;

void addTask(TaskList* taskList, const char* description) {
  taskList->tasks[taskList->taskCount].id = taskList->taskCount + 1;
  strncpy(taskList->tasks[taskList->taskCount].description, description, sizeof(taskList->tasks[taskList->taskCount].description) - 1);
  taskList->tasks[taskList->taskCount].completed = 0;
  taskList->taskCount++;
}

void listTasks(TaskList* taskList, TaskPresenter presenter) {
  presenter(taskList->tasks, taskList->taskCount);
}

// Interface Adapters
void printTasksToConsole(Task* tasks, int count) {
  for (int i = 0; i < count; i++) {
    printf("%d: %s (Completed: %s)\n", tasks[i].id, tasks[i].description, tasks[i].completed ? "Yes" : "No");
  }
}

// Frameworks & Drivers
int main() {
  TaskList taskList;
  taskList.taskCount = 0;

  addTask(&taskList, "Buy groceries");
  addTask(&taskList, "Wash the car");
  addTask(&taskList, "Do laundry");

  printf("Task List:\n");
  listTasks(&taskList, printTasksToConsole); // Dependency Injection

  return 0;
}
```