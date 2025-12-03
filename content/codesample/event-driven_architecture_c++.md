---
title: "Event-Driven Architecture - C++"
date: 2025-12-03T14:52:38.146-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["C++"]
---
The Event-Driven Architecture (EDA) decouples software components by allowing them to communicate through events. Components don't directly call each other; instead, they publish events, and other components subscribe to those events to react accordingly. This promotes flexibility and scalability.

This C++ implementation uses a simple event system with a central `EventManager` class. Events are represented as function pointers. Components register their interest in specific events with the `EventManager`. When an event occurs, the `EventManager` iterates through its registered handlers and invokes them. This uses function pointers, a common C++ technique for callbacks, and avoids complex dependencies between components. The use of `std::function` allows for more flexible event handlers (lambdas, function objects, etc.).

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <map>

class EventManager {
public:
    using EventHandler = std::function<void()>;

    void registerEvent(const std::string& eventName, EventHandler handler) {
        eventHandlers[eventName].push_back(handler);
    }

    void unregisterEvent(const std::string& eventName, EventHandler handler) {
        auto& handlers = eventHandlers[eventName];
        handlers.erase(std::remove_if(handlers.begin(), handlers.end(),
                                      [&](const EventHandler& h) { return h.target<void (*)()>() == handler.target<void (*)()>(); }),
                       handlers.end());
    }

    void publishEvent(const std::string& eventName) {
        auto it = eventHandlers.find(eventName);
        if (it != eventHandlers.end()) {
            for (const auto& handler : it->second) {
                handler();
            }
        }
    }

private:
    std::map<std::string, std::vector<EventHandler>> eventHandlers;
};

// Example Components
class Sensor {
public:
    Sensor(EventManager& eventManager) : eventManager_(eventManager) {}

    void detectMotion() {
        std::cout << "Motion detected!" << std::endl;
        eventManager_.publishEvent("motionDetected");
    }

private:
    EventManager& eventManager_;
};

class Logger {
public:
    Logger(EventManager& eventManager) : eventManager_(eventManager) {
        eventManager_.registerEvent("motionDetected", [this]() { logMotion(); });
    }

    ~Logger() {
        eventManager_.unregisterEvent("motionDetected", [this]() { logMotion(); });
    }

    void logMotion() {
        std::cout << "Logging motion event..." << std::endl;
    }

private:
    EventManager& eventManager_;
};

int main() {
    EventManager eventManager;
    Sensor sensor(eventManager);
    Logger logger(eventManager);

    sensor.detectMotion();

    return 0;
}
```