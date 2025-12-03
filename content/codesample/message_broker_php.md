---
title: "Message Broker - PHP"
date: 2025-12-03T15:10:04.656-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["PHP"]
---
The Message Broker pattern decouples application components by enabling them to communicate through an intermediary message store. Components don't directly call each other; instead, they publish messages to the broker, and other components subscribe to specific message types to receive and process them. This enhances scalability, fault tolerance, and flexibility as components can be added or removed without impacting others.

This PHP implementation uses a simple array-based message store and callback functions for subscriptions.  `MessageBroker::publish()` adds a message to the store, triggering any registered subscribers for that message type. `MessageBroker::subscribe()` registers a callback associated with a message type.  It's a basic, in-memory broker suited for illustrating the concept; real-world scenarios would utilize a more robust queueing system like RabbitMQ or Redis. Using static methods for broker management and callable/closures for subscribers are common PHP practices.

```php
<?php

class MessageBroker
{
    private static array $subscriptions = [];
    private static array $messages = [];

    public static function subscribe(string $type, callable $callback): void
    {
        if (!isset(self::$subscriptions[$type])) {
            self::$subscriptions[$type] = [];
        }
        self::$subscriptions[$type][] = $callback;
    }

    public static function publish(string $type, mixed $data): void
    {
        self::$messages[$type][] = $data;

        if (isset(self::$subscriptions[$type])) {
            foreach (self::$subscriptions[$type] as $callback) {
                $callback($data);
            }
        }
    }

    public static function getMessages(string $type): array
    {
        return self::$messages[$type] ?? [];
    }
}

// Example Usage
$logHandler = function (mixed $message) {
    echo "Log: " . json_encode($message) . PHP_EOL;
};

$emailHandler = function (mixed $message) {
    echo "Email: " . $message['email'] . PHP_EOL;
};

MessageBroker::subscribe('logEvent', $logHandler);
MessageBroker::subscribe('userCreated', $emailHandler);

MessageBroker::publish('logEvent', ['timestamp' => time(), 'message' => 'Example log message']);
MessageBroker::publish('userCreated', ['name' => 'Alice', 'email' => 'alice@example.com']);

// Retrieve messages for a specific type
$logMessages = MessageBroker::getMessages('logEvent');
print_r($logMessages);

?>
```