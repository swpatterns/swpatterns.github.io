---
title: "Pipes and Filters - C"
date: 2025-12-03T15:20:48.005-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["C"]
---
The Pipes and Filters pattern processes a stream of data by breaking it down into a series of independent processing steps (filters) connected by channels (pipes). Each filter performs a specific transformation and passes the result to the next filter. This promotes modularity, reusability, and simplifies complex processing pipelines.

The C implementation uses a series of functions as filters, each taking a stream (represented as `FILE*`) as input and output.  `pipe()` creates the communication channels between filters.  `dup2()` redirects standard input/output to these pipes.  This approach leverages C's standard I/O and process control mechanisms, fitting its procedural style. Error handling is included for robustness.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <ctype.h>

// Filter 1: Uppercase filter
void uppercase_filter(FILE *in, FILE *out) {
    int c;
    while ((c = fgetc(in)) != EOF) {
        fputc(toupper(c), out);
    }
}

// Filter 2: Remove spaces filter
void remove_spaces_filter(FILE *in, FILE *out) {
    int c;
    while ((c = fgetc(in)) != EOF) {
        if (c != ' ') {
            fputc(c, out);
        }
    }
}

int main() {
    int pipe1[2];
    int pipe2[2];
    pid_t pid1, pid2;

    if (pipe(pipe1) == -1 || pipe(pipe2) == -1) {
        perror("pipe");
        exit(EXIT_FAILURE);
    }

    pid1 = fork();
    if (pid1 == -1) {
        perror("fork");
        exit(EXIT_FAILURE);
    }

    if (pid1 == 0) { // Child 1: Uppercase filter
        dup2(pipe1[0], STDIN_FILENO);
        dup2(pipe1[1], STDOUT_FILENO);
        close(pipe1[0]);
        close(pipe1[1]);
        close(pipe2[0]);
        close(pipe2[1]);
        uppercase_filter(stdin, stdout);
        exit(EXIT_SUCCESS);
    }

    pid2 = fork();
    if (pid2 == -1) {
        perror("fork");
        exit(EXIT_FAILURE);
    }

    if (pid2 == 0) { // Child 2: Remove spaces filter
        dup2(pipe1[1], STDIN_FILENO);
        dup2(pipe2[1], STDOUT_FILENO);
        close(pipe1[0]);
        close(pipe1[1]);
        close(pipe2[0]);
        close(pipe2[1]);
        remove_spaces_filter(stdin, stdout);
        exit(EXIT_SUCCESS);
    }

    // Parent: Connect to the pipeline and read the output
    close(pipe1[0]);
    close(pipe1[1]);
    close(pipe2[1]);

    FILE *output = fdopen(pipe2[0], "r");
    if (output == NULL) {
        perror("fdopen");
        exit(EXIT_FAILURE);
    }

    char buffer[100];
    printf("Output: ");
    while (fgets(buffer, sizeof(buffer), output) != NULL) {
        printf("%s", buffer);
    }

    fclose(output);
    wait(NULL);
    wait(NULL);

    return 0;
}
```