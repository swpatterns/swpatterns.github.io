---
title: Store-and-Forward
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "communication"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant Sender
    participant Intermediary
    participant Receiver
    Sender->>Intermediary: Send Message
    Intermediary->>Intermediary: Store Message
    Intermediary->>Receiver: Forward Message
    Receiver->>Intermediary: Acknowledge Receipt
    Intermediary->>Sender: Acknowledge Forwarding
    "
code: true
---

The Store-and-Forward pattern is a communication paradigm where an intermediary component receives a complete message from a sender, stores it, and then forwards it to the intended recipient.  This decoupling allows the sender and receiver to operate independently, even if they are not simultaneously available. The intermediary acts as a buffer and ensures message delivery, handling potential network issues or receiver unavailability.

## Usage

This pattern is widely used in scenarios demanding reliable asynchronous communication. Common applications include email servers (storing emails until the recipient's server is available), message queues (like RabbitMQ or Kafka), and mobile network infrastructure (base stations storing data for mobile devices that move in and out of range). It's also crucial in distributed systems where components might experience intermittent connectivity. For example, applications handling offline processing, data synchronization services, or even chat applications can benefit from it.

## Examples

1. **Email Systems (SMTP):**  When you send an email, your email client transmits it to an SMTP server (the intermediary). The SMTP server stores the email and attempts to deliver it to the recipient's mail server.  If the recipient's server is unavailable, the sending SMTP server holds the message and retries later.  This ensures your email eventually reaches its destination, even with temporary network issues.

2. **RabbitMQ/Message Queues:** RabbitMQ is a popular message broker that utilizes Store-and-Forward.  Producers (senders) send messages to RabbitMQ, which stores them in queues. Consumers (receivers) retrieve messages from the queues when they are ready to process them.  RabbitMQ guarantees message delivery, even if consumers are temporarily offline, by persisting messages to disk. This is a core component of microservice architectures for asynchronous communication.
