---
title: "Dependency Injection - Python"
date: 2025-12-03T11:19:14.244-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Python"]
---
Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. This promotes loose coupling, making the class more testable, reusable, and maintainable. Our Python example utilizes constructor injection – dependencies are provided through the class constructor.  The `NotificationService` depends on a `MessageSender`. Instead of `NotificationService` creating a `MessageSender`, we inject an instance of it. This is idiomatic Python due to its flexible nature and easy handling of objects as first-class citizens, avoiding tight coupling often seen in more statically typed languages. Using type hints enhances readability and allows for static analysis.

```python
from abc import ABC, abstractmethod
from typing import Protocol

class MessageSender(Protocol):
    """Protocol for message sending."""
    def send(self, message: str) -> None:
        """Sends a message."""
        ...


class EmailSender(MessageSender):
    def send(self, message: str) -> None:
        print(f"Sending email: {message}")


class SMSSender(MessageSender):
    def send(self, message: str) -> None:
        print(f"Sending SMS: {message}")


class NotificationService:
    """
    A service that sends notifications via a given message sender.
    Demonstrates Dependency Injection.
    """
    def __init__(self, message_sender: MessageSender):
        self.message_sender = message_sender

    def send_notification(self, message: str) -> None:
        self.message_sender.send(message)


# Usage:
if __name__ == "__main__":
    email_sender = EmailSender()
    notification_service_email = NotificationService(email_sender)
    notification_service_email.send_notification("Hello via email!")

    sms_sender = SMSSender()
    notification_service_sms = NotificationService(sms_sender)
    notification_service_sms.send_notification("Hello via SMS!")
```