
---
title: Reverse Proxy
date: 2024-02-29T16:16:00Z
draft: false
pattern_types: ["structural", "infrastructure"]
wikipedia: https://en.wikipedia.org/wiki/Reverse_proxy
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Client
    participant ReverseProxy
    participant BackendServer1
    participant BackendServer2

    Client->>ReverseProxy: Request
    ReverseProxy->>BackendServer1: Forward Request
    BackendServer1->>ReverseProxy: Response
    ReverseProxy->>Client: Return Response

    alt Load Balancing Scenario
        Client->>ReverseProxy: Request
        ReverseProxy->>BackendServer2: Forward Request
        BackendServer2->>ReverseProxy: Response
        ReverseProxy->>Client: Return Response
    end

code: true
---

The Reverse Proxy pattern involves a server that sits in front of one or more backend servers and intercepts client requests. Instead of clients connecting directly to backend servers, they connect to the reverse proxy, which then forwards the requests to the appropriate backend server. The reverse proxy then receives responses from the backend and returns them to the client as if it originated from the proxy itself.

This pattern offers numerous benefits, including improved security, load balancing, scalability, and simplified administration. By hiding the complexities and specific configurations of the backend servers, the reverse proxy presents a unified interface to the outside world, enhancing the overall system architecture and resilience.

## Usage

Reverse proxies are widely used in modern web architectures for:

*   **Load Balancing:** Distributing client requests across multiple backend servers to prevent overload and improve responsiveness.
*   **Security:** Protecting backend servers from direct exposure to the internet, mitigating DDoS attacks, and providing SSL encryption.
*   **Caching:** Storing frequently accessed content closer to the client, reducing latency and server load.
*   **SSL Termination:** Offloading SSL encryption/decryption from backend servers, freeing up resources for application logic.
*   **URL Rewriting:** Simplifying complex URLs or masking internal server structures.
*   **A/B Testing:** Routing traffic to different versions of an application for testing purposes.

## Examples

*   **NGINX:** A popular open-source web server and reverse proxy, often used to handle static content, load balance traffic, and provide SSL termination for web applications. Many high-traffic websites rely on NGINX as a reverse proxy to ensure performance and availability.
*   **HAProxy:** Another widely used open-source load balancer and reverse proxy, known for its high performance and reliability. It's commonly deployed in front of database servers, application servers, and other network services to distribute traffic and improve resilience.
*   **Amazon CloudFront:** Amazon's Content Delivery Network (CDN) service acts as a reverse proxy, caching content at edge locations around the world to deliver faster and more reliable experiences to users. It also provides security features like DDoS protection.
*   **Varnish Cache:** A powerful HTTP accelerator (reverse proxy) designed for caching content. It's frequently used in front of web servers like Apache or Nginx to dramatically improve response times and reduce server load.
