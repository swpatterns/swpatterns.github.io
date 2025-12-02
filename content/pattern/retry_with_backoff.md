
---
title: "Retry with Backoff"
date: 2024-02-29T16:54:32-08:00
draft: false
pattern_types: ["behavioral", "resilience"]
wikipedia: ""
diagramtype: "sequence"
diagram: "participant Client, participant Service\nClient->>Service: Request\nService-->>Client: Response (Success)\n\nloop On Failure\n  Client->>Service: Request\n  Service-->>Client: Error\n  Client->>Client: Wait (with backoff)\nend\n\nClient->>Service: Request\nService-->>Client: Response (Success)"
code: true
---

The Retry with Backoff pattern is a resilience strategy that automatically retries a failed operation after waiting for an increasing amount of time. This is particularly useful when dealing with transient failures, such as network glitches, temporary service unavailability, or resource contention. The "backoff" component prevents overwhelming the failing service with repeated requests in rapid succession, giving it time to recover.

This pattern enhances the robustness of applications by gracefully handling temporary issues without requiring immediate intervention. It improves user experience by minimizing disruptions and increasing the likelihood of successful operation completion.  The backoff strategy can be linear, exponential, or based on a jitter function to avoid synchronized retries from multiple clients.

## Usage

*   **Network Requests:**  Handling unreliable network connections by retrying HTTP requests with increasing delays. This is crucial for building distributed systems or applications interacting with external APIs.
*   **Database Operations:**  Retrying database transactions that might fail due to deadlocks, temporary locking, or connection issues.
*   **Message Queues:** Retrying sending messages to or consuming messages from message queues that might experience temporary outages.
*   **Cloud Service Interactions:** Interacting with cloud services (e.g., storage, compute) that may have rate limits or occasional availability problems.

## Examples

*   **Python `requests` library:** The `requests` library includes built-in retry mechanisms (often used with the `retry` package) that can be configured with exponential backoff.  This helps ensure that HTTP requests succeed even in the face of temporary network issues or server overloads.

    python
    import requests
    from requests.adapters import HTTPAdapter
    from urllib3.util.retry import Retry

    retry_strategy = Retry(
        total=3,
        backoff_factor=0.5,
        status_forcelist=[429, 500, 502, 503, 504],
        method_whitelist=["HEAD", "GET", "PUT", "DELETE", "OPTIONS", "TRACE", "POST"]
    )

    adapter = HTTPAdapter(max_retries=retry_strategy)
    http = requests.Session()
    http.mount("https://", adapter)
    http.mount("http://", adapter)

    response = http.get("https://example.com/api/data")
    

*   **AWS SDKs (e.g., boto3 for Python):** AWS SDKs automatically implement retry logic with exponential backoff for many API calls. The SDKs are configured to retry failed requests a certain number of times, increasing the delay between each attempt. This simplifies error handling for developers working with AWS services.

    python
    import boto3

    s3 = boto3.client('s3')

    try:
        response = s3.get_object(Bucket='my-bucket', Key='my-key')
    except s3.exceptions.NoSuchKey:
        print("Key not found")
    except Exception as e:
        print(f"An error occurred: {e}") #The SDK handles the retries internally.
    