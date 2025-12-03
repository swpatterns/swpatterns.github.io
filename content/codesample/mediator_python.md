---
title: "Mediator - Python"
date: 2025-12-03T13:14:04.300-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Python"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by preventing objects from referring to each other explicitly, instead letting a mediator handle their communication. This allows you to vary the interactions independently of the interacting objects. 

Here, `ChatMediator` is the mediator, coordinating messages between `User` objects.  Each user only knows the mediator, not other users.  The mediator implements `send_message`, which directs messages to the appropriate recipients based on their group membership. The use of abstract base classes (`ABC`, `abstractmethod`) and a central mediator class is consistent with Python's support for both OOP and design patterns, enhancing maintainability and flexibility.

```python
from abc import ABC, abstractmethod

class User(ABC):
    def __init__(self, name, mediator):
        self.name = name
        self.mediator = mediator

    @abstractmethod
    def send_message(self, message):
        pass

    def receive_message(self, message):
        print(f"{self.name} received: {message}")

class ConcreteUser(User):
    def send_message(self, message):
        self.mediator.send_message(self.name, message)

class Mediator(ABC):
    @abstractmethod
    def send_message(self, sender, message):
        pass

class ChatMediator(Mediator):
    def __init__(self):
        self.users = {}

    def add_user(self, user):
        self.users[user.name] = user

    def send_message(self, sender, message):
        for name, user in self.users.items():
            if name != sender:
                user.receive_message(f"{sender}: {message}")

if __name__ == '__main__':
    mediator = ChatMediator()
    user1 = ConcreteUser("Alice", mediator)
    user2 = ConcreteUser("Bob", mediator)
    user3 = ConcreteUser("Charlie", mediator)

    mediator.add_user(user1)
    mediator.add_user(user2)
    mediator.add_user(user3)

    user1.send_message("Hello everyone!")
    user2.send_message("Hi Alice!")
    user3.send_message("What's up?")
```