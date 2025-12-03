---
title: "Publish-Subscribe - PHP"
date: 2025-12-03T15:30:22.795-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["PHP"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) from message receivers (subscribers). Publishers don't know who their listeners are, and subscribers only know *that* messages of a certain type are published, not *who* publishes them. This promotes flexibility and scalability.

This PHP implementation utilizes spl_observer to achieve Pub/Sub. A `Subject` maintains a list of `SplObserver` subscribers and notifies them when a specific event occurs via `SplSubject::notify()`.  Event data is passed as an argument to the `update()` method of each observer.  This leverages PHP’s built-in observer pattern, making the code concise and readable, aligning with PHP’s emphasis on simplicity and utilizing existing language features.

```php
<?php

/**
 * Subject (Publisher) Interface
 */
interface Subject {
    public function attach(SplObserver $observer): void;
    public function detach(SplObserver $observer): void;
    public function notify(string $event, $data = null): void;
}

/**
 * Concrete Subject: Event Dispatcher
 */
class EventDispatcher implements Subject {
    private $observers = [];

    public function attach(SplObserver $observer): void {
        $this->observers[] = $observer;
    }

    public function detach(SplObserver $observer): void {
        $index = array_search($observer, $this->observers, true);
        if ($index !== false) {
            unset($this->observers[$index]);
        }
    }

    public function notify(string $event, $data = null): void {
        foreach ($this->observers as $observer) {
            $observer->update($this, $event, $data);
        }
    }
}

/**
 * Observer Interface (SplObserver already provides this)
 */
// interface Observer {
//     public function update(Subject $subject, string $event, $data = null): void;
// }

/**
 * Concrete Observer: Logger
 */
class Logger implements SplObserver {
    public function update(SplSubject $subject, string $event, $data = null): void {
        echo "Logger: Event '$event' occurred with data: " . print_r($data, true) . "\n";
    }
}

/**
 * Concrete Observer: Email Sender
 */
class EmailSender implements SplObserver {
    public function update(SplSubject $subject, string $event, $data = null): void {
        if ($event === 'user.registered') {
            echo "EmailSender: Sending welcome email to " . $data['email'] . "\n";
        }
    }
}

// Usage
$dispatcher = new EventDispatcher();

$logger = new Logger();
$emailSender = new EmailSender();

$dispatcher->attach($logger);
$dispatcher->attach($emailSender);

$dispatcher->notify('user.registered', ['email' => 'test@example.com', 'username' => 'testuser']);
$dispatcher->notify('order.placed', ['order_id' => 123, 'total' => 100]);

$dispatcher->detach($emailSender);

$dispatcher->notify('user.registered', ['email' => 'another@example.com', 'username' => 'anotheruser']);
?>
```