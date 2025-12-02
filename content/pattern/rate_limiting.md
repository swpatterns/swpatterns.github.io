
---
title: Rate Limiting
date: 2024-02-29T16:34:00Z
draft: false
pattern_types: ["behavioral", "resilience", "microservices"]
wikipedia: https://en.wikipedia.org/wiki/Rate_limiting
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant User\n  participant API Gateway\n  participant Backend Service\n  User->>API Gateway: Request\n  activate API Gateway\n  API Gateway->>API Gateway: Check Rate Limit\n  alt Rate Limit Exceeded\n    API Gateway-->>User: 429 Too Many Requests\n  else Rate Limit Ok\n    API Gateway->>Backend Service: Forward Request\n    activate Backend Service\n    Backend Service-->>API Gateway: Response\n    deactivate Backend Service\n    API Gateway-->>User: Response\n  end\n  deactivate API Gateway"
code: true
---

Rate limiting is a technique used to control the rate at which users or systems can access a resource. This is crucial for preventing abuse, ensuring service availability, and protecting backend systems from overload. By limiting the number of requests within a specific timeframe, rate limiting helps to maintain a stable and reliable system, especially under high load.

The pattern typically involves tracking requests from a specific source (e.g., IP address, user ID, API key) and enforcing a defined limit. When the limit is exceeded, the system responds with an error, such as a 429 "Too Many Requests" HTTP status code, or may temporarily block the offending source. Effective rate limiting requires careful consideration of the appropriate limits, tracking mechanisms, and error handling strategies based on the specific needs of the application and anticipated usage patterns.

## Usage

Rate limiting is commonly used in a variety of scenarios:

*   **Public APIs:** Protecting APIs from excessive calls by malicious actors or poorly written clients.
*   **Web Scraping Prevention:** Discouraging automated scraping of websites by limiting the number of requests from a single IP address.
*   **Brute-Force Attack Mitigation:** Preventing attackers from repeatedly trying to guess passwords by limiting login attempts.
*   **Resource Protection:** Safeguarding expensive or limited resources, such as database queries or third-party service calls.
*   **Microservices Architecture:** Controlling the flow of requests between microservices to prevent cascading failures.
*   **User Account Protection:** Limiting actions like password resets or email sending to prevent abuse of user accounts.

## Examples

1.  **Twitter API:** Twitter employs rate limiting extensively for its API. Different API endpoints have different rate limits, which are documented for developers. These limits are based on factors like authentication type (application-only vs. user-context) and endpoint usage. The API returns specific rate limit headers with each response, informing developers how many requests they have remaining and when the limits will reset.

2.  **GitHub API:** Similar to Twitter, GitHub also uses rate limiting to protect its API.  GitHub's rate limits are based on authenticated vs. unauthenticated requests, with authenticated requests receiving significantly higher limits. They provide detailed documentation on their rate limits and how to handle 403 errors (which indicate rate limiting) using the `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers.

3.  **Redis RateLimiter:** The Redis RateLimiter library (available in multiple languages) provides a flexible and scalable way to implement rate limiting using Redis as a storage backend. It allows defining rate limits based on various keys (e.g., user ID, IP address) and uses Redis's atomic operations to ensure accurate request counting and limit enforcement. This is often used in microservices architectures where a centralized rate limiting service is needed.
