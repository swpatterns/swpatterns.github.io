---
title: "Clean Architecture - Python"
date: 2025-12-03T14:16:40.609-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Python"]
---
The Clean Architecture pattern aims to create systems independent of frameworks, databases, UI, and any external agency. It achieves this through layered organization: Entities (business rules), Use Cases (application logic), Interface Adapters (translating data), and Frameworks & Drivers (external details). This example demonstrates a simplified structure with core business logic separated from external dependencies. It uses Python’s flexibility to define interfaces (abstract base classes) and dependency injection for loose coupling. The separation of concerns makes the core logic easily testable and adaptable to changes in frameworks or infrastructure without impact on the core.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass

# Entities - Core Business Rules
@dataclass
class User:
    id: int
    name: str
    email: str

# Use Cases - Application Logic
class UserRegistrationUseCase:
    def __init__(self, user_repository):
        self.user_repository = user_repository

    def register_user(self, name: str, email: str) -> User:
        user = User(id=self.user_repository.next_id(), name=name, email=email)
        self.user_repository.save(user)
        return user

# Interface Adapters - Data Translation
class UserRepositoryInterface(ABC):
    @abstractmethod
    def save(self, user: User):
        pass

    @abstractmethod
    def get_by_id(self, user_id: int) -> User:
        pass

    @abstractmethod
    def next_id(self) -> int:
        pass

# Frameworks & Drivers - Implementation Details
class InMemoryUserRepository(UserRepositoryInterface):
    def __init__(self):
        self.users = {}
        self.next_user_id = 1

    def save(self, user: User):
        self.users[user.id] = user

    def get_by_id(self, user_id: int) -> User:
        return self.users.get(user_id)

    def next_id(self) -> int:
        user_id = self.next_user_id
        self.next_user_id += 1
        return user_id

# Main Application - Wiring everything together
if __name__ == "__main__":
    user_repository = InMemoryUserRepository()
    registration_use_case = UserRegistrationUseCase(user_repository)

    new_user = registration_use_case.register_user("Alice", "alice@example.com")
    print(f"Registered user: {new_user}")

    retrieved_user = user_repository.get_by_id(new_user.id)
    print(f"Retrieved user: {retrieved_user}")
```