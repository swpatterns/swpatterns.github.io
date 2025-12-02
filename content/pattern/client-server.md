
---
title: Client-Server
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "distributed"]
wikipedia: "https://en.wikipedia.org/wiki/Client%E2%80%93server_model"
diagramtype: "sequence"
diagram: "sequenceDiagram\n    participant Client\n    participant Server\n    Client->>Server: Request\n    Server->>Server: Process Request\n    Server-->>Client: Response"
code: true
---

The Client-Server pattern is a distributed application structure that partitions tasks or workloads between providers of a resource or service, called servers, and requesters of that resource, called clients.  It fundamentally separates concerns: clients focus on user interface and request logic, while servers focus on data storage, processing, and security. This separation allows for greater scalability, maintainability, and resource sharing.

## Usage

The Client-Server pattern is ubiquitous in modern computing. It's used in web applications (browsers as clients, web servers as servers), email systems (email clients like Outlook or Thunderbird, email servers like Exchange or Gmail), database systems (applications as clients, database management systems as servers), and file sharing (clients requesting files from a file server).  It's also a core principle in microservices architectures, where individual services act as servers providing specific functionalities to client applications.  Cloud computing heavily relies on this pattern, with clients accessing resources and services hosted on remote servers.

## Examples

1. **Web Browsers and Web Servers:** A web browser (the client) requests a webpage from a web server (like Apache or Nginx). The server processes the request, retrieves the necessary HTML, CSS, and JavaScript files, and sends them back to the browser for rendering. This is a classic example of the Client-Server pattern.

2. **Database Applications and Database Servers:** Applications like a customer relationship management (CRM) system (the client) interact with a database server (like MySQL, PostgreSQL, or Oracle). The CRM application sends queries to the database server to retrieve, update, or delete data. The database server handles the data management and returns the results to the application.

3. **Email Clients and Email Servers:** An email client (like Outlook or Thunderbird) connects to an email server (like Exchange or Gmail's IMAP/SMTP servers). The client sends requests to retrieve emails, send new emails, or manage folders. The server handles the email storage, routing, and delivery.
