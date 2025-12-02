
---
title: "Timeout"
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: ""
diagramtype: "sequence"
diagram: "participant Client\nparticipant Operation\nparticipant Timer\n\nClient->>Operation: Request operation\nactivate Operation\nOperation->>Timer: Start timeout timer (duration)\nactivate Timer\nTimer-->>Operation: Timeout signal (if operation takes too long)\ndeactivate Timer\nalt Timeout occurred\nOperation-->>Client: Error: Operation timed out\ndeactivate Operation\nelse Operation completed\nOperation-->>Client: Result\ndeactivate Operation\nend"
code: true
---

The Timeout pattern addresses the problem of operations that may take an indefinite or excessively long time to complete. It introduces a mechanism to automatically cancel or signal an error when an operation exceeds a predefined duration. This prevents resources from being held indefinitely and improves system responsiveness by avoiding blocking scenarios.

This pattern is crucial in concurrent and distributed systems where network latency or processing delays can lead to hangs. It's commonly used in client-server communication, asynchronous tasks, and any situation where a predictable completion time is desired.  Without timeouts, a system can become vulnerable to denial-of-service attacks or simply unresponsive due to slow or failing components.

## Usage

*   **Network Requests:**  Preventing indefinite blocking when waiting for responses from external services.  Most HTTP clients and database connectors implement timeouts.
*   **Asynchronous Operations:** Ensuring that background tasks don't run forever, potentially leaking resources or causing deadlocks. Consider a worker queue processing items; a timeout can prevent a single problematic item from halting the entire queue.
*   **User Interface Responsiveness:**  Giving users feedback and the ability to cancel long-running operations in a GUI application.
*   **Resource Management:** Reclaiming resources that are held by long-running or unresponsive operations.

## Examples

1.  **Ruby's `Timeout` Block:** Ruby provides a `Timeout` block that allows you to specify a maximum execution time for a section of code. If the code within the block exceeds the timeout, a `Timeout::Error` exception is raised.

    ruby
    require 'timeout'

    begin
      Timeout.timeout(5) do # Timeout after 5 seconds
        # Long-running operation
        puts "Starting operation..."
        sleep(6) # Simulate a long operation
        puts "Operation completed."
      end
    rescue Timeout::Error
      puts "Operation timed out!"
    end
    

2.  **Python's `threading.Timer`:** The `threading.Timer` class in Python allows you to schedule a function to be run after a specified delay. This can be used to implement a timeout mechanism by scheduling a function to raise an exception or take other action if the operation doesn't complete within the timeout period.

    python
    import threading
    import time

    def timeout_handler():
        print("Operation timed out!")
        # Set a flag to indicate timeout, or raise an exception

    def long_running_operation():
        print("Starting long operation...")
        time.sleep(6)  # Simulate a long operation
        print("Long operation finished.")

    timer = threading.Timer(5, timeout_handler)  # Timeout after 5 seconds
    timer.start()

    long_running_operation()

    timer.cancel() # Cancel the timer if the operation completes successfully
    