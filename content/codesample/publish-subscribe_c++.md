---
title: "Publish-Subscribe - C++"
date: 2025-12-03T15:28:25.971-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["C++"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message publishers from message subscribers. Publishers emit messages to a topic without knowing who (if anyone) is listening. Subscribers express interest in specific topics and receive notifications when new messages are published to those topics.  This implementation uses function objects (functionality that acts like an object) to represent subscribers and a central `EventBus` to manage subscriptions and message delivery.  Using `std::function` allows for flexible subscriber registration (member functions, lambdas, etc.). The code follows modern C++ practices by utilizing `std::vector` for storage and range-based for loops for iteration.

```cpp
 #include <iostream>
 #include <vector>
 #include <functional>
 #include <string>
 
 class EventBus {
 public:
  using Callback = std::function<void(const std::string&)>;
 
  void subscribe(const std::string& eventType, Callback callback) {
   subscribers_[eventType].push_back(callback);
  }
 
  void unsubscribe(const std::string& eventType, Callback callback) {
   auto& subs = subscribers_[eventType];
   subs.erase(std::remove_if(subs.begin(), subs.end(), 
                            [&](const Callback& sub) { return sub.target<void(const std::string&)>() == callback.target<void(const std::string&)>(); }), 
             subs.end());
  }
 
  void publish(const std::string& eventType, const std::string& data) {
   for (const auto& callback : subscribers_[eventType]) {
    callback(data);
   }
  }
 
 private:
  std::unordered_map<std::string, std::vector<Callback>> subscribers_;
 };
 
 // Example Usage
 class MySubscriber {
 public:
  void onEvent(const std::string& data) {
   std::cout << "MySubscriber received event: " << data << std::endl;
  }
 };
 
 int main() {
  EventBus eventBus;
  MySubscriber subscriber;
 
  // Subscribe using a member function pointer
  eventBus.subscribe("user.created", [&](const std::string& data) {
   std::cout << "Lambda Subscriber received event: " << data << std::endl;
  });
  eventBus.subscribe("user.created", std::bind(&MySubscriber::onEvent, &subscriber, std::placeholders::_1));
 
  // Publish events
  eventBus.publish("user.created", "New user: Alice");
  eventBus.publish("user.updated", "User profile updated");
 
  return 0;
 }
 ```