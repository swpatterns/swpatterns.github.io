---
title: "Mediator - C++"
date: 2025-12-03T13:15:12.218-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["C++"]
---
The Mediator pattern defines a one-to-many dependency between objects. Instead of objects interacting directly, communication flows through a mediator object. This reduces coupling and promotes a more loosely coupled system, making it easier to modify and maintain.

Our example simulates a chat room where users communicate. The `ChatMediator` interface defines the communication method, and `ConcreteMediator` implements it, managing the user list and broadcasting messages.  `User` objects only know the mediator; they don’t know about each other directly. This adheres to C++ principles of encapsulation and separation of concerns, using interfaces for flexibility and minimizing direct dependencies between classes. The class structure and standard library usage (like `std::vector`) are common C++ idioms.

```cpp
#include <iostream>
#include <vector>
#include <string>

// Mediator Interface
class ChatMediator {
public:
    virtual void sendMessage(int userId, std::string message) = 0;
    virtual void addUser(int userId) = 0;
};

// Concrete Mediator
class ConcreteMediator : public ChatMediator {
private:
    std::vector<int> users;

public:
    void addUser(int userId) override {
        users.push_back(userId);
    }

    void sendMessage(int userId, std::string message) override {
        for (int user : users) {
            if (user != userId) {
                std::cout << "User " << userId << " to User " << user << ": " << message << std::endl;
            }
        }
    }
};

// Colleague Interface
class User {
public:
    User(int id, ChatMediator* mediator) : userId(id), mediator(mediator) {
        mediator->addUser(id);
    }

    void send(std::string message) {
        mediator->sendMessage(userId, message);
    }

private:
    int userId;
    ChatMediator* mediator;
};

int main() {
    ConcreteMediator mediator;

    User user1(1, &mediator);
    User user2(2, &mediator);
    User user3(3, &mediator);

    user1.send("Hello, everyone!");
    user2.send("Hi user1!");
    user3.send("Greetings!");

    return 0;
}
```