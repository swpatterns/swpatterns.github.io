---
title: "Shared-Nothing - C"
date: 2025-12-03T15:12:44.930-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["C"]
---
The Shared-Nothing architecture is a distributed computing model where each node in the system has its own private resources – CPU, memory, and disk – and communicates with other nodes via a network. There is no shared memory or shared storage. This promotes scalability and fault tolerance.

This C example simulates a simplified shared-nothing system with two worker processes. Each process has its own data (an integer) and performs a simple calculation. They communicate using pipes to exchange data and results. This avoids any shared memory, adhering to the pattern. The use of `fork()` and pipes is a standard approach for inter-process communication in C, making it idiomatic. Error handling is included for robustness.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

#define NUM_WORKERS 2

int main() {
    int pipes[NUM_WORKERS][2];
    pid_t worker_pids[NUM_WORKERS];
    int worker_data[NUM_WORKERS] = {10, 20};
    int results[NUM_WORKERS];

    // Create pipes
    for (int i = 0; i < NUM_WORKERS; i++) {
        if (pipe(pipes[i]) == -1) {
            perror("pipe");
            exit(EXIT_FAILURE);
        }
    }

    // Fork workers
    for (int i = 0; i < NUM_WORKERS; i++) {
        worker_pids[i] = fork();
        if (worker_pids[i] == -1) {
            perror("fork");
            exit(EXIT_FAILURE);
        }

        if (worker_pids[i] == 0) { // Worker process
            // Close unused pipe ends
            for (int j = 0; j < NUM_WORKERS; j++) {
                if (j != i) {
                    close(pipes[j][0]);
                    close(pipes[j][1]);
                }
            }

            // Read data from pipe
            read(pipes[i][0], &worker_data[i], sizeof(int));

            // Perform calculation
            int result = worker_data[i] * 2;

            // Send result back through the pipe
            write(pipes[i][1], &result, sizeof(int));

            close(pipes[i][0]);
            close(pipes[i][1]);
            exit(EXIT_SUCCESS);
        }
    }

    // Parent process
    for (int i = 0; i < NUM_WORKERS; i++) {
        // Send data to worker
        write(pipes[i][1], &worker_data[i], sizeof(int));

        // Read result from worker
        read(pipes[i][0], &results[i], sizeof(int));

        // Wait for worker process to finish
        waitpid(worker_pids[i], NULL, 0);

        // Close pipe ends
        close(pipes[i][0]);
        close(pipes[i][1]);

        printf("Worker %d: Input = %d, Result = %d\n", i, worker_data[i], results[i]);
    }

    return 0;
}
```