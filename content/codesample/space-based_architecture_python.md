---
title: "Space-Based Architecture - Python"
date: 2025-12-03T14:56:25.144-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Python"]
---
The Space-Based Architecture pattern structures an application as a collection of independent, loosely coupled "spaces" that each handle a specific aspect of the overall functionality. These spaces communicate via well-defined interfaces, often using message passing or event-driven mechanisms. This promotes modularity, testability, and scalability.

The Python example below defines three spaces: `AuthenticationSpace`, `UserProfileSpace`, and `DataProcessingSpace`. Each space encapsulates its logic and exposes methods for interaction. A simple `MessageBus` facilitates communication between them. This approach aligns with Python's emphasis on modularity and readability, leveraging classes to represent spaces and functions for their internal operations. The message bus is a common pattern in Python for decoupling components.

```python
# message_bus.py
class MessageBus:
    def __init__(self):
        self.handlers = {}

    def register_handler(self, event_type, handler):
        if event_type not in self.handlers:
            self.handlers[event_type] = []
        self.handlers[event_type].append(handler)

    def publish(self, event_type, data):
        if event_type in self.handlers:
            for handler in self.handlers[event_type]:
                handler(data)

# authentication_space.py
class AuthenticationSpace:
    def __init__(self, message_bus):
        self.message_bus = message_bus
        self.message_bus.register_handler("user_login_request", self.handle_login)

    def handle_login(self, user_data):
        # Simulate authentication logic
        if user_data["username"] == "user" and user_data["password"] == "password":
            self.message_bus.publish("user_login_success", {"user_id": 123})
        else:
            self.message_bus.publish("user_login_failure", {"error": "Invalid credentials"})

    def request_login(self, username, password):
        self.message_bus.publish("user_login_request", {"username": username, "password": password})

# user_profile_space.py
class UserProfileSpace:
    def __init__(self, message_bus):
        self.message_bus = message_bus
        self.message_bus.register_handler("user_login_success", self.load_profile)
        self.user_profile = None

    def load_profile(self, user_id):
        # Simulate loading user profile
        self.user_profile = {"id": user_id, "name": "Example User"}
        print(f"User profile loaded: {self.user_profile}")

    def get_profile(self):
        return self.user_profile

# data_processing_space.py
class DataProcessingSpace:
    def __init__(self, message_bus):
        self.message_bus = message_bus
        self.message_bus.register_handler("user_login_success", self.start_processing)

    def start_processing(self, user_id):
        # Simulate data processing
        print(f"Starting data processing for user {user_id}")

# main.py
if __name__ == "__main__":
    bus = MessageBus()
    auth_space = AuthenticationSpace(bus)
    profile_space = UserProfileSpace(bus)
    data_space = DataProcessingSpace(bus)

    auth_space.request_login("user", "password")
    auth_space.request_login("wrong_user", "wrong_password")
```