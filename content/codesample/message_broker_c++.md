---
title: "Message Broker - C++"
date: 2025-12-03T15:07:50.441-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["C++"]
---
The Message Broker pattern decouples application components by enabling them to communicate through intermediary message queues. Components, or "clients," don't directly call each other; instead, they publish messages to topics and subscribe to topics of interest. A central broker manages message delivery. This promotes scalability, flexibility, and resilience.

The C++ implementation uses a `MessageBroker` class to hold topic-to-subscriber mappings.  Clients register with the broker to receive messages for specific topics.  The `publish` method iterates through subscribers of a topic and delivers the message.  Using `std::function` allows for flexible subscriber callback types.  This approach leverages C++'s standard library for efficient data structures and function objects, fitting its object-oriented nature and promoting loose coupling.

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <map>
#include <string>

class MessageBroker {
public:
    using Callback = std::function<void(const std::string&)>;

    void subscribe(const std::string& topic, Callback callback) {
        subscribers[topic].push_back(callback);
    }

    void publish(const std::string& topic, const std::string& message) {
        for (auto& callback : subscribers[topic]) {
            callback(message);
        }
    }

private:
    std::map<std::string, std::vector<Callback>> subscribers;
};

// Example Clients
class ClientA {
public:
    void onMessage(const std::string& message) {
        std::cout << "Client A received: " << message << std::endl;
    }

    void registerWithBroker(MessageBroker& broker, const std::string& topic) {
        broker.subscribe(topic, std::bind(&ClientA::onMessage, this, std::placeholders::_1));
    }
};

class ClientB {
public:
    void onMessage(const std::string& message) {
        std::cout << "Client B received: " << message << std::endl;
    }

    void registerWithBroker(MessageBroker& broker, const std::string& topic) {
        broker.subscribe(topic, [this](const std::string& msg){ onMessage(msg); });
    }
};

int main() {
    MessageBroker broker;
    ClientA clientA;
    ClientB clientB;

    clientA.registerWithBroker(broker, "news");
    clientB.registerWithBroker(broker, "news");
    clientB.registerWithBroker(broker, "sports");

    broker.publish("news", "Breaking news: C++ is awesome!");
    broker.publish("sports", "Local team wins championship!");
    broker.publish("weather", "Sunny today!"); // No subscribers

    return 0;
}
```