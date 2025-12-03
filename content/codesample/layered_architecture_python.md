---
title: "Layered Architecture - Python"
date: 2025-12-03T14:03:27.299-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Python"]
---
The Layered Architecture pattern organizes an application into distinct layers, each performing a specific role. This promotes separation of concerns, making the application more maintainable and testable. Typically, layers include Presentation (UI), Business Logic, and Data Access.  Requests flow downwards through layers, and responses flow upwards.  

This Python example demonstrates a simplified layered structure for a user management system. The `presentation_layer` handles user interaction (simulated here with print statements). The `business_layer` contains the core logic for user operations. The `data_access_layer` interacts with a data store (represented by a simple list).  The layers are separated into different modules, and each layer only knows about the layer directly below it, adhering to the principle of loose coupling. This structure is common in Python applications, especially those aiming for scalability and maintainability.

```python
# presentation_layer.py
from business_layer import UserBusinessLogic

def main():
    business_logic = UserBusinessLogic()

    user_id = 1
    user_data = business_logic.get_user(user_id)

    if user_data:
        print(f"User found: {user_data}")
    else:
        print("User not found.")

    new_user = {"id": 2, "name": "Jane Doe"}
    business_logic.create_user(new_user)
    print("User created.")

# business_layer.py
from data_access_layer import UserRepository

class UserBusinessLogic:
    def __init__(self):
        self.user_repository = UserRepository()

    def get_user(self, user_id):
        return self.user_repository.get_user_by_id(user_id)

    def create_user(self, user_data):
        self.user_repository.create_user(user_data)

# data_access_layer.py
class UserRepository:
    def __init__(self):
        self.users = []  # In-memory data store

    def get_user_by_id(self, user_id):
        for user in self.users:
            if user["id"] == user_id:
                return user
        return None

    def create_user(self, user_data):
        self.users.append(user_data)

if __name__ == "__main__":
    main()
```