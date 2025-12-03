---
title: "N-tier - Python"
date: 2025-12-03T14:36:25.526-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Python"]
---
The N-tier pattern organizes an application into logical tiers – typically presentation, business logic, and data access – to improve maintainability, scalability, and testability. Each tier has a specific responsibility and interacts only with the tiers immediately above and below it. This example demonstrates a simple 3-tier architecture for managing user data. The `presentation_tier` handles user interaction (simulated here with simple functions), the `business_tier` contains the core logic for user operations, and the `data_tier` interacts with a data store (represented by a list in this example).  This structure is common in Python web applications, where frameworks like Flask or Django would handle the presentation tier, and ORMs like SQLAlchemy would manage the data tier.

```python
# data_tier.py
class UserData:
    def __init__(self):
        self.users = []

    def get_user(self, user_id):
        for user in self.users:
            if user['id'] == user_id:
                return user
        return None

    def create_user(self, name, email):
        user = {'id': len(self.users) + 1, 'name': name, 'email': email}
        self.users.append(user)
        return user

    def update_user(self, user_id, name=None, email=None):
        user = self.get_user(user_id)
        if user:
            if name:
                user['name'] = name
            if email:
                user['email'] = email
            return user
        return None

    def delete_user(self, user_id):
        self.users = [user for user in self.users if user['id'] != user_id]
        return True



# business_tier.py
from data_tier import UserData

class UserBusinessLogic:
    def __init__(self):
        self.data = UserData()

    def get_user_details(self, user_id):
        user = self.data.get_user(user_id)
        if user:
            return f"Name: {user['name']}, Email: {user['email']}"
        else:
            return "User not found."

    def add_user(self, name, email):
        if not name or not email:
            return "Name and email are required."
        return self.data.create_user(name, email)

    def modify_user(self, user_id, name=None, email=None):
        return self.data.update_user(user_id, name, email)

    def remove_user(self, user_id):
        return self.data.delete_user(user_id)


# presentation_tier.py
from business_tier import UserBusinessLogic

class UserInterface:
    def __init__(self):
        self.business_logic = UserBusinessLogic()

    def get_user(self, user_id):
        return self.business_logic.get_user_details(user_id)

    def create_user(self, name, email):
        return self.business_logic.add_user(name, email)

    def update_user(self, user_id, name=None, email=None):
        return self.business_logic.modify_user(user_id, name, email)

    def delete_user(self, user_id):
        return self.business_logic.remove_user(user_id)


if __name__ == '__main__':
    ui = UserInterface()
    
    new_user = ui.create_user("Alice", "alice@example.com")
    print(f"Created user: {new_user}")

    user_details = ui.get_user(1)
    print(f"User details: {user_details}")

    updated_user = ui.update_user(1, name = "Alicia")
    print(f"Updated user: {updated_user}")

    ui.delete_user(1)
    print(ui.get_user(1))
```