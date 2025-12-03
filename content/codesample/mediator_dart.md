---
title: "Mediator - Dart"
date: 2025-12-03T13:18:03.974-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Dart"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by preventing objects from referring to each other explicitly, and lets you vary their interaction independently. In this example, a `ChatRoom` acts as the mediator between `User` objects. Users don't directly send messages to each other; they send them to the chatroom, which then broadcasts them to the relevant participants.  Dart’s use of interfaces and classes makes OOP-based mediator implementations clean.  The `ChatRoom` holds a list of users and manages their communication, adhering to the pattern’s core principle of centralizing control. The use of named parameters enhances readability and maintainability.

```dart
abstract class ChatParticipant {
  void receive(String message, ChatParticipant sender);
  String getName();
}

class ChatRoom {
  private final List<ChatParticipant> participants = [];

  void register(ChatParticipant participant) {
    participants.add(participant);
  }

  void sendMessage(String message, ChatParticipant sender) {
    for (var participant in participants) {
      if (participant != sender) {
        participant.receive(message, sender);
      }
    }
  }
}

class User implements ChatParticipant {
  final String name;

  User({required this.name});

  @override
  void receive(String message, ChatParticipant sender) {
    print('$name received from ${sender.getName()}: $message');
  }

  @override
  String getName() => name;

  void sendMessage(String message, ChatRoom chatRoom) {
    chatRoom.sendMessage(message, this);
  }
}

void main() {
  final chatRoom = ChatRoom();

  final user1 = User(name: 'Alice');
  final user2 = User(name: 'Bob');
  final user3 = User(name: 'Charlie');

  chatRoom.register(user1);
  chatRoom.register(user2);
  chatRoom.register(user3);

  user1.sendMessage('Hello, everyone!', chatRoom);
  user2.sendMessage('Hi Alice!', chatRoom);
}
```