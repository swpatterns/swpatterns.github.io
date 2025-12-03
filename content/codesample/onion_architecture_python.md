---
title: "Onion Architecture - Python"
date: 2025-12-03T14:12:17.004-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Python"]
---
The Onion Architecture aims for loose coupling and high cohesion by organizing code into concentric layers. The core layer contains business rules, independent of any external concerns. Surrounding layers represent interfaces (ports) to adapt these rules to specific technologies like databases or UI frameworks. Dependencies always point inwards – outer layers depend on inner layers, not vice versa. This facilitates testability, maintainability, and adaptability.

The Python example uses packages to represent layers: `core` (entities & use cases), `interfaces` (ports/abstract base classes), and `infrastructure` (adapters for specific technologies). The `infrastructure` layer depends on `interfaces` and (through `interfaces`) on `core`. This maintains the dependency inversion principle central to the Onion Architecture.  Adopting a package-based approach is idiomatic Python for structuring larger projects and promotes clarity.

```python
# -*- coding: utf-8 -*-
"""
Onion Architecture Example in Python
"""

# core/entities.py
class User:
    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name

# core/use_cases.py
from .entities import User

class UserService:
    def __init__(self, user_repository):
        self.user_repository = user_repository

    def get_user(self, user_id):
        return self.user_repository.get(user_id)


# interfaces/user_repository.py
from abc import ABC, abstractmethod

class UserRepository(ABC):
    @abstractmethod
    def get(self, user_id):
        pass

# infrastructure/database_user_repository.py
from interfaces.user_repository import UserRepository

class DatabaseUserRepository(UserRepository):
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def get(self, user_id):
        # Simulate database interaction
        if user_id == 1:
            return User(1, "Alice")
        else:
            return None

# application.py (Entry Point / Composition Root)
from core.use_cases import UserService
from infrastructure.database_user_repository import DatabaseUserRepository

def configure_repositories():
    # Simulate database connection
    db_connection = "some_db_connection_string"
    return DatabaseUserRepository(db_connection)

def main():
    user_repository = configure_repositories()
    user_service = UserService(user_repository)
    user = user_service.get_user(1)

    if user:
        print(f"User ID: {user.user_id}, Name: {user.name}")
    else:
        print("User not found")

if __name__ == "__main__":
    main()
```