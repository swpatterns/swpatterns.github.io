---
title: "Flyweight - C"
date: 2025-12-03T12:42:36.403-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["C"]
---
The Flyweight pattern aims to minimize memory usage by sharing as much data as possible between similar objects. It separates the object's state into intrinsic (shared) and extrinsic (unique) components.  Intrinsic state is stored in the flyweight object, while extrinsic state is passed to the flyweight as needed. This example represents trees in a forest, where leaf color and position are unique (extrinsic), but the tree *type* (e.g., oak, pine) is shared (intrinsic).  The `TreeType` struct holds the intrinsic state, and the `Tree` struct represents a concrete tree instance, receiving extrinsic state (x, y coordinates) at runtime. C's struct-based approach naturally lends itself to separating data this way.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Intrinsic State - Shared
typedef struct {
    char *type;
    char *description;
} TreeType;

// Flyweight Factory
typedef struct {
    TreeType *tree_types[5]; // Limited number of tree types
    int num_tree_types;
} Forest;

Forest *create_forest() {
    Forest *forest = (Forest *)malloc(sizeof(Forest));
    forest->num_tree_types = 0;
    return forest;
}

TreeType *get_tree_type(Forest *forest, const char *type) {
    for (int i = 0; i < forest->num_tree_types; i++) {
        if (strcmp(forest->tree_types[i]->type, type) == 0) {
            return forest->tree_types[i];
        }
    }

    // Create a new tree type if it doesn't exist
    TreeType *new_type = (TreeType *)malloc(sizeof(TreeType));
    new_type->type = strdup(type);
    new_type->description = strdup("Generic tree"); // Default description

    forest->tree_types[forest->num_tree_types++] = new_type;
    return new_type;
}

// Extrinsic State - Unique to each tree
typedef struct {
    TreeType *type;
    int x, y;
} Tree;

void draw_tree(Tree *tree) {
    printf("Drawing a %s tree at (%d, %d)\n", tree->type->type, tree->x, tree->y);
}

int main() {
    Forest *forest = create_forest();

    TreeType *oak = get_tree_type(forest, "Oak");
    TreeType *pine = get_tree_type(forest, "Pine");

    Tree tree1 = {oak, 10, 20};
    Tree tree2 = {pine, 30, 40};
    Tree tree3 = {oak, 50, 60};

    draw_tree(&tree1);
    draw_tree(&tree2);
    draw_tree(&tree3);

    // Clean up (important!)
    for (int i = 0; i < forest->num_tree_types; i++) {
        free(forest->tree_types[i]->type);
        free(forest->tree_types[i]->description);
        free(forest->tree_types[i]);
    }
    free(forest);

    return 0;
}
```