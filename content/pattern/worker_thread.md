
---
title: Worker Thread
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["concurrency", "behavioral"]
wikipedia: https://en.wikipedia.org/wiki/Worker_pool
diagramtype: "class"
diagram: "[Client] --o [Task] : submits\n[Task] --o [Worker] : executes\n[Worker] --o [Result] : returns\n[ThreadPool] *--o [Worker] : manages\n[ThreadPool] --o [Client] : provides workers"
code: true
---

The Worker Thread pattern addresses the need to perform potentially long-running or blocking operations without freezing the main thread of an application, ensuring a responsive user interface or continued service availability. It achieves this by delegating work to a pool of worker threads that operate concurrently, processing tasks in the background and returning results to the initiating thread when complete. This pattern is a fundamental technique for improving application performance and scalability.

This pattern is often used in applications that handle network requests, process large datasets, perform complex computations, or interact with external systems. Common uses include web servers handling multiple client connections, image or video processing applications, and data analytics pipelines. By allowing the main thread to remain free, applications powered by worker threads can provide a smoother user experience and handle a larger volume of requests.

## Usage

*   **Web Servers:** Handling multiple incoming HTTP requests concurrently using a thread pool.
*   **Image/Video Processing:** Offloading computationally intensive tasks like filtering, encoding, or rendering to worker threads.
*   **Data Analysis:** Processing large datasets in parallel by dividing the work into smaller tasks.
*   **Background Jobs:** Executing tasks like sending emails, generating reports, or updating databases without blocking the UI.
*   **Game Development:** Handling AI calculations, physics simulations, and other non-critical updates in separate threads

## Examples

1.  **Java Executor Framework:** Java's `ExecutorService` provides a framework for managing pools of threads. You submit `Runnable` or `Callable` tasks to the `ExecutorService`, which then distributes them among the available worker threads.  The `Future` object returned by `submit()` allows you to check the status of the task and retrieve the result.

    java
    ExecutorService executor = Executors.newFixedThreadPool(10);
    Future<String> future = executor.submit(() -> {
        // Long-running task
        return "Task completed";
    });

    System.out.println(future.get()); // Get the result (blocks until complete)
    executor.shutdown();
    

2.  **Python `threading` Module:** Python’s `threading` module enables concurrent execution using threads. The `ThreadPoolExecutor` class provides a high-level interface for managing a pool of threads, similar to Java’s `ExecutorService`.

    python
    from concurrent.futures import ThreadPoolExecutor

    def task(n):
        # Simulate a long-running task
        return n * n

    with ThreadPoolExecutor(max_workers=4) as executor:
        results = executor.map(task, range(10))
        for result in results:
            print(result)
    