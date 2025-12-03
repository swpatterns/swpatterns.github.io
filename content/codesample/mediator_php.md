---
title: "Mediator - PHP"
date: 2025-12-03T13:17:31.746-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["PHP"]
---
The Mediator pattern defines a central object that encapsulates how a set of objects interact. It promotes loose coupling by preventing objects from referring to each other explicitly, and instead allowing communication through the mediator. This reduces dependencies and improves maintainability.

The example below simulates a chat room. `ChatRoom` is the Mediator. `Participant` objects (users) don't know about each other, only the `ChatRoom`.  They register with the `ChatRoom` and send messages *to* the `ChatRoom` which then broadcasts them to all other participants.  This aligns with PHP's object-oriented principles and avoids tight coupling between chat participants.  Use of interfaces allows for flexibility with different participant types or chat room implementations.

```php
<?php

/**
 * Interface for Participants in the chat room.
 */
interface Participant
{
    public function receive(string $message);
    public function send(string $message);
}

/**
 * The Mediator interface.
 */
interface ChatMediator
{
    public function sendMessage(string $message, Participant $sender);
    public function addParticipant(Participant $participant);
}

/**
 * Concrete Mediator: The Chat Room.
 */
class ChatRoom implements ChatMediator
{
    private array $participants = [];

    public function addParticipant(Participant $participant): void
    {
        $this->participants[] = $participant;
    }

    public function sendMessage(string $message, Participant $sender): void
    {
        foreach ($this->participants as $participant) {
            if ($participant !== $sender) {
                $participant->receive($message);
            }
        }
    }
}

/**
 * Concrete Participant: A User.
 */
class User implements Participant
{
    private string $name;
    private ChatMediator $chatRoom;

    public function __construct(string $name, ChatMediator $chatRoom)
    {
        $this->name = $name;
        $this->chatRoom = $chatRoom;
        $this->chatRoom->addParticipant($this);
    }

    public function receive(string $message): void
    {
        echo $this->name . " received: " . $message . PHP_EOL;
    }

    public function send(string $message): void
    {
        $this->chatRoom->sendMessage($message, $this);
    }
}


// Usage
$chatRoom = new ChatRoom();

$alice = new User("Alice", $chatRoom);
$bob = new User("Bob", $chatRoom);
$charlie = new User("Charlie", $chatRoom);

$alice->send("Hello everyone!");
$bob->send("Hi Alice!");

?>
```