---
title: "Publish-Subscribe - Python"
date: 2025-12-03T15:27:20.087-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Python"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) from message receivers (subscribers). Publishers don't know who their subscribers are, and subscribers only know *about* certain types of messages, not who is sending them. This is achieved through a message broker (often called a topic or channel).  This implementation uses a dictionary to store subscribers for each topic.  Publishers call `publish()` with a topic and message, which iterates through the subscribers and calls their update methods. This approach is Pythonic due to its use of dictionaries for flexible data storage and the reliance on duck typing – subscribers are expected to have an `update` method, regardless of their class.

```python
class Publisher:
    def __init__(self):
        self.subscribers = {}

    def subscribe(self, topic, subscriber):
        if topic not in self.subscribers:
            self.subscribers[topic] = []
        self.subscribers[topic].append(subscriber)

    def unsubscribe(self, topic, subscriber):
        if topic in self.subscribers:
            try:
                self.subscribers[topic].remove(subscriber)
            except ValueError:
                pass  # Subscriber not found in this topic

    def publish(self, topic, message):
        if topic in self.subscribers:
            for subscriber in self.subscribers[topic]:
                subscriber.update(message)


class Subscriber:
    def __init__(self, name):
        self.name = name

    def update(self, message):
        print(f"{self.name} received: {message}")


if __name__ == "__main__":
    publisher = Publisher()

    subscriber1 = Subscriber("Subscriber 1")
    subscriber2 = Subscriber("Subscriber 2")
    subscriber3 = Subscriber("Subscriber 3")

    publisher.subscribe("news", subscriber1)
    publisher.subscribe("news", subscriber2)
    publisher.subscribe("sports", subscriber3)

    publisher.publish("news", "Breaking news: Python 3.13 released!")
    publisher.publish("sports", "Local team wins championship!")
    publisher.publish("weather", "Sunny today") # No subscribers for this topic

    publisher.unsubscribe("news", subscriber1)
    publisher.publish("news", "Another news item") # Only subscriber2 receives
```