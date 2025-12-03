---
title: "Message Broker - Python"
date: 2025-12-03T15:06:31.952-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Python"]
---
The Message Broker pattern decouples application components by enabling asynchronous communication. Instead of components directly calling each other, they send and receive messages via a central message broker. This improves scalability, resilience, and flexibility.  This example uses Python’s `pubsub` library for a simple implementation. Publishers “publish” messages to a topic without knowing who the subscribers are. Subscribers register their interest in specific topics and receive messages published to those topics. This approach is idiomatic Python due to its emphasis on readability and leveraging existing libraries for common tasks, avoiding unnecessary complexity.

```python
# message_broker.py
import pubsub

class MessageBroker:
    def __init__(self):
        self.pub = pubsub.Publisher()
        self.sub = pubsub.Subscriber()

    def publish(self, topic, message):
        self.pub.publish(topic, message)

    def subscribe(self, topic, callback):
        self.sub.subscribe(topic, callback)
        return self.sub.unsubscribe  # Return unsubscribe function

def subscriber_function(message, topic):
    print(f"Subscriber received: {message} on topic: {topic}")

if __name__ == '__main__':
    broker = MessageBroker()

    # Subscribe to a topic
    unsubscribe = broker.subscribe("my_topic", subscriber_function)

    # Publish messages
    broker.publish("my_topic", "Hello, world!")
    broker.publish("my_topic", "Another message")
    broker.publish("another_topic", "This is a different topic")

    # Unsubscribe (optional)
    # unsubscribe()
```